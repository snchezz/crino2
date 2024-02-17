// Set the countdown time (in minutes)
let countdownTimes = [5, 10]; // Default times for countdown1 and countdown2

let countdowns = []; // Array to store countdown intervals
let vibrationDuration = 1000; // Vibration duration in milliseconds

// Initialize countdowns
countdownTimes.forEach((time, index) => {
  countdowns[index] = {
    totalSeconds: time * 60,
    interval: null
  };
});

// Update countdowns
countdowns.forEach((countdown, index) => {
  const minutesDisplay = document.getElementById(`countdown${index + 1}`);
  const stopButton = document.getElementById(`stop${index + 1}`);
  const restartButton = document.getElementById(`restart${index + 1}`);
  const timeInput = document.getElementById(`time${index + 1}`);

  // Start the countdown
  startCountdown(index);

  // Stop button event listener
  stopButton.addEventListener('click', () => {
    clearInterval(countdown.interval);
    stopButton.textContent = 'Continuar';
    stopButton.addEventListener('click', () => {
      startCountdown(index);
      stopButton.textContent = 'Parar';
    });
  });

  // Restart button event listener
  restartButton.addEventListener('click', () => {
    clearInterval(countdown.interval);
    countdown.totalSeconds = parseInt(timeInput.value) * 60;
    startCountdown(index);
  });

  function startCountdown(index) {
    countdown.interval = setInterval(() => {
      // Calculate minutes and seconds
      const minutes = Math.floor(countdown.totalSeconds / 60);
      let seconds = countdown.totalSeconds % 60;

      // Add leading zero if seconds less than 10
      seconds = seconds < 10 ? '0' + seconds : seconds;

      // Display the countdown
      minutesDisplay.textContent = `${minutes}:${seconds}`;

      // Check if countdown is finished
      if (countdown.totalSeconds <= 0) {
        clearInterval(countdown.interval);
        navigator.vibrate(vibrationDuration); // Vibrate the device
        countdown.totalSeconds = parseInt(timeInput.value) * 60; // Reset countdown
        startCountdown(index); // Restart countdown
      } else {
        // Decrease total seconds by 1
        countdown.totalSeconds--;
      }
    }, 1000);
  }
});
