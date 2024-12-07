class Stopwatch {
    constructor(display) {
        this.display = display;
        this.lapList = document.getElementById('laps');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');

        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.lapCounter = 0;

        this.initEventListeners();
    }

    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());
    }

    start() {
        if (!this.timerInterval) {
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.updateDisplay(), 10);
            this.toggleButtons(true);
        }
    }

    pause() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            this.elapsedTime = Date.now() - this.startTime;
            this.toggleButtons(false);
        }
    }

    reset() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.display.textContent = '00:00:00';
        this.lapList.innerHTML = '';
        this.lapCounter = 0;
        this.toggleButtons(false);
    }

    recordLap() {
        if (this.timerInterval) {
            this.lapCounter++;
            const lapTime = this.formatTime(this.elapsedTime);
            const lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${this.lapCounter}: ${lapTime}`;
            this.lapList.prepend(lapItem);
        }
    }

    updateDisplay() {
        this.elapsedTime = Date.now() - this.startTime;
        this.display.textContent = this.formatTime(this.elapsedTime);
    }

    formatTime(time) {
        const date = new Date(time);
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(date.getUTCMilliseconds() / 10)
            .toString().padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    toggleButtons(isRunning) {
        this.startBtn.disabled = isRunning;
        this.pauseBtn.disabled = !isRunning;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    new Stopwatch(display);
});