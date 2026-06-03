// Vibe coded with Claude Code
// Demonstrates shift scheduling optimization with Greedy and Brute Force approaches.
// Model: numEmployees employees assigned to (day × shift-type) slots, k employees per slot.
//   Employees may work multiple days; constraint is at most one shift per employee per day.
//   k, days, and employees are all independent sliders — no auto-adjustment between them.
//   -1 in assignment arrays means "unassigned" (only when numEmployees < 2*k).
// Brute force optimizes each day independently: P(numEmployees, 2k) permutations × numDays.
class ShiftSchedulingCanvas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.numDays      = 3;
    this.numEmployees = 6;
    this.k            = 2; // employees per shift type per day
    this.compatibilityMatrix = []; // [employee][day*2 + shiftType]  — numEmployees × numDays*2
    this.greedyAssignment = null;  // length = numDays*2*k; position i → employeeIndex
    this.bruteAssignment  = null;
    this.currentAssignment = null;
    this.triedCount        = 0;
    this.totalCombinations = 0;
    this.elapsedTime       = 0;
    this.worker            = null;
    this.bruteForceRunning = false;
    this.greedyDone        = false;
    this.bruteDone         = false;

    this.employeeNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jake', 'Kim', 'Leo', 'Mia', 'Nick', 'Olivia', 'Paul', 'Quinn', 'Rose', 'Sam', 'Tara'];
    // Day names generated dynamically in _dayName() to support up to 30 days
  }

  // total positions to fill = days × 2 shift types × k employees per type
  get numShifts() { return this.numDays * 2 * this.k; }

  _dayName(d) {
    const names = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    if (this.numDays <= 7) return names[d % 7];
    return `D${d + 1}`;
  }

  get algorithm() {
    return (this.getAttribute('algorithm') || 'both').toLowerCase();
  }

  connectedCallback() {
    this.render();
    this._setupRefs();
    this._setupEvents();
    this.generateMatrix();
    this._syncSliderLabels();
    // ResizeObserver handles initial sizing; rAF is a fallback
    requestAnimationFrame(() => this.resizeCanvas());
  }

  _setupRefs() {
    const sr = this.shadowRoot;
    this.canvas          = sr.querySelector('canvas');
    this.ctx             = this.canvas.getContext('2d');
    this.greedyBtn       = sr.querySelector('#greedy-btn');
    this.bruteBtn        = sr.querySelector('#brute-btn');
    this.resetBtn        = sr.querySelector('#reset-btn');
    this.counter         = sr.querySelector('#counter');
    this.daysSlider      = sr.querySelector('#days-slider');
    this.employeesSlider = sr.querySelector('#employees-slider');
    this.kSlider         = sr.querySelector('#k-slider');
    this.daysValue       = sr.querySelector('#days-value');
    this.employeesValue  = sr.querySelector('#employees-value');
    this.kValue          = sr.querySelector('#k-value');
  }

  _setupEvents() {
    this.daysSlider.addEventListener('input',      () => this._onDaysChange());
    this.employeesSlider.addEventListener('input', () => this._onEmployeesChange());
    this.kSlider.addEventListener('input',         () => this._onKChange());
    this.greedyBtn.addEventListener('click',  () => this.runGreedy());
    this.bruteBtn.addEventListener('click',   () => this.runBruteForce());
    this.resetBtn.addEventListener('click',   () => this.reset());
    window.addEventListener('resize', () => this.resizeCanvas());
    if (window.Reveal) Reveal.on('slidechanged', () => this.resizeCanvas());
    this._ro = new ResizeObserver(() => this.resizeCanvas());
    this._ro.observe(this.canvas);
    this._updateButtonVisibility();
  }

  _updateButtonVisibility() {
    const algo = this.algorithm;
    const showGreedy = (algo !== 'brute')  && !this.greedyDone && !this.bruteForceRunning;
    const showBrute  = (algo !== 'greedy') && !this.bruteDone  && !this.bruteForceRunning;
    this.greedyBtn.style.display = showGreedy ? 'block' : 'none';
    this.bruteBtn.style.display  = showBrute  ? 'block' : 'none';
  }

  _onDaysChange() {
    if (this.bruteForceRunning) return;
    this.numDays = parseInt(this.daysSlider.value);
    this._afterSliderChange();
  }

  _onEmployeesChange() {
    if (this.bruteForceRunning) return;
    this.numEmployees = parseInt(this.employeesSlider.value);
    this._afterSliderChange();
  }

  _onKChange() {
    if (this.bruteForceRunning) return;
    this.k = parseInt(this.kSlider.value);
    this._afterSliderChange();
  }

  _afterSliderChange() {
    this._syncSliderLabels();
    this._softReset();
    this.generateMatrix();
    this.redraw();
  }

  _syncSliderLabels() {
    this.daysValue.textContent      = this.numDays;
    this.employeesValue.textContent = this.numEmployees;
    this.kValue.textContent         = this.k;
  }

  // Matrix is numEmployees × (numDays*2): column = day*2 + shiftType (0=early,1=late)
  generateMatrix() {
    this.compatibilityMatrix = [];
    for (let e = 0; e < this.numEmployees; e++) {
      this.compatibilityMatrix[e] = [];
      for (let s = 0; s < this.numDays * 2; s++) {
        this.compatibilityMatrix[e][s] = Math.floor(Math.random() * 91) + 10;
      }
    }
  }

  _softReset() {
    if (this.worker) { this.worker.terminate(); this.worker = null; }
    this.greedyAssignment  = null;
    this.bruteAssignment   = null;
    this.currentAssignment = null;
    this.triedCount        = 0;
    this.totalCombinations = 0;
    this.elapsedTime       = 0;
    this.bruteForceRunning = false;
    this.greedyDone        = false;
    this.bruteDone         = false;
    this.counter.style.display = 'none';
    this.counter.innerHTML     = '';
    this._updateButtonVisibility();
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  // From a flat assignment array, return the shiftType (0=early,1=late) for position i
  _slotType(i)  { return Math.floor((i % (2 * this.k)) / this.k); } // 0 or 1
  _slotDay(i)   { return Math.floor(i / (2 * this.k)); }             // 0..numDays-1


  // ── Greedy ──────────────────────────────────────────────────────────────────

  runGreedy() {
    if (this.bruteForceRunning || this.greedyDone) return;
    const n          = this.numShifts;
    const assignment = new Array(n);
    // Employees may work multiple days; track per-day usage so no one works twice in one day
    const usedPerDay = Array.from({length: this.numDays}, () => new Set());

    for (let i = 0; i < n; i++) {
      const day  = this._slotDay(i);
      const type = this._slotType(i);
      const col  = day * 2 + type;
      let bestEmp = -1, bestScore = -1;
      for (let e = 0; e < this.numEmployees; e++) {
        if (!usedPerDay[day].has(e) && this.compatibilityMatrix[e][col] > bestScore) {
          bestScore = this.compatibilityMatrix[e][col];
          bestEmp   = e;
        }
      }
      // -1 only when numEmployees < 2*k (not enough people for both shifts on this day)
      assignment[i] = bestEmp;
      if (bestEmp !== -1) usedPerDay[day].add(bestEmp);
    }

    this.greedyAssignment = assignment;
    this.greedyDone       = true;
    this._updateButtonVisibility();
    this.redraw();
  }

  // ── Brute Force ─────────────────────────────────────────────────────────────

  runBruteForce() {
    if (this.bruteForceRunning || this.bruteDone) return;

    this.bruteForceRunning = true;
    this.triedCount        = 0;
    this.bruteAssignment   = null;
    this.currentAssignment = null;
    this.counter.style.display = 'block';
    this._updateButtonVisibility();

    const k = this.k;

    const workerCode = `
      function permCount(n, r) {
        if (r > n) return 0;
        let v = 1;
        for (let i = n; i > n - r; i--) v *= i;
        return v;
      }

      // Pre-generate all ordered selections of r items from [0..n-1]
      function allDayPerms(n, r) {
        const result = [];
        const used = new Array(n).fill(false);
        const cur  = [];
        function gen() {
          if (cur.length === r) { result.push([...cur]); return; }
          for (let i = 0; i < n; i++) {
            if (!used[i]) { used[i] = true; cur.push(i); gen(); cur.pop(); used[i] = false; }
          }
        }
        gen();
        return result;
      }

      self.onmessage = function(e) {
        const { matrix, numShifts, numEmployees, k, numDays } = e.data;
        const startTime   = performance.now();
        const slotsPerDay = 2 * k;
        const r           = Math.min(slotsPerDay, numEmployees);

        // Pre-generate all permutations for a single day once
        const dayPerms    = allDayPerms(numEmployees, r);
        const numDayPerms = dayPerms.length; // P(numEmployees, r)

        // Total combinations = P(n,r)^numDays — may be astronomically large
        let total = 1;
        for (let d = 0; d < numDays; d++) {
          total *= numDayPerms;
          if (!isFinite(total)) { total = Infinity; break; }
        }

        let bestAssignment = null;
        let bestScore      = -Infinity;
        let triedCount     = 0;
        let lastUpdate     = performance.now();
        const assignment   = new Array(numShifts).fill(-1);

        // Mixed-radix counter: indices[d] selects which day-perm to use for day d
        const indices = new Array(numDays).fill(0);

        while (true) {
          triedCount++;

          // Build full assignment from current index tuple
          assignment.fill(-1);
          for (let d = 0; d < numDays; d++) {
            const perm = dayPerms[indices[d]];
            const base = d * slotsPerDay;
            for (let p = 0; p < r; p++) assignment[base + p] = perm[p];
          }

          // Score
          let score = 0;
          for (let i = 0; i < numShifts; i++) {
            if (assignment[i] === -1) continue;
            const day  = Math.floor(i / slotsPerDay);
            const type = Math.floor((i % slotsPerDay) / k);
            score += matrix[assignment[i]][day * 2 + type];
          }

          if (score > bestScore) {
            bestScore      = score;
            bestAssignment = [...assignment];
          }

          const now = performance.now();
          if (now - lastUpdate >= 100) {
            self.postMessage({
              type: 'progress', triedCount, total,
              elapsed: now - startTime,
              currentAssignment: [...assignment],
              bestAssignment: bestAssignment ? [...bestAssignment] : null
            });
            lastUpdate = now;
          }

          // Increment mixed-radix counter (rightmost day first)
          let carry = 1;
          for (let d = numDays - 1; d >= 0 && carry; d--) {
            indices[d]++;
            if (indices[d] >= numDayPerms) { indices[d] = 0; }
            else { carry = 0; }
          }
          if (carry) break; // all combinations exhausted
        }

        self.postMessage({
          type: 'done', triedCount, total,
          elapsed: performance.now() - startTime,
          bestAssignment
        });
      };
    `;

    const blob  = new Blob([workerCode], { type: 'application/javascript' });
    this.worker = new Worker(URL.createObjectURL(blob));

    this.worker.onmessage = (ev) => {
      const data = ev.data;
      if (data.type === 'progress') {
        this.triedCount        = data.triedCount;
        this.currentAssignment = data.currentAssignment;
        this.bruteAssignment   = data.bestAssignment;
        this.totalCombinations = data.total;
        this.elapsedTime       = data.elapsed;
        this._updateCounter();
        this.redraw();
      } else if (data.type === 'done') {
        this.triedCount        = data.triedCount;
        this.totalCombinations = data.total;
        this.elapsedTime       = data.elapsed;
        this.bruteAssignment   = data.bestAssignment;
        this.currentAssignment = null;
        this.bruteForceRunning = false;
        this.bruteDone         = true;
        this._updateCounter(true);
        this._updateButtonVisibility();
        this.redraw();
        this.worker.terminate();
        this.worker = null;
      }
    };

    this.worker.postMessage({
      matrix: this.compatibilityMatrix,
      numShifts: this.numShifts,
      numEmployees: this.numEmployees,
      k,
      numDays: this.numDays
    });
  }

  _updateCounter(final = false) {
    const total    = this.totalCombinations;
    const totalStr = isFinite(total) ? total.toLocaleString() : '∞';
    if (final) {
      this.counter.innerHTML =
        `✓ Tried ${this.triedCount.toLocaleString()}/${totalStr} schedules` +
        ` &nbsp;|&nbsp; Time: ${this._formatTime(this.elapsedTime)}`;
    } else {
      const timeLeft = isFinite(total)
        ? this._formatTime((total - this.triedCount) / (this.triedCount / this.elapsedTime))
        : '∞';
      this.counter.innerHTML =
        `Trying schedule ${this.triedCount.toLocaleString()} / ${totalStr}` +
        ` &nbsp;|&nbsp; Est. time left: ${timeLeft}`;
    }
  }

  _formatTime(ms) {
    if (!ms || !isFinite(ms)) return '…';
    const s = Math.floor(ms / 1000), m = Math.floor(s / 60), h = Math.floor(m / 60);
    const d = Math.floor(h / 24), mo = Math.floor(d / 30), y = Math.floor(d / 365);
    if (y  > 0) return `${y}y ${Math.floor((d % 365) / 30)}mo`;
    if (mo > 0) return `${mo}mo ${d % 30}d`;
    if (d  > 0) return `${d}d ${h % 24}h`;
    if (h  > 0) return `${h}h ${m % 60}m`;
    if (m  > 0) return `${m}m ${s % 60}s`;
    return `${s}s`;
  }

  reset() {
    this._softReset();
    this.generateMatrix();
    this.redraw();
  }

  // ── Render / Draw ────────────────────────────────────────────────────────────

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          background: #0f0e17;
        }
        canvas {
          display: block;
          width: 100%;
          height: calc(100% - 64px);
        }
        .controls {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          background: rgba(0,0,0,0.55);
          padding: 0 16px;
          box-sizing: border-box;
        }
        .slider-group {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ddd;
          font-size: 15px;
          font-family: sans-serif;
          white-space: nowrap;
        }
        .slider-value { font-weight: bold; min-width: 22px; color: #fff; }
        input[type=range] { width: 110px; accent-color: #4CAF50; cursor: pointer; }
        button {
          padding: 9px 18px; font-size: 15px; color: white;
          border: none; border-radius: 8px; cursor: pointer;
          box-shadow: 0 3px 6px rgba(0,0,0,0.4); white-space: nowrap;
        }
        #greedy-btn       { background: #4CAF50; }
        #greedy-btn:hover { background: #45a049; }
        #brute-btn        { background: #9C27B0; }
        #brute-btn:hover  { background: #7B1FA2; }
        #reset-btn        { background: #f44336; }
        #reset-btn:hover  { background: #da190b; }
        #counter {
          position: absolute;
          top: 10px; left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.82);
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 15px; font-family: monospace;
          display: none; text-align: center;
          z-index: 10; white-space: nowrap; line-height: 1.5;
        }
      </style>
      <canvas></canvas>
      <div id="counter"></div>
      <div class="controls">
        <div class="slider-group">
          <label for="days-slider">Days:</label>
          <input type="range" id="days-slider" min="2" max="30" value="3">
          <span class="slider-value" id="days-value">3</span>
        </div>
        <div class="slider-group">
          <label for="employees-slider">Employees:</label>
          <input type="range" id="employees-slider" min="4" max="20" value="6">
          <span class="slider-value" id="employees-value">6</span>
        </div>
        <div class="slider-group">
          <label for="k-slider">Per shift:</label>
          <input type="range" id="k-slider" min="1" max="8" value="2">
          <span class="slider-value" id="k-value">2</span>
        </div>
        <button id="greedy-btn">Greedy</button>
        <button id="brute-btn">Brute Force</button>
        <button id="reset-btn">Reset</button>
      </div>
    `;
  }

  resizeCanvas() {
    const rect  = this.canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width  = rect.width  * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.redraw();
    }
  }

  // Count filled Early/Late slots per day for a given assignment array
  _countFilledPerDay(assignment) {
    if (!assignment) return null;
    const counts = [];
    for (let d = 0; d < this.numDays; d++) {
      const base = d * 2 * this.k;
      let earlyFilled = 0, lateFilled = 0;
      for (let p = 0; p < this.k; p++) {
        if (assignment[base + p] !== -1) earlyFilled++;
        if (assignment[base + this.k + p] !== -1) lateFilled++;
      }
      counts.push({ earlyFilled, lateFilled });
    }
    return counts;
  }

  // Map employee e and day d to their shift assignment for a given assignment array
  _getShiftType(assignment, e, d) {
    if (!assignment) return null;
    const k = this.k;
    const base = d * 2 * k;
    for (let p = 0; p < k; p++) {
      if (assignment[base + p] === e)     return 0; // early
      if (assignment[base + k + p] === e) return 1; // late
    }
    return null;
  }

  redraw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const dpr = window.devicePixelRatio || 1;
    const W   = this.canvas.width  / dpr;
    const H   = this.canvas.height / dpr;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0f0e17';
    ctx.fillRect(0, 0, W, H);

    // ── Layout ─────────────────────────────────────────────────────────────────
    const SCORE_BAR_H = 28;
    const HEADER_H    = 64;
    const LEFT_W      = Math.min(90, W * 0.13);
    const gridW       = W - LEFT_W - 6;
    const gridH       = H - HEADER_H - SCORE_BAR_H - 4;
    const scoreBarY   = HEADER_H + gridH + 4;
    const cellW       = gridW / this.numDays;
    const cellH       = gridH / this.numEmployees;
    const labelSz     = Math.min(14, cellH * 0.32, cellW * 0.18);
    const iconSz      = Math.min(cellH * 0.48, cellW * 0.38, 24);

    const greedy  = this.greedyAssignment;
    const brute   = this.bruteDone ? this.bruteAssignment : null;
    const current = this.bruteForceRunning ? this.currentAssignment : null;

    // ── Determine active assignment for staffing counts ────────────────────────
    const activeAssignment = (this.bruteDone && this.bruteAssignment)
      ? this.bruteAssignment
      : (this.bruteForceRunning && this.bruteAssignment)
        ? this.bruteAssignment
        : (this.greedyDone ? this.greedyAssignment : null);
    const staffing = this._countFilledPerDay(activeAssignment);

    // ── Day column headers ─────────────────────────────────────────────────────
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.font         = `bold ${labelSz + 1}px sans-serif`;
    ctx.fillStyle    = 'rgba(255,255,255,0.25)';
    ctx.fillText('emp \\ day', LEFT_W / 2, HEADER_H / 2);

    for (let d = 0; d < this.numDays; d++) {
      const cx = LEFT_W + (d + 0.5) * cellW;
      ctx.font      = `bold ${labelSz + 1}px sans-serif`;
      ctx.fillStyle = '#ddd';
      ctx.fillText(this._dayName(d), cx, 16);

      // Staffing indicator: "E: X/k  L: X/k"
      if (staffing) {
        const { earlyFilled, lateFilled } = staffing[d];
        const fullyStaffed = earlyFilled === this.k && lateFilled === this.k;
        ctx.font      = `${Math.max(10, labelSz - 1)}px monospace`;
        ctx.fillStyle = fullyStaffed ? '#4CAF50' : '#ff6b6b';
        ctx.fillText(`E:${earlyFilled}/${this.k} L:${lateFilled}/${this.k}`, cx, 38);
      }
    }

    // Sub-legend inside header (Early / Late)
    ctx.font      = `${labelSz - 2}px sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillText('☀ Early   ☾ Late', LEFT_W + gridW / 2, HEADER_H - 8);

    // ── Employee name labels ───────────────────────────────────────────────────
    ctx.font      = `bold ${labelSz}px sans-serif`;
    ctx.textAlign = 'right';
    for (let e = 0; e < this.numEmployees; e++) {
      ctx.fillStyle = '#ccc';
      ctx.fillText(this.employeeNames[e], LEFT_W - 6, HEADER_H + (e + 0.5) * cellH);
    }

    // ── Grid cells ─────────────────────────────────────────────────────────────
    for (let e = 0; e < this.numEmployees; e++) {
      for (let d = 0; d < this.numDays; d++) {
        const cx = LEFT_W + d * cellW;
        const cy = HEADER_H + e * cellH;

        const greedyType  = this._getShiftType(greedy,  e, d);
        const bruteType   = this._getShiftType(brute,   e, d);
        const currentType = this._getShiftType(current, e, d);

        // ── Cell base (very dim shift-tint even when empty) ────────────────────
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(cx + 1, cy + 1, cellW - 2, cellH - 2);

        // ── Current brute attempt (dimmest) ────────────────────────────────────
        if (currentType !== null && bruteType === null) {
          ctx.fillStyle = currentType === 0
            ? 'rgba(245,158,11,0.20)'
            : 'rgba(129,140,248,0.20)';
          ctx.fillRect(cx + 1, cy + 1, cellW - 2, cellH - 2);
        }

        // ── Greedy assignment ──────────────────────────────────────────────────
        if (greedyType !== null && this.greedyDone) {
          const alpha = this.bruteDone ? 0.30 : 0.55;
          ctx.fillStyle = greedyType === 0
            ? `rgba(245,158,11,${alpha})`
            : `rgba(129,140,248,${alpha})`;
          ctx.fillRect(cx + 1, cy + 1, cellW - 2, cellH - 2);
        }

        // ── Brute-force optimal assignment ────────────────────────────────────
        if (bruteType !== null) {
          ctx.fillStyle = bruteType === 0
            ? 'rgba(245,158,11,0.65)'
            : 'rgba(129,140,248,0.65)';
          ctx.fillRect(cx + 1, cy + 1, cellW - 2, cellH - 2);
        }

        // ── Icon ───────────────────────────────────────────────────────────────
        const shownType = bruteType !== null ? bruteType
                        : greedyType !== null ? greedyType
                        : currentType;
        if (shownType !== null) {
          ctx.font         = `${iconSz}px serif`;
          ctx.textAlign    = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle    = 'rgba(255,255,255,0.88)';
          ctx.fillText(shownType === 0 ? '☀' : '☾', cx + cellW / 2, cy + cellH / 2);
        }

        // ── Borders ────────────────────────────────────────────────────────────
        if (greedyType !== null && this.greedyDone) {
          ctx.strokeStyle = '#FFD700';
          ctx.lineWidth   = this.bruteDone ? 2 : 3;
          ctx.strokeRect(cx + 2.5, cy + 2.5, cellW - 5, cellH - 5);
        }
        if (bruteType !== null) {
          ctx.strokeStyle = '#4CAF50';
          ctx.lineWidth   = 3;
          ctx.strokeRect(cx + 2.5, cy + 2.5, cellW - 5, cellH - 5);
        }
        if (currentType !== null && bruteType === null) {
          ctx.strokeStyle = currentType === 0
            ? 'rgba(245,158,11,0.40)'
            : 'rgba(129,140,248,0.40)';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(cx + 2.5, cy + 2.5, cellW - 5, cellH - 5);
        }
      }
    }

    // ── Grid lines ─────────────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth   = 1;
    for (let d = 0; d <= this.numDays; d++) {
      const x = LEFT_W + d * cellW;
      ctx.beginPath(); ctx.moveTo(x, HEADER_H); ctx.lineTo(x, HEADER_H + gridH); ctx.stroke();
    }
    for (let row = 0; row <= this.numEmployees; row++) {
      const y = HEADER_H + row * cellH;
      ctx.beginPath(); ctx.moveTo(LEFT_W, y); ctx.lineTo(LEFT_W + gridW, y); ctx.stroke();
    }

    // ── Day separator (bolder lines between days) ──────────────────────────────
    ctx.strokeStyle = 'rgba(255,255,255,0.20)';
    ctx.lineWidth   = 1.5;
    for (let d = 1; d < this.numDays; d++) {
      const x = LEFT_W + d * cellW;
      ctx.beginPath(); ctx.moveTo(x, 6); ctx.lineTo(x, HEADER_H + gridH); ctx.stroke();
    }

    // ── k label (employees per shift slot) ────────────────────────────────────
    ctx.font      = `${labelSz - 1}px sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.30)';
    ctx.fillText(`${this.k} per shift slot`, LEFT_W, scoreBarY + SCORE_BAR_H / 2);

    // ── Result label ───────────────────────────────────────────────────────────
    ctx.font         = 'bold 14px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign    = 'center';

    if (this.bruteDone && this.greedyDone) {
      ctx.fillStyle = '#aaffaa';
      ctx.fillText('Optimal schedule found!', LEFT_W + gridW / 2, scoreBarY + SCORE_BAR_H / 2);
    } else if (this.greedyDone) {
      ctx.fillStyle = '#FFD700';
      ctx.fillText('Greedy schedule assigned', LEFT_W + gridW / 2, scoreBarY + SCORE_BAR_H / 2);
    } else if (this.bruteDone) {
      ctx.fillStyle = '#4CAF50';
      ctx.fillText('Optimal schedule found!', LEFT_W + gridW / 2, scoreBarY + SCORE_BAR_H / 2);
    }

    // Idle hint
    if (!this.greedyDone && !this.bruteForceRunning && !this.bruteDone) {
      ctx.font      = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.fillText(
        `${this.numDays} days  ×  ${this.k} employee${this.k > 1 ? 's' : ''} per shift  ×  2 shift types  =  ${this.numShifts} positions to fill`,
        LEFT_W + gridW / 2,
        scoreBarY + SCORE_BAR_H / 2
      );
    }
  }
}

customElements.define('shift-scheduling-canvas', ShiftSchedulingCanvas);