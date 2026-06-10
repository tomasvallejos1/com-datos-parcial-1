/* =====================================================================
   Motor del test: navegación, corrección MC, corrección automática
   de desarrollo por conceptos, resultados y persistencia local.
   ===================================================================== */

const STORAGE_KEY = "comdatos-parcial1-v1";

const state = {
  mc: {},   // id -> { selected: [..], graded: bool, correct: bool }
  dev: {},  // id -> { text, graded, score (0..1), verdict }
  mcIndex: 0,
  devIndex: 0
};

/* ---------- persistencia ---------- */
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) Object.assign(state, JSON.parse(raw));
  } catch (e) {}
}

/* ---------- helpers ---------- */
function $(sel) { return document.querySelector(sel); }
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}
function normalize(text) {
  return (" " + text + " ")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/₀/g, "0").replace(/₁/g, "1").replace(/₂/g, "2")
    .replace(/[\n\r\t.,;:()\[\]{}¿?¡!"'%/\\\-–—+=×*^·≈<>|]+/g, " ")
    .replace(/\s+/g, " ");
}

/* ---------- navegación de vistas ---------- */
const VIEWS = ["home", "mc", "dev", "results"];
function show(view) {
  VIEWS.forEach(v => {
    $("#view-" + v).classList.toggle("active", v === view);
    const btn = $("#nav-" + v);
    if (btn) btn.classList.toggle("active", v === view);
  });
  if (view === "mc") renderMC();
  if (view === "dev") renderDev();
  if (view === "results") renderResults();
  window.scrollTo({ top: 0 });
}

/* =====================================================================
   MULTIPLE CHOICE
   ===================================================================== */
function mcState(q) {
  if (!state.mc[q.id]) state.mc[q.id] = { selected: [], graded: false, correct: false };
  return state.mc[q.id];
}

function renderMCMap() {
  const map = $("#mc-map");
  map.innerHTML = "<h4>Preguntas</h4>";
  const grids = el("div", "qmap-grid");
  MC_QUESTIONS.forEach((q, i) => {
    const s = state.mc[q.id];
    const dot = el("button", "qdot", String(i + 1));
    if (i === state.mcIndex) dot.classList.add("current");
    if (s && s.graded) dot.classList.add(s.correct ? "correct" : "wrong");
    dot.addEventListener("click", () => { state.mcIndex = i; saveState(); renderMC(); });
    grids.appendChild(dot);
  });
  map.appendChild(grids);
  const done = MC_QUESTIONS.filter(q => state.mc[q.id] && state.mc[q.id].graded).length;
  const ok = MC_QUESTIONS.filter(q => state.mc[q.id] && state.mc[q.id].graded && state.mc[q.id].correct).length;
  map.appendChild(el("p", "muted small", `Corregidas: ${done}/60<br>Correctas: ${ok}`));
  $("#mc-progress-pill").textContent = done + "/60";
}

function renderMC() {
  renderMCMap();
  const q = MC_QUESTIONS[state.mcIndex];
  const s = mcState(q);
  const card = $("#mc-question-card");
  card.innerHTML = "";

  const meta = el("div", "qmeta");
  meta.appendChild(el("span", "tag unit-" + q.unit, "Unidad " + q.unit));
  meta.appendChild(el("span", "tag diff-" + q.diff, q.diff === "media" ? "Nivel medio" : "Nivel difícil"));
  if (q.multi) meta.appendChild(el("span", "tag multi", "Selección múltiple — puede haber 1, 2 o 3 correctas"));
  card.appendChild(meta);

  card.appendChild(el("div", "qtext", `<b>${state.mcIndex + 1}.</b> ${q.q}`));

  const opts = el("div", "options");
  q.options.forEach((optText, idx) => {
    const opt = el("label", "option");
    const input = document.createElement("input");
    input.type = q.multi ? "checkbox" : "radio";
    input.name = "mc-" + q.id;
    input.checked = s.selected.includes(idx);
    input.disabled = s.graded;
    input.addEventListener("change", () => {
      if (q.multi) {
        s.selected = s.selected.includes(idx) ? s.selected.filter(i => i !== idx) : [...s.selected, idx];
      } else {
        s.selected = [idx];
      }
      saveState();
      opts.querySelectorAll(".option").forEach((o, i2) => {
        o.classList.toggle("selected", s.selected.includes(i2));
      });
    });
    opt.appendChild(input);
    opt.appendChild(el("span", null, optText));
    if (s.selected.includes(idx)) opt.classList.add("selected");
    if (s.graded) {
      opt.classList.add("locked");
      const isCorrect = q.correct.includes(idx);
      const wasSelected = s.selected.includes(idx);
      if (isCorrect) {
        opt.classList.add("reveal-correct");
        opt.appendChild(el("span", "opt-mark ok", wasSelected ? "✔ correcta" : "✔ era correcta"));
      } else if (wasSelected) {
        opt.classList.add("reveal-wrong");
        opt.appendChild(el("span", "opt-mark bad", "✘ incorrecta"));
      }
    }
    opts.appendChild(opt);
  });
  card.appendChild(opts);

  if (!s.graded) {
    const btn = el("button", "btn primary", "Corregir");
    btn.style.marginTop = "16px";
    btn.addEventListener("click", () => {
      if (s.selected.length === 0) { alert("Seleccioná al menos una opción."); return; }
      s.graded = true;
      const sel = [...s.selected].sort().join(",");
      const cor = [...q.correct].sort().join(",");
      s.correct = sel === cor;
      saveState();
      renderMC();
    });
    card.appendChild(btn);
  } else {
    const fb = el("div", "feedback " + (s.correct ? "correct" : "wrong"));
    fb.appendChild(el("h3", s.correct ? "ok" : "bad", s.correct ? "✔ ¡Correcta!" : "✘ Incorrecta"));
    if (!s.correct && q.multi) {
      fb.appendChild(el("p", "muted small", "En selección múltiple hay que marcar EXACTAMENTE las correctas (ni de más ni de menos). Arriba quedó marcado qué opciones eran."));
    }
    fb.appendChild(el("div", "explanation", "<b>Explicación:</b> " + q.explanation));
    if (q.widget) renderWidget(q.widget, fb);
    const retry = el("button", "btn small", "↺ Reintentar esta pregunta");
    retry.style.marginTop = "12px";
    retry.addEventListener("click", () => {
      state.mc[q.id] = { selected: [], graded: false, correct: false };
      saveState(); renderMC();
    });
    fb.appendChild(retry);
    card.appendChild(fb);
  }

  $("#mc-counter").textContent = `Pregunta ${state.mcIndex + 1} de ${MC_QUESTIONS.length}`;
  $("#mc-prev").disabled = state.mcIndex === 0;
  $("#mc-next").textContent = state.mcIndex === MC_QUESTIONS.length - 1 ? "Ver resultados →" : "Siguiente →";
}

/* =====================================================================
   DESARROLLO — corrección automática por conceptos
   ===================================================================== */
function devState(q) {
  if (!state.dev[q.id]) state.dev[q.id] = { text: "", graded: false, score: 0, verdict: "" };
  return state.dev[q.id];
}

function gradeDev(q, text) {
  const norm = normalize(text);
  const hits = [], misses = [];
  q.concepts.forEach(c => {
    // Coincidencia por palabra completa: la clave normalizada (con sus espacios
    // de borde) debe aparecer dentro de la respuesta normalizada.
    const found = c.keys.some(k => {
      const key = normalize(k).trim();
      if (key.length === 0) return false;
      // acepta también el plural simple de la última palabra
      return norm.includes(" " + key + " ") ||
             norm.includes(" " + key + "s ") ||
             norm.includes(" " + key + "es ");
    });
    (found ? hits : misses).push(c.label);
  });
  let score = hits.length / q.concepts.length;
  // respuestas demasiado cortas no pueden estar "bien"
  if (text.trim().length < 40) score = Math.min(score, 0.2);
  let verdict;
  if (score >= 0.6) verdict = "correcta";
  else if (score >= 0.35) verdict = "parcial";
  else verdict = "incorrecta";
  return { score, verdict, hits, misses };
}

function renderDevMap() {
  const map = $("#dev-map");
  map.innerHTML = "<h4>Preguntas</h4>";
  const grids = el("div", "qmap-grid");
  DEV_QUESTIONS.forEach((q, i) => {
    const s = state.dev[q.id];
    const dot = el("button", "qdot", String(i + 1));
    if (i === state.devIndex) dot.classList.add("current");
    if (s && s.graded) {
      dot.classList.add(s.verdict === "correcta" ? "correct" : s.verdict === "parcial" ? "partial" : "wrong");
    }
    dot.addEventListener("click", () => { state.devIndex = i; saveState(); renderDev(); });
    grids.appendChild(dot);
  });
  map.appendChild(grids);
  const done = DEV_QUESTIONS.filter(q => state.dev[q.id] && state.dev[q.id].graded).length;
  map.appendChild(el("p", "muted small", `Corregidas: ${done}/20`));
  $("#dev-progress-pill").textContent = done + "/20";
}

function renderDev() {
  renderDevMap();
  const q = DEV_QUESTIONS[state.devIndex];
  const s = devState(q);
  const card = $("#dev-question-card");
  card.innerHTML = "";

  const meta = el("div", "qmeta");
  meta.appendChild(el("span", "tag unit-" + q.unit, "Unidad " + q.unit));
  meta.appendChild(el("span", "tag multi", "Desarrollo — corrección automática"));
  card.appendChild(meta);
  card.appendChild(el("div", "qtext", `<b>${state.devIndex + 1}.</b> ${q.q}`));

  const ta = document.createElement("textarea");
  ta.className = "dev-textarea";
  ta.placeholder = "Escribí tu respuesta desarrollada acá... (cuanto más completa, mejor la detección de conceptos)";
  ta.value = s.text;
  ta.disabled = s.graded;
  ta.addEventListener("input", () => { s.text = ta.value; saveState(); });
  card.appendChild(ta);

  if (!s.graded) {
    const btn = el("button", "btn primary", "Corregir mi respuesta");
    btn.style.marginTop = "14px";
    btn.addEventListener("click", () => {
      if (ta.value.trim().length === 0) { alert("Escribí una respuesta antes de corregir."); return; }
      const r = gradeDev(q, ta.value);
      s.graded = true; s.score = r.score; s.verdict = r.verdict;
      s.hits = r.hits; s.misses = r.misses;
      saveState(); renderDev();
    });
    card.appendChild(btn);
  } else {
    const cls = s.verdict === "correcta" ? "correct" : s.verdict === "parcial" ? "partial" : "wrong";
    const hcls = s.verdict === "correcta" ? "ok" : s.verdict === "parcial" ? "warn" : "bad";
    const title = s.verdict === "correcta" ? "✔ ¡Bien! Tu respuesta está correcta"
      : s.verdict === "parcial" ? "◐ Respuesta parcial — te faltaron conceptos"
      : "✘ Incorrecta o incompleta";
    const fb = el("div", "feedback " + cls);
    fb.appendChild(el("h3", hcls, title));

    const pct = Math.round(s.score * 100);
    fb.appendChild(el("p", null, `Conceptos clave detectados: <b>${pct}%</b>`));
    const bar = el("div", "score-bar");
    const fill = el("div");
    fill.style.width = pct + "%";
    fill.style.background = s.verdict === "correcta" ? "var(--ok)" : s.verdict === "parcial" ? "var(--warn)" : "var(--bad)";
    bar.appendChild(fill);
    fb.appendChild(bar);

    const list = el("ul", "concept-list");
    (s.hits || []).forEach(h => list.appendChild(el("li", "hit", "✔ Mencionaste: " + h)));
    (s.misses || []).forEach(m => list.appendChild(el("li", "miss", "✘ Te faltó: " + m)));
    fb.appendChild(list);

    fb.appendChild(el("p", null, "<b>Respuesta modelo:</b>"));
    fb.appendChild(el("div", "model-answer", q.model));

    const retry = el("button", "btn small", "↺ Reescribir mi respuesta");
    retry.style.marginTop = "12px";
    retry.addEventListener("click", () => {
      s.graded = false; saveState(); renderDev();
    });
    fb.appendChild(retry);
    card.appendChild(fb);
  }

  $("#dev-counter").textContent = `Pregunta ${state.devIndex + 1} de ${DEV_QUESTIONS.length}`;
  $("#dev-prev").disabled = state.devIndex === 0;
  $("#dev-next").textContent = state.devIndex === DEV_QUESTIONS.length - 1 ? "Ver resultados →" : "Siguiente →";
}

/* =====================================================================
   RESULTADOS
   ===================================================================== */
function renderResults() {
  const c = $("#results-content");
  c.innerHTML = "";

  /* --- MC --- */
  const graded = MC_QUESTIONS.filter(q => state.mc[q.id] && state.mc[q.id].graded);
  const correct = graded.filter(q => state.mc[q.id].correct);

  const mcCard = el("div", "card");
  mcCard.appendChild(el("h2", null, "🎯 Multiple Choice"));
  const gridMC = el("div", "results-grid");
  const stat = (big, cls, label) => {
    const d = el("div", "stat-card");
    d.appendChild(el("div", "big " + (cls || ""), big));
    d.appendChild(el("div", "muted", label));
    return d;
  };
  gridMC.appendChild(stat(graded.length + "/60", "", "respondidas"));
  gridMC.appendChild(stat(String(correct.length), "ok", "correctas"));
  gridMC.appendChild(stat(String(graded.length - correct.length), "bad", "incorrectas"));
  const pctMC = graded.length ? Math.round(correct.length / graded.length * 100) : 0;
  gridMC.appendChild(stat(pctMC + "%", pctMC >= 60 ? "ok" : "warn", "de acierto"));
  mcCard.appendChild(gridMC);

  // desglose por unidad y dificultad
  mcCard.appendChild(el("h3", null, "Desglose"));
  const groups = [
    { label: "Unidad 1 — Redes y protocolos", f: q => q.unit === 1, color: "var(--u1)" },
    { label: "Unidad 2 — Transmisión de datos", f: q => q.unit === 2, color: "var(--u2)" },
    { label: "Unidad 3 — Medios, codificación y mux", f: q => q.unit === 3, color: "var(--u3)" },
    { label: "Nivel medio", f: q => q.diff === "media", color: "#9dbcff" },
    { label: "Nivel difícil", f: q => q.diff === "dificil", color: "var(--bad)" },
    { label: "Selección múltiple", f: q => q.multi, color: "#b5a3ff" }
  ];
  groups.forEach(g => {
    const qs = MC_QUESTIONS.filter(g.f);
    const done = qs.filter(q => state.mc[q.id] && state.mc[q.id].graded);
    const ok = done.filter(q => state.mc[q.id].correct);
    const pct = done.length ? ok.length / done.length * 100 : 0;
    const row = el("div", "bar-row");
    row.appendChild(el("div", "label", `${g.label} (${ok.length}/${done.length} de ${qs.length})`));
    const track = el("div", "bar-track");
    const fill = el("div", "bar-fill");
    fill.style.width = pct + "%"; fill.style.background = g.color;
    track.appendChild(fill);
    row.appendChild(track);
    mcCard.appendChild(row);
  });

  // preguntas falladas
  const wrong = graded.filter(q => !state.mc[q.id].correct);
  if (wrong.length) {
    mcCard.appendChild(el("h3", null, "Para repasar (" + wrong.length + ")"));
    wrong.forEach(q => {
      const idx = MC_QUESTIONS.indexOf(q);
      const p = el("p", "small");
      const link = el("span", "review-link", `#${idx + 1} [U${q.unit} · ${q.diff}] ${q.q.slice(0, 90)}...`);
      link.addEventListener("click", () => { state.mcIndex = idx; saveState(); show("mc"); });
      p.appendChild(link);
      mcCard.appendChild(p);
    });
  }
  c.appendChild(mcCard);

  /* --- Desarrollo --- */
  const dGraded = DEV_QUESTIONS.filter(q => state.dev[q.id] && state.dev[q.id].graded);
  const dOk = dGraded.filter(q => state.dev[q.id].verdict === "correcta");
  const dPart = dGraded.filter(q => state.dev[q.id].verdict === "parcial");

  const devCard = el("div", "card");
  devCard.appendChild(el("h2", null, "✍️ Desarrollo"));
  const gridDev = el("div", "results-grid");
  gridDev.appendChild(stat(dGraded.length + "/20", "", "respondidas"));
  gridDev.appendChild(stat(String(dOk.length), "ok", "correctas"));
  gridDev.appendChild(stat(String(dPart.length), "warn", "parciales"));
  gridDev.appendChild(stat(String(dGraded.length - dOk.length - dPart.length), "bad", "incorrectas"));
  devCard.appendChild(gridDev);

  const avg = dGraded.length ? Math.round(dGraded.reduce((a, q) => a + state.dev[q.id].score, 0) / dGraded.length * 100) : 0;
  devCard.appendChild(el("p", null, `Cobertura promedio de conceptos: <b>${avg}%</b>`));

  const dWeak = dGraded.filter(q => state.dev[q.id].verdict !== "correcta");
  if (dWeak.length) {
    devCard.appendChild(el("h3", null, "Para repasar"));
    dWeak.forEach(q => {
      const idx = DEV_QUESTIONS.indexOf(q);
      const p = el("p", "small");
      const link = el("span", "review-link", `#${idx + 1} [U${q.unit}] ${q.q.slice(0, 90)}...`);
      link.addEventListener("click", () => { state.devIndex = idx; saveState(); show("dev"); });
      p.appendChild(link);
      devCard.appendChild(p);
    });
  }
  c.appendChild(devCard);

  /* --- nota global --- */
  if (graded.length === 60 && dGraded.length === 20) {
    const final = el("div", "card");
    const mcScore = correct.length / 60;
    const devScore = dGraded.reduce((a, q) => a + state.dev[q.id].score, 0) / 20;
    const total = Math.round((mcScore * 0.6 + devScore * 0.4) * 100);
    final.appendChild(el("h2", null, "🏁 Nota global simulada"));
    final.appendChild(el("p", "muted", "Ponderación: 60% multiple choice + 40% desarrollo."));
    const d = el("div", "stat-card");
    d.appendChild(el("div", "big " + (total >= 60 ? "ok" : "bad"), total + "/100"));
    d.appendChild(el("div", "muted", total >= 60 ? "¡Aprobarías! Seguí repasando lo marcado." : "Todavía no llegás al 60 — repasá las preguntas marcadas."));
    final.appendChild(d);
    c.appendChild(final);
  }
}

/* =====================================================================
   INIT
   ===================================================================== */
function init() {
  loadState();

  $("#nav-home").addEventListener("click", () => show("home"));
  $("#nav-mc").addEventListener("click", () => show("mc"));
  $("#nav-dev").addEventListener("click", () => show("dev"));
  $("#nav-results").addEventListener("click", () => show("results"));
  $("#btn-start-mc").addEventListener("click", () => show("mc"));
  $("#btn-start-dev").addEventListener("click", () => show("dev"));
  $("#btn-reset").addEventListener("click", () => {
    if (confirm("¿Borrar todo el progreso (respuestas y correcciones)?")) {
      localStorage.removeItem(STORAGE_KEY);
      state.mc = {}; state.dev = {}; state.mcIndex = 0; state.devIndex = 0;
      show("home");
      renderMCMap(); renderDevMap();
    }
  });

  $("#mc-prev").addEventListener("click", () => { if (state.mcIndex > 0) { state.mcIndex--; saveState(); renderMC(); } });
  $("#mc-next").addEventListener("click", () => {
    if (state.mcIndex < MC_QUESTIONS.length - 1) { state.mcIndex++; saveState(); renderMC(); }
    else show("results");
  });
  $("#dev-prev").addEventListener("click", () => { if (state.devIndex > 0) { state.devIndex--; saveState(); renderDev(); } });
  $("#dev-next").addEventListener("click", () => {
    if (state.devIndex < DEV_QUESTIONS.length - 1) { state.devIndex++; saveState(); renderDev(); }
    else show("results");
  });

  renderMCMap();
  renderDevMap();
  show("home");
}

document.addEventListener("DOMContentLoaded", init);
