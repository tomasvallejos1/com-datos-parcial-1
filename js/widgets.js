/* =====================================================================
   Simuladores interactivos (canvas) usados en las explicaciones.
   API: WIDGETS[id] = { title, render(container) }
   Cada render construye sus controles y dibuja en un canvas propio.
   ===================================================================== */

const WIDGETS = {};

/* ---------- helpers ---------- */
function wEl(tag, cls, html) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html !== undefined) el.innerHTML = html;
  return el;
}
function wSlider(labelFmt, min, max, step, value, oninput) {
  const wrap = wEl("label", "wctl");
  const span = wEl("span");
  const input = document.createElement("input");
  input.type = "range"; input.min = min; input.max = max; input.step = step; input.value = value;
  const update = () => { span.textContent = labelFmt(parseFloat(input.value)); };
  input.addEventListener("input", () => { update(); oninput(parseFloat(input.value)); });
  update();
  wrap.append(span, input);
  return wrap;
}
function wCanvas(container, height) {
  const canvas = document.createElement("canvas");
  canvas.height = height || 220;
  container.appendChild(canvas);
  // resolución acorde al ancho real
  const fix = () => {
    const w = canvas.clientWidth || container.clientWidth || 600;
    canvas.width = Math.max(300, w);
  };
  requestAnimationFrame(fix);
  return canvas;
}
function wReadout(items) {
  const div = wEl("div", "wreadout");
  items.forEach(it => div.appendChild(it));
  return div;
}
function ro(label) {
  const d = wEl("div", "ro");
  d.update = (val, cls) => { d.innerHTML = label + ": <b>" + val + "</b>"; d.className = "ro" + (cls ? " " + cls : ""); };
  d.update("—");
  return d;
}
function grid(ctx, W, H) {
  ctx.strokeStyle = "#1c2742"; ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
}

/* =====================================================================
   1. Onda senoidal — A, f, fase
   ===================================================================== */
WIDGETS.sine = {
  title: "🌊 Simulador: onda senoidal s(t) = A·sen(2πft + φ)",
  render(container) {
    let A = 1, f = 2, phi = 0;
    const canvas = wCanvas(container, 220);
    const roT = ro("Período T = 1/f");
    const roL = ro("λ = c/f (si f fuera en MHz)");
    const draw = () => {
      const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H); grid(ctx, W, H);
      const mid = H / 2;
      ctx.strokeStyle = "#3a4a75"; ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(W, mid); ctx.stroke();
      // onda de referencia (A=1, f=2, φ=0) punteada
      ctx.strokeStyle = "#475a8c"; ctx.setLineDash([4, 5]); ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const t = x / W;
        const y = mid - Math.sin(2 * Math.PI * 2 * t) * (H / 2 - 20) * 0.5;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
      // onda del usuario
      ctx.strokeStyle = "#4f8cff"; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const t = x / W; // 1 segundo visible
        const y = mid - A * Math.sin(2 * Math.PI * f * t + phi * Math.PI / 180) * (H / 2 - 20) * 0.5;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = "#94a3c0"; ctx.font = "12px sans-serif";
      ctx.fillText("ventana visible: 1 s · punteada = referencia (A=1, f=2 Hz, φ=0°)", 10, 16);
      roT.update((1000 / f).toFixed(1) + " ms");
      roL.update((300 / f).toFixed(1) + " m");
    };
    const controls = wEl("div", "wcontrols");
    controls.append(
      wSlider(v => `Amplitud A = ${v.toFixed(1)}`, 0.2, 1.8, 0.1, A, v => { A = v; draw(); }),
      wSlider(v => `Frecuencia f = ${v.toFixed(0)} Hz`, 1, 12, 1, f, v => { f = v; draw(); }),
      wSlider(v => `Fase φ = ${v.toFixed(0)}°`, 0, 360, 5, phi, v => { phi = v; draw(); })
    );
    container.append(controls, wReadout([roT, roL]));
    container.insertBefore(canvas, controls);
    setTimeout(draw, 50);
  }
};

/* =====================================================================
   2. Fourier — señal cuadrada como suma de armónicos
   ===================================================================== */
WIDGETS.fourier = {
  title: "📐 Simulador: Fourier — construir una señal cuadrada sumando armónicos",
  render(container) {
    let N = 1;
    const canvas = wCanvas(container, 230);
    const roN = ro("Armónicos impares incluidos");
    const roB = ro("Frecuencia más alta usada");
    const draw = () => {
      const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H); grid(ctx, W, H);
      const mid = H / 2, amp = (H / 2 - 25);
      // objetivo: cuadrada ideal
      ctx.strokeStyle = "#2ecc8f55"; ctx.lineWidth = 2; ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const t = x / W * 2;
        const y = mid - (Math.sin(2 * Math.PI * t) >= 0 ? 0.8 : -0.8) * amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      // suma de armónicos: sen(2πkt)/k para k impar
      ctx.strokeStyle = "#4f8cff"; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const t = x / W * 2;
        let s = 0;
        for (let i = 0; i < N; i++) {
          const k = 2 * i + 1;
          s += Math.sin(2 * Math.PI * k * t) / k;
        }
        s *= 4 / Math.PI * 0.8;
        const y = mid - s * amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = "#94a3c0"; ctx.font = "12px sans-serif";
      ctx.fillText("verde = cuadrada ideal · azul = suma de armónicos (Fourier)", 10, 16);
      roN.update(N + (N === 1 ? " (solo la fundamental)" : ""));
      roB.update((2 * N - 1) + "× la fundamental");
    };
    const controls = wEl("div", "wcontrols");
    controls.append(wSlider(v => `Cantidad de armónicos = ${v}`, 1, 20, 1, N, v => { N = v; draw(); }));
    const note = wEl("p", "muted small",
      "Con pocos armónicos la 'cuadrada' queda redondeada: eso le pasa a un pulso digital cuando el canal filtra las frecuencias altas. Más velocidad de datos ⇒ más armónicos necesarios ⇒ más ancho de banda.");
    container.append(controls, wReadout([roN, roB]), note);
    container.insertBefore(canvas, controls);
    setTimeout(draw, 50);
  }
};

/* =====================================================================
   3. Códigos de línea — NRZ-L, NRZI, AMI, Pseudoternario, Manchester, M. dif.
   ===================================================================== */
WIDGETS.linecode = {
  title: "🔌 Simulador: códigos de línea (editá los bits y compará códigos)",
  render(container) {
    let bits = "01001100011";
    let code = "NRZ-L";
    const canvas = wCanvas(container, 200);
    const roDC = ro("Componente DC (promedio)");
    const roTr = ro("Transiciones");

    function encode(bits, code) {
      // devuelve lista de niveles por medio-bit: [n1,n2] por bit (para bifase) o [n,n]
      const out = [];
      let last = 1;       // para NRZI (nivel actual) y Manchester dif.
      let polarity = 1;   // para AMI/pseudoternario
      for (const ch of bits) {
        const b = ch === "1" ? 1 : 0;
        if (code === "NRZ-L") {
          const lv = b ? 1 : -1; out.push([lv, lv]);
        } else if (code === "NRZI") {
          if (b) last = -last;
          out.push([last, last]);
        } else if (code === "AMI") {
          if (b) { out.push([polarity, polarity]); polarity = -polarity; }
          else out.push([0, 0]);
        } else if (code === "Pseudoternario") {
          if (!b) { out.push([polarity, polarity]); polarity = -polarity; }
          else out.push([0, 0]);
        } else if (code === "Manchester") {
          // 1 = bajo→alto ; 0 = alto→bajo
          out.push(b ? [-1, 1] : [1, -1]);
        } else if (code === "Manchester dif.") {
          // 0 = transición al inicio; 1 = sin transición; siempre transición al medio
          if (!b) last = -last;
          const first = last;
          last = -last; // transición central
          out.push([first, last]);
        }
      }
      return out;
    }

    const draw = () => {
      const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const clean = bits.replace(/[^01]/g, "") || "0";
      const levels = encode(clean, code);
      const n = levels.length;
      const x0 = 30, x1 = W - 10, bw = (x1 - x0) / n;
      const yFor = lv => H / 2 - lv * (H / 2 - 35);
      // ejes y niveles
      ctx.strokeStyle = "#1c2742";
      [1, 0, -1].forEach(lv => { ctx.beginPath(); ctx.moveTo(x0, yFor(lv)); ctx.lineTo(x1, yFor(lv)); ctx.stroke(); });
      ctx.fillStyle = "#94a3c0"; ctx.font = "11px sans-serif";
      ctx.fillText("+V", 6, yFor(1) + 4); ctx.fillText("0", 12, yFor(0) + 4); ctx.fillText("−V", 6, yFor(-1) + 4);
      // bordes de bit + etiquetas
      for (let i = 0; i <= n; i++) {
        const x = x0 + i * bw;
        ctx.strokeStyle = "#222d4d"; ctx.beginPath(); ctx.moveTo(x, 25); ctx.lineTo(x, H - 14); ctx.stroke();
        if (i < n) { ctx.fillStyle = "#cdd8ef"; ctx.font = "bold 13px sans-serif"; ctx.fillText(clean[i], x + bw / 2 - 4, 18); }
      }
      // señal
      ctx.strokeStyle = "#4f8cff"; ctx.lineWidth = 2.5; ctx.beginPath();
      let transitions = 0, sum = 0, prevLv = null;
      levels.forEach((pair, i) => {
        pair.forEach((lv, h) => {
          const xs = x0 + i * bw + h * bw / 2;
          const xe = xs + bw / 2;
          const y = yFor(lv);
          if (prevLv === null) ctx.moveTo(xs, y);
          else {
            if (prevLv !== lv) { ctx.lineTo(xs, yFor(prevLv)); ctx.lineTo(xs, y); transitions++; }
            else ctx.lineTo(xs, y);
          }
          ctx.lineTo(xe, y);
          prevLv = lv; sum += lv;
        });
      });
      ctx.stroke(); ctx.lineWidth = 1;
      // línea de promedio DC
      const dc = sum / (levels.length * 2);
      ctx.strokeStyle = "#ffb84f"; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(x0, yFor(dc)); ctx.lineTo(x1, yFor(dc)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "#ffb84f"; ctx.fillText("DC", x1 - 20, yFor(dc) - 5);
      roDC.update(dc.toFixed(2) + " V", Math.abs(dc) > 0.15 ? "alert" : "good");
      roTr.update(transitions + (transitions <= 2 ? " ⚠ riesgo de pérdida de sincronización" : ""), transitions <= 2 ? "alert" : "good");
    };

    const controls = wEl("div", "wcontrols");
    const bitsCtl = wEl("label", "wctl"); bitsCtl.innerHTML = "<span>Bits a transmitir</span>";
    const bitsInput = document.createElement("input");
    bitsInput.type = "text"; bitsInput.value = bits; bitsInput.maxLength = 24; bitsInput.spellcheck = false;
    bitsInput.addEventListener("input", () => { bits = bitsInput.value; draw(); });
    bitsCtl.appendChild(bitsInput);
    const selCtl = wEl("label", "wctl"); selCtl.innerHTML = "<span>Código de línea</span>";
    const sel = document.createElement("select");
    ["NRZ-L", "NRZI", "AMI", "Pseudoternario", "Manchester", "Manchester dif."].forEach(c => {
      const o = document.createElement("option"); o.textContent = c; sel.appendChild(o);
    });
    sel.addEventListener("change", () => { code = sel.value; draw(); });
    selCtl.appendChild(sel);
    controls.append(bitsCtl, selCtl);
    const note = wEl("p", "muted small",
      "Probá '11111111' en NRZ-L (DC alta, sin transiciones) vs AMI (alterna polaridad). Probá '10000000001' en AMI (ceros sin transiciones → por eso existen B8ZS/HDB3) vs Manchester (siempre hay transición central).");
    container.append(controls, wReadout([roDC, roTr]), note);
    container.insertBefore(canvas, controls);
    setTimeout(draw, 50);
  }
};

/* =====================================================================
   4. dB / dBm / SNR
   ===================================================================== */
WIDGETS.db = {
  title: "📶 Simulador: dBm y SNR (mové señal y ruido)",
  render(container) {
    let sig = -60, noise = -90;
    const canvas = wCanvas(container, 190);
    const roSNR = ro("SNR = señal − ruido");
    const roLin = ro("Relación lineal S/N");
    const roMw = ro("Potencia de señal");
    const draw = () => {
      const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const x0 = 60, x1 = W - 20;
      const yFor = dbm => { const t = (dbm + 110) / 110; return H - 25 - t * (H - 55); };
      // escala
      ctx.strokeStyle = "#1c2742"; ctx.fillStyle = "#94a3c0"; ctx.font = "11px sans-serif";
      for (let d = 0; d >= -110; d -= 20) {
        const y = yFor(d);
        ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
        ctx.fillText(d + " dBm", 8, y + 4);
      }
      // ruido (zona)
      const yN = yFor(noise);
      ctx.fillStyle = "rgba(255,93,108,0.18)";
      ctx.fillRect(x0, yN, x1 - x0, H - 25 - yN);
      ctx.strokeStyle = "#ff5d6c"; ctx.beginPath(); ctx.moveTo(x0, yN); ctx.lineTo(x1, yN); ctx.stroke();
      ctx.fillStyle = "#ff5d6c"; ctx.fillText("piso de ruido " + noise + " dBm", x0 + 8, yN + 14);
      // señal
      const yS = yFor(sig);
      ctx.strokeStyle = "#2ecc8f"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x0, yS); ctx.lineTo(x1, yS); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = "#2ecc8f"; ctx.fillText("señal " + sig + " dBm", x0 + 8, yS - 6);
      // flecha SNR
      const xm = (x0 + x1) / 2;
      ctx.strokeStyle = "#4f8cff"; ctx.beginPath(); ctx.moveTo(xm, yS); ctx.lineTo(xm, yN); ctx.stroke();
      ctx.fillStyle = "#4f8cff"; ctx.font = "bold 13px sans-serif";
      ctx.fillText("SNR = " + (sig - noise) + " dB", xm + 8, (yS + yN) / 2);
      const snr = sig - noise;
      roSNR.update(snr + " dB", snr >= 25 ? "good" : snr >= 10 ? "" : "alert");
      roLin.update("×" + Math.pow(10, snr / 10).toLocaleString("es-AR", { maximumFractionDigits: 1 }));
      const mw = Math.pow(10, sig / 10);
      roMw.update(mw >= 1 ? mw.toFixed(1) + " mW" : (mw * 1e6).toFixed(2) + " nW");
    };
    const controls = wEl("div", "wcontrols");
    controls.append(
      wSlider(v => `Señal = ${v} dBm`, -100, 0, 1, sig, v => { sig = v; draw(); }),
      wSlider(v => `Ruido = ${v} dBm`, -110, -40, 1, noise, v => { noise = v; draw(); })
    );
    const note = wEl("p", "muted small",
      "Recordá: cada 10 dB de SNR es ×10 en potencia. Con ~25 dB o más se pueden usar modulaciones densas (64/256-QAM); con SNR bajo solo modulaciones robustas (BPSK/QPSK).");
    container.append(controls, wReadout([roSNR, roLin, roMw]), note);
    container.insertBefore(canvas, controls);
    setTimeout(draw, 50);
  }
};

/* =====================================================================
   5. Nyquist vs Shannon
   ===================================================================== */
WIDGETS.ns = {
  title: "🧮 Simulador: Nyquist vs Shannon",
  render(container) {
    let B = 3;       // kHz
    let Mexp = 1;    // M = 2^Mexp
    let snrdb = 30;
    const canvas = wCanvas(container, 180);
    const roNy = ro("Nyquist C = 2B·log₂(M)");
    const roSh = ro("Shannon C = B·log₂(1+SNR)");
    const roVer = ro("Veredicto");
    const fmt = bps => bps >= 1e6 ? (bps / 1e6).toFixed(2) + " Mbps" : bps >= 1e3 ? (bps / 1e3).toFixed(1) + " kbps" : bps.toFixed(0) + " bps";
    const draw = () => {
      const M = Math.pow(2, Mexp);
      const cNy = 2 * B * 1000 * Mexp;
      const snrLin = Math.pow(10, snrdb / 10);
      const cSh = B * 1000 * Math.log2(1 + snrLin);
      const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const maxC = Math.max(cNy, cSh) * 1.15;
      const bar = (y, c, color, label) => {
        const w = (W - 180) * (c / maxC);
        ctx.fillStyle = color; ctx.fillRect(150, y, Math.max(4, w), 34);
        ctx.fillStyle = "#e8edf7"; ctx.font = "13px sans-serif";
        ctx.fillText(label, 10, y + 22);
        ctx.fillText(fmt(c), 158 + Math.max(4, w), y + 22);
      };
      bar(30, cNy, "#4f8cff", "Nyquist (M=" + M + ")");
      bar(95, cSh, "#2ecc8f", "Shannon (techo)");
      roNy.update(fmt(cNy));
      roSh.update(fmt(cSh));
      if (cNy > cSh) roVer.update("⚠ Con ese ruido, " + M + " niveles superan a Shannon: NO sería confiable. Bajá M o mejorá el SNR.", "alert");
      else roVer.update("✔ Viable: con M=" + M + " quedás por debajo del techo de Shannon.", "good");
    };
    const controls = wEl("div", "wcontrols");
    controls.append(
      wSlider(v => `Ancho de banda B = ${v >= 1000 ? (v / 1000) + " MHz" : v + " kHz"}`, 1, 20000, 1, B, v => { B = v; draw(); }),
      wSlider(v => `Niveles M = ${Math.pow(2, v)} (${v} bits/símbolo)`, 1, 10, 1, Mexp, v => { Mexp = v; draw(); }),
      wSlider(v => `SNR = ${v} dB`, 0, 70, 1, snrdb, v => { snrdb = v; draw(); })
    );
    const note = wEl("p", "muted small",
      "Probá la línea telefónica: B = 3 kHz, SNR = 30 dB → Shannon ≈ 31 kbps; con M = 32 (5 bits/símbolo) Nyquist se acerca al techo. Si subís M más allá, Nyquist 'promete' más de lo que Shannon permite.");
    container.append(controls, wReadout([roNy, roSh, roVer]), note);
    container.insertBefore(canvas, controls);
    setTimeout(draw, 50);
  }
};

/* =====================================================================
   6. Constelaciones QAM/PSK con ruido
   ===================================================================== */
WIDGETS.qam = {
  title: "✨ Simulador: constelaciones (BPSK → 256-QAM) y ruido",
  render(container) {
    let mod = "QPSK", noise = 0.05;
    const MODS = {
      "BPSK": { pts: [[-1, 0], [1, 0]], bits: 1 },
      "QPSK": { pts: null, side: 2, bits: 2 },
      "16-QAM": { pts: null, side: 4, bits: 4 },
      "64-QAM": { pts: null, side: 8, bits: 6 },
      "256-QAM": { pts: null, side: 16, bits: 8 }
    };
    function points(m) {
      const def = MODS[m];
      if (def.pts) return def.pts;
      const side = def.side, pts = [];
      for (let i = 0; i < side; i++) for (let j = 0; j < side; j++) {
        pts.push([(i - (side - 1) / 2) / ((side - 1) / 2 || 1), (j - (side - 1) / 2) / ((side - 1) / 2 || 1)]);
      }
      return pts;
    }
    const canvas = wCanvas(container, 280);
    const roBits = ro("Bits por símbolo");
    const roBaud = ro("A 9600 baudios");
    const roErr = ro("Símbolos 'dudosos' (ruido)");
    const draw = () => {
      const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 25;
      // ejes I/Q
      ctx.strokeStyle = "#2a3553";
      ctx.beginPath(); ctx.moveTo(cx - R - 10, cy); ctx.lineTo(cx + R + 10, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - R - 10); ctx.lineTo(cx, cy + R + 10); ctx.stroke();
      ctx.fillStyle = "#94a3c0"; ctx.font = "11px sans-serif";
      ctx.fillText("I (fase)", cx + R - 25, cy - 6); ctx.fillText("Q (cuadratura)", cx + 6, cy - R + 2);
      const pts = points(mod);
      // distancia mínima entre puntos (para marcar dudosos)
      let dmin = Infinity;
      for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) {
        const d = Math.hypot(pts[a][0] - pts[b][0], pts[a][1] - pts[b][1]);
        if (d < dmin) dmin = d;
      }
      if (!isFinite(dmin)) dmin = 2;
      let bad = 0;
      pts.forEach(p => {
        // nube de ruido alrededor del punto
        for (let k = 0; k < 12; k++) {
          const nx = p[0] + (Math.random() * 2 - 1) * noise * 2;
          const ny = p[1] + (Math.random() * 2 - 1) * noise * 2;
          const off = Math.hypot(nx - p[0], ny - p[1]);
          const isBad = off > dmin / 2;
          if (isBad) bad++;
          ctx.fillStyle = isBad ? "rgba(255,93,108,0.8)" : "rgba(79,140,255,0.45)";
          ctx.beginPath(); ctx.arc(cx + nx * R * 0.85, cy - ny * R * 0.85, 2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = "#e8edf7";
        ctx.beginPath(); ctx.arc(cx + p[0] * R * 0.85, cy - p[1] * R * 0.85, 3.4, 0, Math.PI * 2); ctx.fill();
      });
      const def = MODS[mod];
      roBits.update(def.bits + " bits");
      roBaud.update((9600 * def.bits / 1000).toFixed(1) + " kbps");
      const pct = (bad / (pts.length * 12) * 100);
      roErr.update(pct.toFixed(0) + " %", pct > 12 ? "alert" : pct > 0 ? "" : "good");
    };
    const controls = wEl("div", "wcontrols");
    const selCtl = wEl("label", "wctl"); selCtl.innerHTML = "<span>Modulación</span>";
    const sel = document.createElement("select");
    Object.keys(MODS).forEach(m => { const o = document.createElement("option"); o.textContent = m; if (m === mod) o.selected = true; sel.appendChild(o); });
    sel.addEventListener("change", () => { mod = sel.value; draw(); });
    selCtl.appendChild(sel);
    controls.append(selCtl, wSlider(v => `Ruido = ${(v * 100).toFixed(0)} %`, 0, 0.3, 0.01, noise, v => { noise = v; draw(); }));
    const btn = wEl("button", "btn small", "🔄 Nueva ráfaga de símbolos");
    btn.addEventListener("click", draw);
    const note = wEl("p", "muted small",
      "Los puntos rojos cayeron más cerca de OTRO símbolo: serían errores. Fijate que con 256-QAM un ruido chico ya genera errores, mientras BPSK/QPSK lo toleran — por eso más bits/símbolo exige más SNR.");
    container.append(controls, btn, wReadout([roBits, roBaud, roErr]), note);
    container.insertBefore(canvas, controls);
    setTimeout(draw, 50);
  }
};

/* =====================================================================
   7. PCM — muestreo y cuantización
   ===================================================================== */
WIDGETS.pcm = {
  title: "🎙️ Simulador: PCM — muestreo y cuantización de una señal analógica",
  render(container) {
    let fsRatio = 2.0, bitsQ = 3;
    const canvas = wCanvas(container, 230);
    const roFs = ro("Frecuencia de muestreo");
    const roRate = ro("Tasa de bits = fs × bits");
    const roNyq = ro("Teorema de muestreo");
    const sig = t => 0.7 * Math.sin(2 * Math.PI * t) + 0.25 * Math.sin(2 * Math.PI * 3 * t);
    const draw = () => {
      const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H); grid(ctx, W, H);
      const mid = H / 2, amp = H / 2 - 30;
      // señal analógica
      ctx.strokeStyle = "#2ecc8f"; ctx.lineWidth = 2; ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const t = x / W;
        const y = mid - sig(t) * amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      // niveles de cuantización
      const levels = Math.pow(2, bitsQ);
      ctx.strokeStyle = "#222d4d";
      for (let l = 0; l < levels; l++) {
        const v = -1 + 2 * l / (levels - 1);
        const y = mid - v * amp;
        ctx.beginPath(); ctx.setLineDash([2, 6]); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); ctx.setLineDash([]);
      }
      // muestras: fmax de la señal = 3 (armónico mayor); fs relativo
      const fs = Math.round(fsRatio * 3 * 4); // muestras en la ventana
      ctx.strokeStyle = "#4f8cff"; ctx.lineWidth = 2;
      let prevY = null, prevX = 0;
      for (let i = 0; i <= fs; i++) {
        const t = i / fs, x = t * W;
        const v = sig(t);
        const q = Math.round((v + 1) / 2 * (levels - 1)) / (levels - 1) * 2 - 1;
        const y = mid - q * amp;
        ctx.fillStyle = "#4f8cff";
        ctx.beginPath(); ctx.arc(x, mid - v * amp, 3.5, 0, Math.PI * 2); ctx.fill();
        // escalera cuantizada
        if (prevY !== null) {
          ctx.beginPath(); ctx.moveTo(prevX, prevY); ctx.lineTo(x, prevY); ctx.lineTo(x, y); ctx.stroke();
        }
        prevY = y; prevX = x;
      }
      ctx.lineWidth = 1;
      ctx.fillStyle = "#94a3c0"; ctx.font = "12px sans-serif";
      ctx.fillText("verde = señal analógica · azul = muestras + escalera cuantizada (" + levels + " niveles)", 10, 16);
      roFs.update(fsRatio.toFixed(1) + " × fmax");
      roRate.update("(relativa) " + (fsRatio * 3 * 4 * bitsQ).toFixed(0) + " bits/ventana — voz real: 8000×8 = 64 kbps");
      if (fsRatio < 2) roNyq.update("⚠ fs < 2·fmax → ALIASING: no se puede reconstruir", "alert");
      else roNyq.update("✔ fs ≥ 2·fmax → reconstrucción posible", "good");
    };
    const controls = wEl("div", "wcontrols");
    controls.append(
      wSlider(v => `fs = ${v.toFixed(1)} × fmax`, 0.5, 4, 0.1, fsRatio, v => { fsRatio = v; draw(); }),
      wSlider(v => `Bits por muestra = ${v} (${Math.pow(2, v)} niveles)`, 2, 6, 1, bitsQ, v => { bitsQ = v; draw(); })
    );
    const note = wEl("p", "muted small",
      "Con pocos bits la escalera queda lejos de la señal: eso es RUIDO DE CUANTIZACIÓN. Con fs < 2·fmax hay muy pocas muestras y se pierde la forma (aliasing). Telefonía: voz limitada a 4 kHz → fs = 8000 muestras/s × 8 bits = 64 kbps (DS0).");
    container.append(controls, wReadout([roFs, roNyq, roRate]), note);
    container.insertBefore(canvas, controls);
    setTimeout(draw, 50);
  }
};

/* =====================================================================
   8. TDM vs STDM — animación
   ===================================================================== */
WIDGETS.mux = {
  title: "⏱️ Simulador: TDM síncrono vs STDM (animado)",
  render(container) {
    let activity = 0.4, running = true, raf = null, tick = 0;
    const SRC = ["A", "B", "C", "D"];
    const COLORS = ["#4f8cff", "#2ecc8f", "#ffb84f", "#b66bff"];
    let tdmSlots = [], stdmSlots = [], wastedTDM = 0, totalTDM = 0;
    const canvas = wCanvas(container, 230);
    const roEff = ro("Eficiencia TDM (ranuras usadas)");
    const roSt = ro("STDM");
    const step = () => {
      // estado de cada fuente este ciclo
      const active = SRC.map(() => Math.random() < activity);
      // TDM: una ranura por fuente, vacía si inactiva
      active.forEach((a, i) => {
        tdmSlots.push(a ? i : -1);
        totalTDM++; if (!a) wastedTDM++;
      });
      // STDM: solo fuentes activas, con etiqueta
      active.forEach((a, i) => { if (a) stdmSlots.push(i); });
      if (tdmSlots.length > 40) tdmSlots = tdmSlots.slice(-40);
      if (stdmSlots.length > 40) stdmSlots = stdmSlots.slice(-40);
    };
    const draw = () => {
      const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#94a3c0"; ctx.font = "12px sans-serif";
      const sw = (W - 80) / 40;
      const drawRow = (slots, y, label) => {
        ctx.fillStyle = "#e8edf7"; ctx.font = "bold 13px sans-serif"; ctx.fillText(label, 10, y - 10);
        for (let i = 0; i < 40; i++) {
          const s = slots[i];
          const x = 40 + i * sw;
          if (s === undefined) { ctx.fillStyle = "#131a2c"; }
          else if (s === -1) { ctx.fillStyle = "#39243000"; }
          if (s === undefined || s === -1) {
            ctx.fillStyle = "#1a2235"; ctx.fillRect(x, y, sw - 2, 26);
            if (s === -1) {
              ctx.strokeStyle = "#ff5d6c"; ctx.strokeRect(x + 0.5, y + 0.5, sw - 3, 25);
              ctx.fillStyle = "#ff5d6c"; ctx.font = "10px sans-serif"; ctx.fillText("∅", x + sw / 2 - 4, y + 17);
            }
          } else {
            ctx.fillStyle = COLORS[s]; ctx.fillRect(x, y, sw - 2, 26);
            ctx.fillStyle = "#0b1020"; ctx.font = "bold 11px sans-serif"; ctx.fillText(SRC[s], x + sw / 2 - 4, y + 17);
          }
        }
      };
      drawRow(tdmSlots, 36, "TDM síncrono — ranura fija por fuente (∅ = ranura desperdiciada)");
      drawRow(stdmSlots, 110, "STDM — ranuras solo para fuentes con datos (cada ranura lleva su etiqueta)");
      ctx.fillStyle = "#94a3c0"; ctx.font = "12px sans-serif";
      ctx.fillText("Fuentes: A, B, C, D transmitiendo por ráfagas (probabilidad de actividad ajustable)", 10, H - 12);
      const eff = totalTDM ? ((totalTDM - wastedTDM) / totalTDM * 100) : 0;
      roEff.update(eff.toFixed(0) + " %", eff < 60 ? "alert" : "good");
      roSt.update("100 % de ranuras con datos (+ overhead de direcciones)");
    };
    const loop = () => {
      tick++;
      if (running && tick % 30 === 0) { step(); draw(); }
      raf = requestAnimationFrame(loop);
    };
    const controls = wEl("div", "wcontrols");
    controls.append(wSlider(v => `Actividad de las fuentes = ${(v * 100).toFixed(0)} %`, 0.1, 1, 0.05, activity, v => { activity = v; }));
    const btn = wEl("button", "btn small", "⏸ Pausar");
    btn.addEventListener("click", () => { running = !running; btn.textContent = running ? "⏸ Pausar" : "▶ Reanudar"; });
    const note = wEl("p", "muted small",
      "Con actividad baja, TDM desperdicia muchas ranuras (∅) mientras STDM las llena todas. Subí la actividad al 100%: ahí TDM deja de desperdiciar y STDM pierde su ventaja (y en la realidad necesitaría buffers más grandes).");
    container.append(controls, btn, wReadout([roEff, roSt]), note);
    container.insertBefore(canvas, controls);
    // cleanup si se quita del DOM
    const obs = new MutationObserver(() => {
      if (!document.body.contains(canvas)) { cancelAnimationFrame(raf); obs.disconnect(); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => { for (let i = 0; i < 10; i++) step(); draw(); loop(); }, 50);
  }
};

/* =====================================================================
   9. FSPL — pérdida en espacio libre
   ===================================================================== */
WIDGETS.fspl = {
  title: "📡 Simulador: pérdida en espacio libre (FSPL)",
  render(container) {
    let d = 5, f = 2400;
    const canvas = wCanvas(container, 200);
    const roF = ro("FSPL");
    const roRx = ro("Señal recibida (TX 20 dBm + antenas 2×10 dBi)");
    const fspl = (dKm, fMHz) => 32.44 + 20 * Math.log10(dKm) + 20 * Math.log10(fMHz);
    const draw = () => {
      const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H); grid(ctx, W, H);
      // curva pérdida vs distancia para f actual
      ctx.strokeStyle = "#4f8cff"; ctx.lineWidth = 2.5; ctx.beginPath();
      const maxD = 50;
      for (let x = 0; x < W; x++) {
        const dd = 0.1 + (x / W) * maxD;
        const loss = fspl(dd, f);
        const y = 20 + ((loss - 60) / 90) * (H - 45);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.lineWidth = 1;
      // punto actual
      const loss = fspl(d, f);
      const px = ((d - 0.1) / maxD) * W;
      const py = 20 + ((loss - 60) / 90) * (H - 45);
      ctx.fillStyle = "#ffb84f"; ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffb84f"; ctx.font = "bold 12px sans-serif";
      ctx.fillText(loss.toFixed(1) + " dB @ " + d + " km", Math.min(px + 10, W - 130), py - 8);
      ctx.fillStyle = "#94a3c0"; ctx.font = "12px sans-serif";
      ctx.fillText("pérdida (dB) vs distancia (0–50 km) — eje Y crece hacia abajo: más abajo = más pérdida", 10, 14);
      roF.update(loss.toFixed(1) + " dB");
      const rx = 20 + 20 - loss;
      roRx.update(rx.toFixed(1) + " dBm", rx < -80 ? "alert" : rx < -65 ? "" : "good");
    };
    const controls = wEl("div", "wcontrols");
    controls.append(
      wSlider(v => `Distancia d = ${v} km`, 1, 50, 1, d, v => { d = v; draw(); }),
      wSlider(v => `Frecuencia f = ${v >= 1000 ? (v / 1000).toFixed(1) + " GHz" : v + " MHz"}`, 100, 40000, 100, f, v => { f = v; draw(); })
    );
    const note = wEl("p", "muted small",
      "FSPL(dB) = 32,44 + 20·log₁₀(d_km) + 20·log₁₀(f_MHz). Duplicá la distancia o la frecuencia y mirá cómo la pérdida sube ~6 dB. Un receptor Wi-Fi típico necesita más de −80 dBm para mantener el enlace.");
    container.append(controls, wReadout([roF, roRx]), note);
    container.insertBefore(canvas, controls);
    setTimeout(draw, 50);
  }
};

/* =====================================================================
   10. Encapsulamiento — animación por pasos
   ===================================================================== */
WIDGETS.encap = {
  title: "📦 Simulador: encapsulamiento TCP/IP paso a paso",
  render(container) {
    let stepN = 0;
    const LAYERS = [
      { name: "Datos de aplicación", color: "#b66bff", label: "DATOS", pdu: "mensaje" },
      { name: "+ Encabezado TCP → SEGMENTO", color: "#4f8cff", label: "TCP", pdu: "segmento" },
      { name: "+ Encabezado IP → PAQUETE", color: "#2ecc8f", label: "IP", pdu: "paquete / datagrama" },
      { name: "+ Encabezado y trailer Ethernet → TRAMA", color: "#ffb84f", label: "ETH", pdu: "trama" },
      { name: "Señales en el medio → BITS", color: "#ff5d6c", label: "⚡", pdu: "bits / señal" }
    ];
    const canvas = wCanvas(container, 190);
    const roPdu = ro("PDU actual");
    const draw = () => {
      const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cy = H / 2 - 10, bh = 56;
      const baseW = 130;
      const cx = W / 2;
      // cajas anidadas: de afuera hacia adentro según step
      for (let i = Math.min(stepN, 3); i >= 1; i--) {
        const pad = (Math.min(stepN, 3) - i + 1) * 46;
        const l = LAYERS[i];
        ctx.fillStyle = l.color + "33"; ctx.strokeStyle = l.color;
        ctx.fillRect(cx - baseW / 2 - pad, cy - bh / 2, baseW + pad * 2 - (i === 3 ? 0 : 30), bh);
        ctx.strokeRect(cx - baseW / 2 - pad, cy - bh / 2, baseW + pad * 2 - (i === 3 ? 0 : 30), bh);
        ctx.fillStyle = l.color; ctx.font = "bold 12px sans-serif";
        ctx.fillText(l.label, cx - baseW / 2 - pad + 6, cy - bh / 2 + 16);
        if (i === 3 && stepN >= 3) ctx.fillText("FCS", cx + baseW / 2 + pad - 64, cy - bh / 2 + 16);
      }
      // datos al centro
      ctx.fillStyle = LAYERS[0].color + "44"; ctx.strokeStyle = LAYERS[0].color;
      ctx.fillRect(cx - baseW / 2, cy - bh / 2 + 14, baseW, bh - 28);
      ctx.strokeRect(cx - baseW / 2, cy - bh / 2 + 14, baseW, bh - 28);
      ctx.fillStyle = "#e8edf7"; ctx.font = "bold 12px sans-serif";
      ctx.fillText("DATOS", cx - 24, cy + 4);
      // bits si último paso
      if (stepN === 4) {
        ctx.fillStyle = "#ff5d6c"; ctx.font = "bold 14px monospace";
        let bitsStr = "";
        for (let i = 0; i < Math.floor(W / 11); i++) bitsStr += Math.random() > 0.5 ? "1" : "0";
        ctx.fillText(bitsStr, 4, H - 12);
      }
      ctx.fillStyle = "#cdd8ef"; ctx.font = "13px sans-serif";
      ctx.fillText("Paso " + (stepN + 1) + "/5 — " + LAYERS[stepN].name, 10, 20);
      roPdu.update(LAYERS[stepN].pdu);
    };
    const controls = wEl("div", "wcontrols");
    const back = wEl("button", "btn small", "← Subir capa");
    const fwd = wEl("button", "btn small primary", "Bajar capa →");
    back.addEventListener("click", () => { if (stepN > 0) { stepN--; draw(); } });
    fwd.addEventListener("click", () => { if (stepN < 4) { stepN++; draw(); } });
    controls.append(back, fwd);
    const note = wEl("p", "muted small",
      "Cada capa AGREGA su encabezado al bajar (encapsulamiento) y lo QUITA al subir en el receptor (desencapsulamiento). La trama Ethernet agrega además un trailer con FCS (CRC) para detectar errores.");
    container.append(controls, wReadout([roPdu]), note);
    container.insertBefore(canvas, controls);
    setTimeout(draw, 50);
  }
};

/* ---------- render público ---------- */
function renderWidget(id, parent) {
  const def = WIDGETS[id];
  if (!def) return;
  const box = wEl("div", "widget");
  box.appendChild(wEl("h4", null, def.title));
  parent.appendChild(box);
  def.render(box);
}
