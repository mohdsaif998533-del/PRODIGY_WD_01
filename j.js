// Get DOM elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Stopwatch variables
let timer = null;          // To store the setInterval ID
let startTime = 0;         // To store the time when the watch was started
let elapsedTime = 0;       // To store the elapsed time
let isRunning = false;     // Flag to check if the stopwatch is running

// Start function
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // Get the new start time
        timer = setInterval(updateDisplay, 10); // Update the display every 10ms (for centiseconds)
        isRunning = true;
    }
}

// Pause function
function pause() {
    if (isRunning) {
        clearInterval(timer); // Stop the interval
        elapsedTime = Date.now() - startTime; // Calculate the elapsed time
        isRunning = false;
    }
}

// Reset function
function reset() {
    clearInterval(timer); // Stop the interval
    isRunning = false;
    elapsedTime = 0;
    startTime = 0;
    display.textContent = "00:00:00.00"; // Reset the display text
}

// Update display function
function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    // Calculate minutes, seconds, and centiseconds
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let centiseconds = Math.floor((elapsedTime % 1000) / 10);

    // Format the time with leading zeros
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    centiseconds = String(centiseconds).padStart(2, '0');

    // Update the display
    display.textContent = `${minutes}:${seconds}.${centiseconds}`;
}

// Add event listeners to the buttons
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);