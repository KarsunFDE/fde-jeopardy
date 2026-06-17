/* ============================================================
   FDE Jeopardy — game engine (vanilla JS, no build step)
   Learner-facing screen. Teaching / trap / source fields in
   board.json are NEVER rendered here — they live in HOST-GUIDE.md.
   ============================================================ */
"use strict";

const State = {
  data: null,
  roundIdx: 0,                 // 0 = Jeopardy, 1 = Double Jeopardy
  used: {},                    // key `${roundIdx}-${cat}-${clue}` -> true
  teams: [
    { name: "Team 1", score: 0 },
    { name: "Team 2", score: 0 },
    { name: "Team 3", score: 0 }
  ],
  current: null,               // { catIdx, clueIdx, clue }
  timerToggle: false,
  soundToggle: false,
  timerHandle: null
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ---------- boot ---------- */
async function boot() {
  try {
    const res = await fetch("data/board.json", { cache: "no-store" });
    State.data = await res.json();
  } catch (e) {
    document.body.innerHTML =
      '<p style="padding:40px;font-family:sans-serif">Could not load data/board.json. ' +
      'Serve over HTTP (e.g. <code>python3 -m http.server</code>), not file://.</p>';
    return;
  }
  document.title = State.data.title;
  buildScoreboard();
  renderBoard();
  wireControls();
}

/* ---------- board ---------- */
function currentRound() { return State.data.rounds[State.roundIdx]; }

function renderBoard() {
  const round = currentRound();
  const board = $("#board");
  board.innerHTML = "";
  const cats = round.categories;
  const rows = 5;

  // category headers
  cats.forEach((c) => {
    const h = document.createElement("div");
    h.className = "cat-header";
    h.textContent = c.name;
    board.appendChild(h);
  });

  // value tiles, row-major
  for (let r = 0; r < rows; r++) {
    cats.forEach((c, catIdx) => {
      const clue = c.clues[r];
      const tile = document.createElement("div");
      tile.className = "tile";
      const key = tileKey(State.roundIdx, catIdx, r);
      if (State.used[key]) {
        tile.classList.add("used");
        tile.textContent = "";
      } else {
        tile.textContent = "$" + clue.value;
        tile.addEventListener("click", () => openClue(catIdx, r));
      }
      board.appendChild(tile);
    });
  }
}

function tileKey(round, cat, clue) { return `${round}-${cat}-${clue}`; }

/* ---------- clue overlay ---------- */
function openClue(catIdx, clueIdx) {
  const round = currentRound();
  const cat = round.categories[catIdx];
  const clue = cat.clues[clueIdx];
  State.current = { catIdx, clueIdx, clue };

  $("#clue-cat").textContent = cat.name;
  $("#clue-val").textContent = "$" + clue.value;
  $("#clue-text").textContent = clue.clue;
  $("#clue-response").textContent = clue.response;
  $("#clue-response").classList.add("hidden");
  stopTimer();
  $("#timer-bar").classList.add("hidden");

  const overlay = $("#overlay");
  overlay.classList.remove("hidden");

  if (clue.dailyDouble) {
    showDailyDouble(clue);
  } else {
    $("#dd-splash").classList.add("hidden");
    $("#clue-card").classList.remove("hidden");
    renderClueTeams();
    beep(660, 0.12);
    startTimerIfOn();
  }
}

function showDailyDouble(clue) {
  $("#clue-card").classList.add("hidden");
  $("#dd-splash").classList.remove("hidden");
  beep(440, 0.15); setTimeout(() => beep(880, 0.2), 160);

  // populate team selector + wager cap
  const sel = $("#dd-team");
  sel.innerHTML = "";
  State.teams.forEach((t, i) => {
    const o = document.createElement("option");
    o.value = i; o.textContent = t.name;
    sel.appendChild(o);
  });
  const roundMax = Math.max(...currentRound().categories[0].clues.map((c) => c.value));
  const updateMax = () => {
    const team = State.teams[+sel.value];
    const cap = Math.max(team.score, roundMax);
    $("#dd-max").textContent = "$" + cap;
    $("#dd-wager").max = cap;
    $("#dd-wager").value = clue.value;
  };
  sel.onchange = updateMax;
  updateMax();
}

$("#dd-go") && $("#dd-go").addEventListener("click", () => {
  const sel = $("#dd-team");
  const teamIdx = +sel.value;
  const team = State.teams[teamIdx];
  const roundMax = Math.max(...currentRound().categories[0].clues.map((c) => c.value));
  const cap = Math.max(team.score, roundMax);
  let wager = parseInt($("#dd-wager").value, 10);
  if (isNaN(wager) || wager < 0) wager = 0;
  if (wager > cap) wager = cap;
  State.current.ddWager = wager;
  State.current.ddTeam = teamIdx;
  $("#dd-splash").classList.add("hidden");
  $("#clue-card").classList.remove("hidden");
  refreshAmounts();   // show the wager (only on the wagering team) on the scoreboard
  renderClueTeams();  // rebuild in-clue +/- with the wager now in play
  beep(660, 0.12);
  startTimerIfOn();
});

function revealResponse() {
  if (!State.current) return;
  const resp = $("#clue-response");
  if (resp.classList.contains("hidden")) {
    resp.classList.remove("hidden");
    stopTimer();
    beep(523, 0.18);
  }
}

function closeClue() {
  if (!State.current) return;
  const { catIdx, clueIdx } = State.current;
  State.used[tileKey(State.roundIdx, catIdx, clueIdx)] = true;
  $("#overlay").classList.add("hidden");
  stopTimer();
  State.current = null;
  renderBoard();
}

/* ---------- timer ---------- */
function startTimerIfOn() {
  if (!State.timerToggle) return;
  const bar = $("#timer-bar");
  const fill = $("#timer-fill");
  bar.classList.remove("hidden");
  fill.style.transition = "none";
  fill.style.width = "100%";
  // force reflow then animate
  void fill.offsetWidth;
  const seconds = 20;
  fill.style.transition = `width ${seconds}s linear`;
  fill.style.width = "0%";
  State.timerHandle = setTimeout(() => beep(220, 0.4), seconds * 1000);
}
function stopTimer() {
  if (State.timerHandle) { clearTimeout(State.timerHandle); State.timerHandle = null; }
}

/* ---------- scoreboard ---------- */
function buildScoreboard() {
  const sb = $("#scoreboard");
  sb.innerHTML = "";
  State.teams.forEach((team, i) => {
    const div = document.createElement("div");
    div.className = "team";

    const name = document.createElement("input");
    name.className = "team-name";
    name.value = team.name;
    name.addEventListener("input", () => { team.name = name.value || `Team ${i + 1}`; });

    const score = document.createElement("div");
    score.className = "team-score";
    score.id = `score-${i}`;
    score.textContent = "$0";

    const amt = document.createElement("div");
    amt.className = "team-amt";
    amt.id = `amt-${i}`;

    const btns = document.createElement("div");
    btns.className = "team-btns";
    const plus = document.createElement("button");
    plus.className = "btn-plus"; plus.textContent = "+";
    plus.addEventListener("click", () => adjustScore(i, +1));
    const minus = document.createElement("button");
    minus.className = "btn-minus"; minus.textContent = "−";
    minus.addEventListener("click", () => adjustScore(i, -1));
    btns.appendChild(plus); btns.appendChild(minus);

    div.appendChild(name);
    div.appendChild(score);
    div.appendChild(btns);
    div.appendChild(amt);
    sb.appendChild(div);
  });
  refreshAmounts();
}

// the value currently in play for a team.
// Daily Double: only the wagering team plays — others get 0 (no award button).
// Regular clue: every team can be awarded the clue value (host adjudicates buzz).
function valueInPlay(teamIdx) {
  if (!State.current) return 0;
  if (State.current.clue.dailyDouble) {
    if (State.current.ddTeam === teamIdx && typeof State.current.ddWager === "number") {
      return State.current.ddWager;
    }
    return 0; // non-wagering teams don't play a Daily Double
  }
  return State.current.clue.value;
}

function adjustScore(teamIdx, sign) {
  const v = valueInPlay(teamIdx);
  if (!v) return;
  State.teams[teamIdx].score += sign * v;
  updateScoreDisplay(teamIdx);
  beep(sign > 0 ? 784 : 196, 0.12);
}

function fmtScore(s) { return s < 0 ? "-$" + Math.abs(s) : "$" + s; }

function updateScoreDisplay(i) {
  const s = State.teams[i].score;
  const el = $(`#score-${i}`);
  if (el) { el.textContent = fmtScore(s); el.classList.toggle("neg", s < 0); }
  const oel = $(`#oscore-${i}`);            // mirror onto the in-clue strip
  if (oel) { oel.textContent = fmtScore(s); oel.classList.toggle("neg", s < 0); }
}

/* in-clue per-team +/- strip — lets the host award OR deduct the value in play
   while the clue is up, before (or after) the response is revealed. */
function renderClueTeams() {
  const wrap = $("#clue-teams");
  if (!wrap) return;
  wrap.innerHTML = "";
  wrap.onclick = (e) => e.stopPropagation(); // never let a tap here flip the clue
  State.teams.forEach((t, i) => {
    const v = valueInPlay(i);
    const cell = document.createElement("div");
    cell.className = "ct-team" + (v ? "" : " ct-inactive");

    const name = document.createElement("div");
    name.className = "ct-name"; name.textContent = t.name;

    const score = document.createElement("div");
    score.className = "ct-score" + (t.score < 0 ? " neg" : "");
    score.id = `oscore-${i}`; score.textContent = fmtScore(t.score);

    const btns = document.createElement("div");
    btns.className = "ct-btns";
    const minus = document.createElement("button");
    minus.className = "btn-minus"; minus.textContent = "−$" + v;
    const plus = document.createElement("button");
    plus.className = "btn-plus"; plus.textContent = "+$" + v;
    if (!v) { plus.disabled = true; minus.disabled = true; }
    minus.addEventListener("click", (e) => { e.stopPropagation(); adjustScore(i, -1); });
    plus.addEventListener("click", (e) => { e.stopPropagation(); adjustScore(i, +1); });
    btns.appendChild(minus); btns.appendChild(plus);

    cell.appendChild(name); cell.appendChild(score); cell.appendChild(btns);
    wrap.appendChild(cell);
  });
}

function refreshAmounts() {
  State.teams.forEach((_, i) => {
    const a = $(`#amt-${i}`);
    if (!a) return;
    const v = State.current ? valueInPlay(i) : 0;
    a.textContent = v ? "±$" + v : "";
  });
}

/* ---------- final jeopardy ---------- */
function openFinal() {
  const f = State.data.final;
  $("#final-category").textContent = f.category;
  $("#final-clue-text").textContent = f.clue;
  $("#final-response-text").textContent = f.response;

  // wager rows
  const box = $("#final-wagers");
  box.innerHTML = "";
  State.teams.forEach((t, i) => {
    const row = document.createElement("div");
    row.className = "final-wager-row";
    const cap = Math.max(t.score, 0);
    row.innerHTML =
      `<label>${escapeHtml(t.name)}</label>` +
      `<input type="number" id="fwager-${i}" min="0" max="${cap}" value="0" />` +
      `<span class="maxlbl">max $${cap}</span>`;
    box.appendChild(row);
  });

  $("#final-stage-cat").classList.remove("hidden");
  $("#final-stage-clue").classList.add("hidden");
  $("#final-stage-resp").classList.add("hidden");
  $("#final-screen").classList.remove("hidden");
  beep(330, 0.2); setTimeout(() => beep(440, 0.25), 220);
}

$("#final-show-clue").addEventListener("click", () => {
  // clamp + stash wagers
  State.finalWagers = State.teams.map((t, i) => {
    const cap = Math.max(t.score, 0);
    let w = parseInt(($(`#fwager-${i}`) || {}).value, 10);
    if (isNaN(w) || w < 0) w = 0;
    if (w > cap) w = cap;
    return w;
  });
  $("#final-stage-cat").classList.add("hidden");
  $("#final-stage-clue").classList.remove("hidden");
  beep(660, 0.15);
  // final timer
  if (State.timerToggle) {
    const bar = $("#final-timer-bar"), fill = $("#final-timer-fill");
    bar.classList.remove("hidden");
    fill.style.transition = "none"; fill.style.width = "100%";
    void fill.offsetWidth;
    fill.style.transition = "width 30s linear"; fill.style.width = "0%";
  }
});

$("#final-show-resp").addEventListener("click", () => {
  $("#final-stage-clue").classList.add("hidden");
  $("#final-stage-resp").classList.remove("hidden");
  beep(523, 0.22);
});

$("#final-back").addEventListener("click", () => {
  $("#final-screen").classList.add("hidden");
});

/* ---------- controls + keyboard ---------- */
function wireControls() {
  $("#round-toggle").addEventListener("click", () => {
    State.roundIdx = State.roundIdx === 0 ? 1 : 0;
    $("#round-toggle").querySelector("strong").textContent = currentRound().name;
    renderBoard();
  });

  $("#final-btn").addEventListener("click", openFinal);

  $("#timer-toggle").addEventListener("change", (e) => { State.timerToggle = e.target.checked; });
  $("#sound-toggle").addEventListener("change", (e) => { State.soundToggle = e.target.checked; });

  $("#fs-btn").addEventListener("click", () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  });

  // overlay click = reveal then close
  $("#overlay").addEventListener("click", (e) => {
    if ($("#dd-splash").classList.contains("hidden") === false) return; // wager stage: ignore
    if ($("#clue-response").classList.contains("hidden")) revealResponse();
    else closeClue();
  });
  refreshAmounts();
  // keep amounts current when a clue opens
  const obs = new MutationObserver(refreshAmounts);
  obs.observe($("#overlay"), { attributes: true, attributeFilter: ["class"] });

  document.addEventListener("keydown", (e) => {
    const overlayOpen = !$("#overlay").classList.contains("hidden");
    const finalOpen = !$("#final-screen").classList.contains("hidden");
    if (e.code === "Space" && overlayOpen) {
      e.preventDefault();
      if (!$("#dd-splash").classList.contains("hidden")) return; // don't reveal during wager
      if ($("#clue-response").classList.contains("hidden")) revealResponse();
      else closeClue();
    } else if (e.code === "Escape") {
      if (overlayOpen) closeClue();
      else if (finalOpen) $("#final-screen").classList.add("hidden");
    }
  });
}

/* ---------- web audio beeps (default off) ---------- */
let audioCtx = null;
function beep(freq, dur) {
  if (!State.soundToggle) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine"; osc.frequency.value = freq;
    gain.gain.value = 0.08;
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    osc.stop(audioCtx.currentTime + dur);
  } catch (e) { /* ignore */ }
}

/* ---------- util ---------- */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

boot();
