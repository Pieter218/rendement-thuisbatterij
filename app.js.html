<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2487.7">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">/* global Papa */</p>
<p class="p1">const DT_H = 0.25;</p>
<p class="p2"><br></p>
<p class="p1">function euro(x){</p>
<p class="p1"><span class="Apple-converted-space">  </span>if (!isFinite(x)) return "—";</p>
<p class="p1"><span class="Apple-converted-space">  </span>return x.toLocaleString("nl-BE", { style:"currency", currency:"EUR", maximumFractionDigits: 0 });</p>
<p class="p1">}</p>
<p class="p1">function euro2(x){</p>
<p class="p1"><span class="Apple-converted-space">  </span>if (!isFinite(x)) return "—";</p>
<p class="p1"><span class="Apple-converted-space">  </span>return x.toLocaleString("nl-BE", { style:"currency", currency:"EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });</p>
<p class="p1">}</p>
<p class="p1">function num(x){</p>
<p class="p1"><span class="Apple-converted-space">  </span>const n = Number(x);</p>
<p class="p1"><span class="Apple-converted-space">  </span>return isFinite(n) ? n : 0;</p>
<p class="p1">}</p>
<p class="p1">function kwhFmt(x){</p>
<p class="p1"><span class="Apple-converted-space">  </span>if (!isFinite(x)) return "—";</p>
<p class="p1"><span class="Apple-converted-space">  </span>return x.toLocaleString("nl-BE", { maximumFractionDigits: 0 }) + " kWh";</p>
<p class="p1">}</p>
<p class="p1">function kwFmt(x){</p>
<p class="p1"><span class="Apple-converted-space">  </span>if (!isFinite(x)) return "—";</p>
<p class="p1"><span class="Apple-converted-space">  </span>return x.toLocaleString("nl-BE", { maximumFractionDigits: 2 }) + " kW";</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function setHTML(id, html){ document.getElementById(id).innerHTML = html; }</p>
<p class="p1">function setText(id, text){ document.getElementById(id).textContent = text; }</p>
<p class="p2"><br></p>
<p class="p1">function parseFluviusDate(d, t){</p>
<p class="p1"><span class="Apple-converted-space">  </span>const [dd, mm, yyyy] = String(d).trim().split("-").map(Number);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const [HH, MM, SS] = String(t).trim().split(":").map(Number);</p>
<p class="p1"><span class="Apple-converted-space">  </span>if (!dd || !mm || !yyyy) return null;</p>
<p class="p1"><span class="Apple-converted-space">  </span>return new Date(yyyy, mm-1, dd, HH||0, MM||0, SS||0, 0);</p>
<p class="p1">}</p>
<p class="p1">function monthKey(date){</p>
<p class="p1"><span class="Apple-converted-space">  </span>const y = date.getFullYear();</p>
<p class="p1"><span class="Apple-converted-space">  </span>const m = (date.getMonth()+1).toString().padStart(2,"0");</p>
<p class="p1"><span class="Apple-converted-space">  </span>return `${y}-${m}`;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function parseFluviusRows(rawRows){</p>
<p class="p1"><span class="Apple-converted-space">  </span>const outMap = new Map();</p>
<p class="p1"><span class="Apple-converted-space">  </span>let anomalies = 0;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>for (const r of rawRows){</p>
<p class="p1"><span class="Apple-converted-space">    </span>const vd = r["Van (datum)"] ?? r["Van(datum)"] ?? r["Van datum"] ?? r["Van"];</p>
<p class="p1"><span class="Apple-converted-space">    </span>const vt = r["Van (tijdstip)"] ?? r["Van(tijdstip)"] ?? r["Van tijdstip"] ?? r["Van tijd"];</p>
<p class="p1"><span class="Apple-converted-space">    </span>const reg = (r["Register"] ?? "").toString().trim();</p>
<p class="p1"><span class="Apple-converted-space">    </span>let vol = r["Volume"];</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>if (vol === null || vol === undefined || String(vol).trim() === "") vol = 0;</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (typeof vol === "string") vol = vol.replace(",", ".");</p>
<p class="p1"><span class="Apple-converted-space">    </span>const kwh = Number(vol);</p>
<p class="p1"><span class="Apple-converted-space">    </span>const val = isFinite(kwh) ? kwh : 0;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const ts = parseFluviusDate(vd, vt);</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!ts) { anomalies++; continue; }</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const key = ts.getTime();</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!outMap.has(key)){</p>
<p class="p1"><span class="Apple-converted-space">      </span>outMap.set(key, { ts, import_kwh: 0, injectie_kwh: 0 });</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>const row = outMap.get(key);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>if (reg.toLowerCase().startsWith("afname")) row.import_kwh += val;</p>
<p class="p1"><span class="Apple-converted-space">    </span>else if (reg.toLowerCase().startsWith("injectie")) row.injectie_kwh += val;</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const rows = Array.from(outMap.values()).sort((a,b)=&gt;a.ts-b.ts);</p>
<p class="p1"><span class="Apple-converted-space">  </span>return { rows, anomalies };</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function simulateBattery(rows, capKwh, reservePct, chKw, disKw){</p>
<p class="p1"><span class="Apple-converted-space">  </span>const reserveKwh = capKwh * (reservePct/100);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const minSoc = reserveKwh;</p>
<p class="p1"><span class="Apple-converted-space">  </span>const maxSoc = capKwh;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const usable = Math.max(0, maxSoc - minSoc);</p>
<p class="p1"><span class="Apple-converted-space">  </span>let soc = minSoc + 0.5 * usable;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const maxCh = chKw * DT_H;</p>
<p class="p1"><span class="Apple-converted-space">  </span>const maxDis = disKw * DT_H;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>let imp0=0, inj0=0, imp1=0, inj1=0;</p>
<p class="p1"><span class="Apple-converted-space">  </span>const perQuarter = [];</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>for (const r of rows){</p>
<p class="p1"><span class="Apple-converted-space">    </span>const imp = Math.max(0, r.import_kwh || 0);</p>
<p class="p1"><span class="Apple-converted-space">    </span>const inj = Math.max(0, r.injectie_kwh || 0);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>imp0 += imp; inj0 += inj;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>let impNew = imp, injNew = inj;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>if (inj &gt; 0){</p>
<p class="p1"><span class="Apple-converted-space">      </span>const charge = Math.min(inj, maxCh, maxSoc - soc);</p>
<p class="p1"><span class="Apple-converted-space">      </span>injNew = inj - charge;</p>
<p class="p1"><span class="Apple-converted-space">      </span>soc = Math.min(maxSoc, soc + charge);</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if (imp &gt; 0){</p>
<p class="p1"><span class="Apple-converted-space">      </span>const discharge = Math.min(imp, maxDis, soc - minSoc);</p>
<p class="p1"><span class="Apple-converted-space">      </span>impNew = imp - discharge;</p>
<p class="p1"><span class="Apple-converted-space">      </span>soc = Math.max(minSoc, soc - discharge);</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>imp1 += impNew; inj1 += injNew;</p>
<p class="p1"><span class="Apple-converted-space">    </span>perQuarter.push({ ts: r.ts, impKwh: imp, impNewKwh: impNew });</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>return { imp0, inj0, imp1, inj1, perQuarter, reserveKwh };</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function capacityTariff(perQuarter, capRateYearIncl){</p>
<p class="p1"><span class="Apple-converted-space">  </span>const minPeakKw = 2.5;</p>
<p class="p1"><span class="Apple-converted-space">  </span>const byMonth0 = new Map();</p>
<p class="p1"><span class="Apple-converted-space">  </span>const byMonth1 = new Map();</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>for (const q of perQuarter){</p>
<p class="p1"><span class="Apple-converted-space">    </span>const mk = monthKey(q.ts);</p>
<p class="p1"><span class="Apple-converted-space">    </span>const p0 = (q.impKwh || 0) * 4;</p>
<p class="p1"><span class="Apple-converted-space">    </span>const p1 = (q.impNewKwh || 0) * 4;</p>
<p class="p1"><span class="Apple-converted-space">    </span>byMonth0.set(mk, Math.max(byMonth0.get(mk) ?? 0, p0));</p>
<p class="p1"><span class="Apple-converted-space">    </span>byMonth1.set(mk, Math.max(byMonth1.get(mk) ?? 0, p1));</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const months = Array.from(new Set([...byMonth0.keys(), ...byMonth1.keys()])).sort();</p>
<p class="p1"><span class="Apple-converted-space">  </span>const peaks0 = months.map(m =&gt; Math.max(minPeakKw, byMonth0.get(m) ?? 0));</p>
<p class="p1"><span class="Apple-converted-space">  </span>const peaks1 = months.map(m =&gt; Math.max(minPeakKw, byMonth1.get(m) ?? 0));</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>function rollingAvg(peaks){</p>
<p class="p1"><span class="Apple-converted-space">    </span>const out = [];</p>
<p class="p1"><span class="Apple-converted-space">    </span>for (let i=0;i&lt;peaks.length;i++){</p>
<p class="p1"><span class="Apple-converted-space">      </span>const start = Math.max(0, i-11);</p>
<p class="p1"><span class="Apple-converted-space">      </span>const slice = peaks.slice(start, i+1);</p>
<p class="p1"><span class="Apple-converted-space">      </span>const avg = slice.reduce((a,b)=&gt;a+b,0) / slice.length;</p>
<p class="p1"><span class="Apple-converted-space">      </span>out.push(avg);</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>return out;</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const avg12_0 = rollingAvg(peaks0);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const avg12_1 = rollingAvg(peaks1);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const rateMonth = capRateYearIncl / 12;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const capCost0 = avg12_0.reduce((s,avg)=&gt; s + avg*rateMonth, 0);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const capCost1 = avg12_1.reduce((s,avg)=&gt; s + avg*rateMonth, 0);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>return {</p>
<p class="p1"><span class="Apple-converted-space">    </span>months,</p>
<p class="p1"><span class="Apple-converted-space">    </span>capCost0,</p>
<p class="p1"><span class="Apple-converted-space">    </span>capCost1,</p>
<p class="p1"><span class="Apple-converted-space">    </span>maxMonthPeak0: Math.max(...peaks0, 0),</p>
<p class="p1"><span class="Apple-converted-space">    </span>maxMonthPeak1: Math.max(...peaks1, 0),</p>
<p class="p1"><span class="Apple-converted-space">    </span>monthsCount: months.length</p>
<p class="p1"><span class="Apple-converted-space">  </span>};</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">// ---------- UI wiring ----------</p>
<p class="p1">let parsed = null;</p>
<p class="p2"><br></p>
<p class="p1">const fileEl = document.getElementById("file");</p>
<p class="p1">const runBtn = document.getElementById("run");</p>
<p class="p2"><br></p>
<p class="p1">fileEl.addEventListener("change", () =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>const f = fileEl.files?.[0];</p>
<p class="p1"><span class="Apple-converted-space">  </span>parsed = null;</p>
<p class="p1"><span class="Apple-converted-space">  </span>runBtn.disabled = true;</p>
<p class="p1"><span class="Apple-converted-space">  </span>setHTML("warn", "");</p>
<p class="p1"><span class="Apple-converted-space">  </span>setText("debug", "—");</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>if (!f){</p>
<p class="p1"><span class="Apple-converted-space">    </span>setText("fileInfo", "Nog geen bestand gekozen.");</p>
<p class="p1"><span class="Apple-converted-space">    </span>return;</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>setText("fileInfo", `Gekozen: ${f.name} (${Math.round(f.size/1024)} KB)`);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>Papa.parse(f, {</p>
<p class="p1"><span class="Apple-converted-space">    </span>header: true,</p>
<p class="p1"><span class="Apple-converted-space">    </span>skipEmptyLines: true,</p>
<p class="p1"><span class="Apple-converted-space">    </span>delimiter: ";",</p>
<p class="p1"><span class="Apple-converted-space">    </span>complete: (res) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">      </span>const rawRows = res.data || [];</p>
<p class="p1"><span class="Apple-converted-space">      </span>const { rows, anomalies } = parseFluviusRows(rawRows);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">      </span>if (!rows.length){</p>
<p class="p1"><span class="Apple-converted-space">        </span>setHTML("parseMsg", `&lt;div class="notice-warn"&gt;Kon geen kwartierdata maken. Controleer of dit een Fluvius kwartiertotalen CSV is.&lt;/div&gt;`);</p>
<p class="p1"><span class="Apple-converted-space">        </span>return;</p>
<p class="p1"><span class="Apple-converted-space">      </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">      </span>parsed = { rows, anomalies };</p>
<p class="p1"><span class="Apple-converted-space">      </span>runBtn.disabled = false;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">      </span>const from = rows[0].ts;</p>
<p class="p1"><span class="Apple-converted-space">      </span>const to = rows[rows.length-1].ts;</p>
<p class="p1"><span class="Apple-converted-space">      </span>const days = (to - from) / (1000*60*60*24);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">      </span>setHTML("parseMsg",</p>
<p class="p1"><span class="Apple-converted-space">        </span>`&lt;div class="notice-ok"&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>Ingelezen kwartieren: &lt;b&gt;${rows.length.toLocaleString("nl-BE")}&lt;/b&gt;&lt;br&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>Periode: &lt;b&gt;${from.toLocaleString("nl-BE")}&lt;/b&gt; → &lt;b&gt;${to.toLocaleString("nl-BE")}&lt;/b&gt; (${days.toFixed(1)} dagen)&lt;br&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>Overgeslagen rijen: &lt;b&gt;${anomalies}&lt;/b&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/div&gt;`</p>
<p class="p1"><span class="Apple-converted-space">      </span>);</p>
<p class="p1"><span class="Apple-converted-space">    </span>},</p>
<p class="p1"><span class="Apple-converted-space">    </span>error: (err) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">      </span>setHTML("parseMsg", `&lt;div class="notice-warn"&gt;Fout bij inlezen CSV: ${String(err)}&lt;/div&gt;`);</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p1">});</p>
<p class="p2"><br></p>
<p class="p1">runBtn.addEventListener("click", () =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>setHTML("warn", "");</p>
<p class="p1"><span class="Apple-converted-space">  </span>if (!parsed?.rows?.length){</p>
<p class="p1"><span class="Apple-converted-space">    </span>setHTML("warn", `&lt;div class="notice-warn"&gt;Upload eerst een CSV.&lt;/div&gt;`);</p>
<p class="p1"><span class="Apple-converted-space">    </span>return;</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const capKwh = num(document.getElementById("cap").value);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const reservePct = num(document.getElementById("reserve").value);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const chKw = num(document.getElementById("chkw").value);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const disKw = num(document.getElementById("diskw").value);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const invest = num(document.getElementById("invest").value);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const pImport = num(document.getElementById("pImport").value);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const pInject = num(document.getElementById("pInject").value);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const capRateYearIncl = num(document.getElementById("capRateYear").value);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>if (capKwh &lt;= 0 || chKw &lt;= 0 || disKw &lt;= 0){</p>
<p class="p1"><span class="Apple-converted-space">    </span>setHTML("warn", `&lt;div class="notice-warn"&gt;Capaciteit en vermogens moeten groter zijn dan 0.&lt;/div&gt;`);</p>
<p class="p1"><span class="Apple-converted-space">    </span>return;</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>if (reservePct &lt; 0 || reservePct &gt;= 100){</p>
<p class="p1"><span class="Apple-converted-space">    </span>setHTML("warn", `&lt;div class="notice-warn"&gt;Reserve (%) moet tussen 0 en 99 liggen.&lt;/div&gt;`);</p>
<p class="p1"><span class="Apple-converted-space">    </span>return;</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const sim = simulateBattery(parsed.rows, capKwh, reservePct, chKw, disKw);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const energyCost0 = sim.imp0 * pImport - sim.inj0 * pInject;</p>
<p class="p1"><span class="Apple-converted-space">  </span>const energyCost1 = sim.imp1 * pImport - sim.inj1 * pInject;</p>
<p class="p1"><span class="Apple-converted-space">  </span>const energySaving = energyCost0 - energyCost1;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const cap = capacityTariff(sim.perQuarter, capRateYearIncl);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const capSaving = cap.capCost0 - cap.capCost1;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const totalSaving = energySaving + capSaving;</p>
<p class="p1"><span class="Apple-converted-space">  </span>const payback = (totalSaving &gt; 0 &amp;&amp; invest &gt; 0) ? (invest / totalSaving) : Infinity;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>// Results</p>
<p class="p1"><span class="Apple-converted-space">  </span>setText("kpiSaving", `${euro(totalSaving)} / jaar (op datasetbasis)`);</p>
<p class="p1"><span class="Apple-converted-space">  </span>setText("kpiSplit", `Energie: ${euro2(energySaving)} • Capaciteit: ${euro2(capSaving)}`);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>setText("kpiPayback", isFinite(payback) ? payback.toFixed(1).replace(".", ",") + " jaar" : "—");</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const from = parsed.rows[0].ts;</p>
<p class="p1"><span class="Apple-converted-space">  </span>const to = parsed.rows[parsed.rows.length-1].ts;</p>
<p class="p1"><span class="Apple-converted-space">  </span>setText("kpiDataRange", `${from.toLocaleDateString("nl-BE")} → ${to.toLocaleDateString("nl-BE")} (${cap.monthsCount} maanden)`);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>setText("kpiImpRed", kwhFmt(sim.imp0 - sim.imp1));</p>
<p class="p1"><span class="Apple-converted-space">  </span>setText("kpiInjRed", kwhFmt(sim.inj0 - sim.inj1));</p>
<p class="p1"><span class="Apple-converted-space">  </span>setText("kpiPeak", `${kwFmt(cap.maxMonthPeak0)} → ${kwFmt(cap.maxMonthPeak1)}`);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const note12 = cap.monthsCount &lt; 12</p>
<p class="p1"><span class="Apple-converted-space">    </span>? "⚠️ Minder dan 12 maanden data: rolling-12 benaderd met beschikbare maanden."</p>
<p class="p1"><span class="Apple-converted-space">    </span>: "Rolling-12 maandgemiddelde berekend op volledige 12-maand vensters zodra beschikbaar.";</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>setHTML("warn", `&lt;div class="notice-warn"&gt;${note12}&lt;/div&gt;`);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const dbgObj = {</p>
<p class="p1"><span class="Apple-converted-space">    </span>dataset: {</p>
<p class="p1"><span class="Apple-converted-space">      </span>quarters: parsed.rows.length,</p>
<p class="p1"><span class="Apple-converted-space">      </span>period: { from: from.toISOString(), to: to.toISOString() },</p>
<p class="p1"><span class="Apple-converted-space">      </span>months: cap.monthsCount</p>
<p class="p1"><span class="Apple-converted-space">    </span>},</p>
<p class="p1"><span class="Apple-converted-space">    </span>battery: {</p>
<p class="p1"><span class="Apple-converted-space">      </span>capKwh,</p>
<p class="p1"><span class="Apple-converted-space">      </span>reservePct,</p>
<p class="p1"><span class="Apple-converted-space">      </span>reserveKwh: sim.reserveKwh,</p>
<p class="p1"><span class="Apple-converted-space">      </span>chargeKw: chKw,</p>
<p class="p1"><span class="Apple-converted-space">      </span>dischargeKw: disKw</p>
<p class="p1"><span class="Apple-converted-space">    </span>},</p>
<p class="p1"><span class="Apple-converted-space">    </span>prices: { pImport, pInject, capRateYearIncl },</p>
<p class="p1"><span class="Apple-converted-space">    </span>totals_kwh: {</p>
<p class="p1"><span class="Apple-converted-space">      </span>import0: sim.imp0,</p>
<p class="p1"><span class="Apple-converted-space">      </span>inject0: sim.inj0,</p>
<p class="p1"><span class="Apple-converted-space">      </span>import1: sim.imp1,</p>
<p class="p1"><span class="Apple-converted-space">      </span>inject1: sim.inj1</p>
<p class="p1"><span class="Apple-converted-space">    </span>},</p>
<p class="p1"><span class="Apple-converted-space">    </span>euros: {</p>
<p class="p1"><span class="Apple-converted-space">      </span>energyCost0, energyCost1, energySaving,</p>
<p class="p1"><span class="Apple-converted-space">      </span>capCost0: cap.capCost0, capCost1: cap.capCost1, capSaving,</p>
<p class="p1"><span class="Apple-converted-space">      </span>totalSaving,</p>
<p class="p1"><span class="Apple-converted-space">      </span>paybackYears: isFinite(payback) ? payback : null</p>
<p class="p1"><span class="Apple-converted-space">    </span>},</p>
<p class="p1"><span class="Apple-converted-space">    </span>peaks_kw: {</p>
<p class="p1"><span class="Apple-converted-space">      </span>maxMonthPeak0: cap.maxMonthPeak0,</p>
<p class="p1"><span class="Apple-converted-space">      </span>maxMonthPeak1: cap.maxMonthPeak1</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>};</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>setText("debug", JSON.stringify(dbgObj, null, 2));</p>
<p class="p1">});</p>
</body>
</html>
