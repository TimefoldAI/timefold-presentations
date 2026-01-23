// Vibe coded with Claude Code
class GreedyTreeCanvas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.trees = [];
    this.connections = [];
    this.showConnections = false;
    this.bruteForceRunning = false;
    this.triedCount = 0;
    this.totalRoutes = 0;
    this.bestRoute = null;
    this.bestDistance = Infinity;
    this.currentRoute = null;
    this.elapsedTime = 0;
    this.worker = null;
  }

  get algorithm() {
    return (this.getAttribute('algorithm') || 'both').toLowerCase();
  }

  connectedCallback() {
    this.render();
    this.canvas = this.shadowRoot.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.connectBtn = this.shadowRoot.querySelector('#connect-btn');
    this.bruteBtn = this.shadowRoot.querySelector('#brute-btn');
    this.resetBtn = this.shadowRoot.querySelector('#reset-btn');
    this.counter = this.shadowRoot.querySelector('#counter');

    this.canvas.addEventListener('click', (e) => this.handleClick(e));
    this.connectBtn.addEventListener('click', () => this.runGreedy());
    this.bruteBtn.addEventListener('click', () => this.runBruteForce());
    this.resetBtn.addEventListener('click', () => this.reset());
    window.addEventListener('resize', () => this.resizeCanvas());

    // Show/hide buttons based on algorithm attribute
    this.updateButtonVisibility();

    // Handle Reveal.js slide changes
    if (window.Reveal) {
      Reveal.on('slidechanged', () => this.resizeCanvas());
    }

    // Initial resize with slight delay for layout
    requestAnimationFrame(() => this.resizeCanvas());
  }

  updateButtonVisibility() {
    const algo = this.algorithm;
    if (algo === 'greedy') {
      this.connectBtn.style.display = 'block';
      this.bruteBtn.style.display = 'none';
    } else if (algo === 'brute') {
      this.connectBtn.style.display = 'none';
      this.bruteBtn.style.display = 'block';
    } else {
      this.connectBtn.style.display = 'block';
      this.bruteBtn.style.display = 'block';
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
        }
        canvas {
          width: 100%;
          height: 100%;
          cursor: crosshair;
          background: linear-gradient(to bottom, #87CEEB 0%, #87CEEB 80%, #228B22 100%);
        }
        .buttons {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
        }
        button {
          padding: 12px 24px;
          font-size: 18px;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }
        #connect-btn {
          background: #4CAF50;
        }
        #connect-btn:hover {
          background: #45a049;
        }
        #brute-btn {
          background: #9C27B0;
        }
        #brute-btn:hover {
          background: #7B1FA2;
        }
        #reset-btn {
          background: #f44336;
        }
        #reset-btn:hover {
          background: #da190b;
        }
        #counter {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 18px;
          font-family: monospace;
          display: none;
        }
      </style>
      <canvas></canvas>
      <div id="counter"></div>
      <div class="buttons">
        <button id="connect-btn">Greedy</button>
        <button id="brute-btn">Brute Force</button>
        <button id="reset-btn">Reset</button>
      </div>
    `;
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
      this.redraw();
    }
  }

  handleClick(e) {
    if (this.showConnections || this.bruteForceRunning) return;

    // Ensure canvas is sized on first interaction
    if (this.canvas.width === 0 || this.canvas.height === 0) {
      this.resizeCanvas();
    }

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.trees.push({ x, y });
    this.redraw();
  }

  runGreedy() {
    if (this.trees.length < 2) return;

    this.connections = [];
    const visited = new Set([0]);
    let current = 0;

    while (visited.size < this.trees.length) {
      let bestDist = Infinity;
      let bestNext = null;

      for (let j = 0; j < this.trees.length; j++) {
        if (visited.has(j)) continue;
        const dist = Math.hypot(
          this.trees[current].x - this.trees[j].x,
          this.trees[current].y - this.trees[j].y
        );
        if (dist < bestDist) {
          bestDist = dist;
          bestNext = j;
        }
      }

      if (bestNext !== null) {
        visited.add(bestNext);
        this.connections.push({ from: current, to: bestNext });
        current = bestNext;
      }
    }

    this.showConnections = true;
    this.connectBtn.style.display = 'none';
    this.bruteBtn.style.display = 'none';
    this.redraw();
  }

  runBruteForce() {
    if (this.trees.length < 2) return;

    this.bruteForceRunning = true;
    this.triedCount = 0;
    this.bestRoute = null;
    this.bestDistance = Infinity;
    this.counter.style.display = 'block';
    this.connectBtn.style.display = 'none';
    this.bruteBtn.style.display = 'none';

    // Create inline worker with generator-based permutations (memory efficient)
    const workerCode = `
      function factorial(n) {
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
      }

      // Heap's algorithm as a generator - produces permutations one at a time
      function* permutationGenerator(arr) {
        const c = new Array(arr.length).fill(0);
        yield [...arr];

        let i = 0;
        while (i < arr.length) {
          if (c[i] < i) {
            if (i % 2 === 0) {
              [arr[0], arr[i]] = [arr[i], arr[0]];
            } else {
              [arr[c[i]], arr[i]] = [arr[i], arr[c[i]]];
            }
            yield [...arr];
            c[i]++;
            i = 0;
          } else {
            c[i] = 0;
            i++;
          }
        }
      }

      self.onmessage = function(e) {
        const trees = e.data.trees;
        const indices = [];
        for (let i = 0; i < trees.length; i++) indices.push(i);

        const total = factorial(trees.length);
        const startTime = performance.now();

        let bestRoute = null;
        let bestDistance = Infinity;
        let triedCount = 0;
        let lastUpdate = performance.now();

        for (const route of permutationGenerator(indices)) {
          triedCount++;

          let dist = 0;
          for (let i = 0; i < route.length - 1; i++) {
            dist += Math.hypot(
              trees[route[i]].x - trees[route[i + 1]].x,
              trees[route[i]].y - trees[route[i + 1]].y
            );
          }

          if (dist < bestDistance) {
            bestDistance = dist;
            bestRoute = [...route];
          }

          const now = performance.now();
          if (now - lastUpdate >= 100) {
            const elapsed = now - startTime;
            self.postMessage({
              type: 'progress',
              triedCount,
              total,
              elapsed,
              currentRoute: route,
              bestRoute,
              bestDistance
            });
            lastUpdate = now;
          }
        }

        const elapsed = performance.now() - startTime;
        self.postMessage({
          type: 'done',
          triedCount,
          total,
          elapsed,
          bestRoute,
          bestDistance
        });
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    this.worker = new Worker(URL.createObjectURL(blob));

    this.worker.onmessage = (e) => {
      const data = e.data;

      if (data.type === 'progress') {
        this.triedCount = data.triedCount;
        this.currentRoute = data.currentRoute;
        this.bestRoute = data.bestRoute;
        this.bestDistance = data.bestDistance;
        this.totalRoutes = data.total;
        this.elapsedTime = data.elapsed;
        this.updateCounter();
        this.redraw();
      } else if (data.type === 'done') {
        this.triedCount = data.triedCount;
        this.totalRoutes = data.total;
        this.elapsedTime = data.elapsed;
        this.bestRoute = data.bestRoute;
        this.bestDistance = data.bestDistance;
        this.currentRoute = null;

        this.connections = [];
        for (let i = 0; i < this.bestRoute.length - 1; i++) {
          this.connections.push({ from: this.bestRoute[i], to: this.bestRoute[i + 1] });
        }

        this.showConnections = true;
        this.bruteForceRunning = false;
        this.updateCounter(true);
        this.redraw();
        this.worker.terminate();
        this.worker = null;
      }
    };

    this.worker.postMessage({ trees: this.trees });
  }

  updateCounter(final = false) {
    const total = this.totalRoutes || this.factorial(this.trees.length);
    if (final) {
      const totalTime = this.formatTime(this.elapsedTime);
      this.counter.innerHTML = `✓ Tried ${this.triedCount.toLocaleString()}/${total.toLocaleString()} routes<br>Best distance: ${Math.round(this.bestDistance)}px<br>Time: ${totalTime}`;
    } else {
      const remaining = total - this.triedCount;
      const rate = this.triedCount / this.elapsedTime; // routes per ms
      const estimatedMs = remaining / rate;
      const timeLeft = this.formatTime(estimatedMs);
      this.counter.innerHTML = `Trying route ${this.triedCount.toLocaleString()}/${total.toLocaleString()}<br>Est. time left: ${timeLeft}`;
    }
  }

  formatTime(ms) {
    if (!ms || !isFinite(ms)) return '...';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years}y ${Math.floor((days % 365) / 30)}mo`;
    } else if (months > 0) {
      return `${months}mo ${days % 30}d`;
    } else if (days > 0) {
      return `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  factorial(n) {
    return n <= 1 ? 1 : n * this.factorial(n - 1);
  }

  redraw() {
    if (!this.ctx) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw current brute force attempt (gray)
    if (this.bruteForceRunning && this.currentRoute) {
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
      ctx.lineWidth = 2;
      for (let i = 0; i < this.currentRoute.length - 1; i++) {
        const from = this.trees[this.currentRoute[i]];
        const to = this.trees[this.currentRoute[i + 1]];
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      // Draw best route so far (green)
      if (this.bestRoute) {
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 3;
        for (let i = 0; i < this.bestRoute.length - 1; i++) {
          const from = this.trees[this.bestRoute[i]];
          const to = this.trees[this.bestRoute[i + 1]];
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        }
      }
    }

    // Draw final connections
    if (this.showConnections && !this.bruteForceRunning) {
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 4;

      for (const conn of this.connections) {
        const from = this.trees[conn.from];
        const to = this.trees[conn.to];
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
    }

    // Draw tree emojis with numbers
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < this.trees.length; i++) {
      const tree = this.trees[i];

      // Draw tree emoji
      ctx.font = '60px serif';
      ctx.fillText('🎄', tree.x, tree.y);

      // Draw number above tree
      ctx.font = 'bold 18px sans-serif';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.strokeText(i + 1, tree.x, tree.y - 30);
      ctx.fillText(i + 1, tree.x, tree.y - 30);
    }
  }

  reset() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.trees = [];
    this.connections = [];
    this.showConnections = false;
    this.bruteForceRunning = false;
    this.triedCount = 0;
    this.totalRoutes = 0;
    this.bestRoute = null;
    this.bestDistance = Infinity;
    this.currentRoute = null;
    this.elapsedTime = 0;
    this.updateButtonVisibility();
    this.counter.style.display = 'none';
    this.counter.innerHTML = '';
    this.redraw();
  }
}

customElements.define('greedy-tree-canvas', GreedyTreeCanvas);