/* global Papa */
const DT_H = 0.25;

function euro(x){
  if (!isFinite(x)) return "—";
  return x.toLocaleString("nl-BE", { style:"currency", currency:"EUR", maximumFractionDigits: 0 });
}
function euro2(x){
  if (!isFinite(x)) return "—";
  return x.toLocaleString("nl-BE", { style:"currency", currency:"EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function num(x){
  const n = Number(x);
  return isFinite(n) ? n : 0;
}
function kwhFmt(x){
  if (!isFinite(x)) return "—";
  return x.toLocaleString("nl-BE", { maximumFractionDigits: 0 }) + " kWh";
}
function kwFmt(x){
  if (!isFinite(x)) return "—";
  return x.toLocaleString("nl-BE", { maximumFractionDigits: 2 }) + " kW";
}

function setHTML(id, html){ document.getElementById(id).innerHTML = html; }
function setText(id, text){ document.getElementById(id).textContent = text; }

function parseFluviusDate(d, t){
  const [dd, mm, yyyy] = String(d).trim().split("-").map(Number);
  const [HH, MM, SS] = String(t).trim().split(":").map(Number);
  if (!dd || !mm || !yyyy) return null;
  return new Date(yyyy, mm-1, dd, HH||0, MM||0, SS||0, 0);
}
function monthKey(date){
  const y = date.getFullYear();
  const m = (date.getMonth()+1).toString().padStart(2,"0");
  return `${y}-${m}`;
}

function parseFluviusRows(rawRows){
  const outMap = new Map();
  let anomalies = 0;

  for (const r of rawRows){
    const vd = r["Van (datum)"] ?? r["Van(datum)"] ?? r["Van datum"] ?? r["Van"];
    const vt = r["Van (tijdstip)"] ?? r["Van(tijdstip)"] ?? r["Van tijdstip"] ?? r["Van tijd"];
    const reg = (r["Register"] ?? "").toString().trim();
    let vol = r["Volume"];

    if (vol === null || vol === undefined || String(vol).trim() === "") vol = 0;
    if (typeof vol === "string") vol = vol.replace(",", ".");
    const kwh = Number(vol);
    const val = isFinite(kwh) ? kwh : 0;

    const ts = parseFluviusDate(vd, vt);
    if (!ts) { anomalies++; continue; }

    const key = ts.getTime();
    if (!outMap.has(key)){
      outMap.set(key, { ts, import_kwh: 0, injectie_kwh: 0 });
    }
    const row = outMap.get(key);

    if (reg.toLowerCase().startsWith("afname")) row.import_kwh += val;
    else if (reg.toLowerCase().startsWith("injectie")) row.injectie_kwh += val;
  }

  const rows = Array.from(outMap.values()).sort((a,b)=>a.ts-b.ts);
  return { rows, anomalies };
}

function simulateBattery(rows, capKwh, reservePct, chKw, disKw){
  const reserveKwh = capKwh * (reservePct/100);
  const minSoc = reserveKwh;
  const maxSoc = capKwh;

  const usable = Math.max(0, maxSoc - minSoc);
  let soc = minSoc + 0.5 * usable;

  const maxCh = chKw * DT_H;
  const maxDis = disKw * DT_H;

  let imp0=0, inj0=0, imp1=0, inj1=0;
  const perQuarter = [];

  for (const r of rows){
    const imp = Math.max(0, r.import_kwh || 0);
    const inj = Math.max(0, r.injectie_kwh || 0);

    imp0 += imp; inj0 += inj;

    let impNew = imp, injNew = inj;

    if (inj > 0){
      const charge = Math.min(inj, maxCh, maxSoc - soc);
      injNew = inj - charge;
      soc = Math.min(maxSoc, soc + charge);
    } else if (imp > 0){
      const discharge = Math.min(imp, maxDis, soc - minSoc);
      impNew = imp - discharge;
      soc = Math.max(minSoc, soc - discharge);
    }

    imp1 += impNew; inj1 += injNew;
    perQuarter.push({ ts: r.ts, impKwh: imp, impNewKwh: impNew });
  }

  return { imp0, inj0, imp1, inj1, perQuarter, reserveKwh };
}

function capacityTariff(perQuarter, capRateYearIncl){
  const minPeakKw = 2.5;
  const byMonth0 = new Map();
  const byMonth1 = new Map();

  for (const q of perQuarter){
    const mk = monthKey(q.ts);
    const p0 = (q.impKwh || 0) * 4;
    const p1 = (q.impNewKwh || 0) * 4;
    byMonth0.set(mk, Math.max(byMonth0.get(mk) ?? 0, p0));
    byMonth1.set(mk, Math.max(byMonth1.get(mk) ?? 0, p1));
  }

  const months = Array.from(new Set([...byMonth0.keys(), ...byMonth1.keys()])).sort();
  const peaks0 = months.map(m => Math.max(minPeakKw, byMonth0.get(m) ?? 0));
  const peaks1 = months.map(m => Math.max(minPeakKw, byMonth1.get(m) ?? 0));

  function rollingAvg(peaks){
    const out = [];
    for (let i=0;i<peaks.length;i++){
      const start = Math.max(0, i-11);
      const slice = peaks.slice(start, i+1);
      const avg = slice.reduce((a,b)=>a+b,0) / slice.length;
      out.push(avg);
    }
    return out;
  }

  const avg12_0 = rollingAvg(peaks0);
  const avg12_1 = rollingAvg(peaks1);

  const rateMonth = capRateYearIncl / 12;

  const capCost0 = avg12_0.reduce((s,avg)=> s + avg*rateMonth, 0);
  const capCost1 = avg12_1.reduce((s,avg)=> s + avg*rateMonth, 0);

  return {
    months,
    capCost0,
    capCost1,
    maxMonthPeak0: Math.max(...peaks0, 0),
    maxMonthPeak1: Math.max(...peaks1, 0),
    monthsCount: months.length
  };
}

// ---------- UI wiring ----------
let parsed = null;

const fileEl = document.getElementById("file");
const runBtn = document.getElementById("run");

fileEl.addEventListener("change", () => {
  const f = fileEl.files?.[0];
  parsed = null;
  runBtn.disabled = true;
  setHTML("warn", "");
  setText("debug", "—");

  if (!f){
    setText("fileInfo", "Nog geen bestand gekozen.");
    return;
  }
  setText("fileInfo", `Gekozen: ${f.name} (${Math.round(f.size/1024)} KB)`);

  Papa.parse(f, {
    header: true,
    skipEmptyLines: true,
    delimiter: ";",
    complete: (res) => {
      const rawRows = res.data || [];
      const { rows, anomalies } = parseFluviusRows(rawRows);

      if (!rows.length){
        setHTML("parseMsg", `<div class="notice-warn">Kon geen kwartierdata maken. Controleer of dit een Fluvius kwartiertotalen CSV is.</div>`);
        return;
      }

      parsed = { rows, anomalies };
      runBtn.disabled = false;

      const from = rows[0].ts;
      const to = rows[rows.length-1].ts;
      const days = (to - from) / (1000*60*60*24);

      setHTML("parseMsg",
        `<div class="notice-ok">
          Ingelezen kwartieren: <b>${rows.length.toLocaleString("nl-BE")}</b><br>
          Periode: <b>${from.toLocaleString("nl-BE")}</b> → <b>${to.toLocaleString("nl-BE")}</b> (${days.toFixed(1)} dagen)<br>
          Overgeslagen rijen: <b>${anomalies}</b>
        </div>`
      );
    },
    error: (err) => {
      setHTML("parseMsg", `<div class="notice-warn">Fout bij inlezen CSV: ${String(err)}</div>`);
    }
  });
});

runBtn.addEventListener("click", () => {
  setHTML("warn", "");
  if (!parsed?.rows?.length){
    setHTML("warn", `<div class="notice-warn">Upload eerst een CSV.</div>`);
    return;
  }

  const capKwh = num(document.getElementById("cap").value);
  const reservePct = num(document.getElementById("reserve").value);
  const chKw = num(document.getElementById("chkw").value);
  const disKw = num(document.getElementById("diskw").value);
  const invest = num(document.getElementById("invest").value);

  const pImport = num(document.getElementById("pImport").value);
  const pInject = num(document.getElementById("pInject").value);
  const capRateYearIncl = num(document.getElementById("capRateYear").value);

  if (capKwh <= 0 || chKw <= 0 || disKw <= 0){
    setHTML("warn", `<div class="notice-warn">Capaciteit en vermogens moeten groter zijn dan 0.</div>`);
    return;
  }
  if (reservePct < 0 || reservePct >= 100){
    setHTML("warn", `<div class="notice-warn">Reserve (%) moet tussen 0 en 99 liggen.</div>`);
    return;
  }

  const sim = simulateBattery(parsed.rows, capKwh, reservePct, chKw, disKw);

  const energyCost0 = sim.imp0 * pImport - sim.inj0 * pInject;
  const energyCost1 = sim.imp1 * pImport - sim.inj1 * pInject;
  const energySaving = energyCost0 - energyCost1;

  const cap = capacityTariff(sim.perQuarter, capRateYearIncl);
  const capSaving = cap.capCost0 - cap.capCost1;

  const totalSaving = energySaving + capSaving;
  const payback = (totalSaving > 0 && invest > 0) ? (invest / totalSaving) : Infinity;

  // Results
  setText("kpiSaving", `${euro(totalSaving)} / jaar (op datasetbasis)`);
  setText("kpiSplit", `Energie: ${euro2(energySaving)} • Capaciteit: ${euro2(capSaving)}`);

  setText("kpiPayback", isFinite(payback) ? payback.toFixed(1).replace(".", ",") + " jaar" : "—");

  const from = parsed.rows[0].ts;
  const to = parsed.rows[parsed.rows.length-1].ts;
  setText("kpiDataRange", `${from.toLocaleDateString("nl-BE")} → ${to.toLocaleDateString("nl-BE")} (${cap.monthsCount} maanden)`);

  setText("kpiImpRed", kwhFmt(sim.imp0 - sim.imp1));
  setText("kpiInjRed", kwhFmt(sim.inj0 - sim.inj1));
  setText("kpiPeak", `${kwFmt(cap.maxMonthPeak0)} → ${kwFmt(cap.maxMonthPeak1)}`);

  const note12 = cap.monthsCount < 12
    ? "⚠️ Minder dan 12 maanden data: rolling-12 benaderd met beschikbare maanden."
    : "Rolling-12 maandgemiddelde berekend op volledige 12-maand vensters zodra beschikbaar.";

  setHTML("warn", `<div class="notice-warn">${note12}</div>`);

  const dbgObj = {
    dataset: {
      quarters: parsed.rows.length,
      period: { from: from.toISOString(), to: to.toISOString() },
      months: cap.monthsCount
    },
    battery: {
      capKwh,
      reservePct,
      reserveKwh: sim.reserveKwh,
      chargeKw: chKw,
      dischargeKw: disKw
    },
    prices: { pImport, pInject, capRateYearIncl },
    totals_kwh: {
      import0: sim.imp0,
      inject0: sim.inj0,
      import1: sim.imp1,
      inject1: sim.inj1
    },
    euros: {
      energyCost0, energyCost1, energySaving,
      capCost0: cap.capCost0, capCost1: cap.capCost1, capSaving,
      totalSaving,
      paybackYears: isFinite(payback) ? payback : null
    },
    peaks_kw: {
      maxMonthPeak0: cap.maxMonthPeak0,
      maxMonthPeak1: cap.maxMonthPeak1
    }
  };

  setText("debug", JSON.stringify(dbgObj, null, 2));
});
