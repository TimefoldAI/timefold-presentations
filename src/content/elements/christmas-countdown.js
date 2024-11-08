class ChristmasCountdown extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
        .countdown-container {
            text-align: center;
            padding: 20px;
            background: linear-gradient(to right, rgba(255,77,77,0.95), rgba(0,107,60,0.95)), url("../src/content/static/santa/route.webp");
            background-size: cover;
            color: white;
            border-radius: 10px;
            max-width: 800px;
            margin: 20px auto;
        }

        .countdown-title {
            font-size: 60px;
            margin-bottom: 20px;
        }

        .countdown {
            display: flex;
            justify-content: center;
            gap: 20px;
        }

        .time-section {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 5px;
            min-width: 80px;
        }

        .time-value {
            font-size: 60px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .time-label {
            font-size: 14px;
            text-transform: uppercase;
        }
            </style>
            <div class="countdown-container">
                <div class="countdown-title">🎄Time Until Christmas 🎄</div>
                <div class="countdown">
                    <div class="time-section">
                        <div id="days" class="time-value">00</div>
                        <div class="time-label">Days</div>
                    </div>
                    <div class="time-section">
                        <div id="hours" class="time-value">00</div>
                        <div class="time-label">Hours</div>
                    </div>
                    <div class="time-section">
                        <div id="minutes" class="time-value">00</div>
                        <div class="time-label">Minutes</div>
                    </div>
                    <div class="time-section">
                        <div id="seconds" class="time-value">00</div>
                        <div class="time-label">Seconds</div>
                    </div>
                </div>
            </div>
        `;
        this.updateCountdown(); // instant draw
        setInterval(() => { this.updateCountdown()}, 1000);
    }

    updateCountdown() {
            const now = new Date();
            const christmas = new Date(now.getFullYear(), 11, 25);
            let secondsLeft = Math.floor((christmas - now) / 1000);
            const days = Math.floor(secondsLeft / 86400); // 86400 seconds in a day
            secondsLeft %= 86400;
            const hours = Math.floor(secondsLeft / 3600); // 3600 seconds in an hour
            secondsLeft %= 3600;
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;

            this.shadowRoot.getElementById('days').textContent = days.toString().padStart(2, '0');
            this.shadowRoot.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            this.shadowRoot.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            this.shadowRoot.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
}

customElements.define('christmas-countdown', ChristmasCountdown);
