const startBtn = document.querySelector("[data-start]")
const stopBtn = document.querySelector("[data-stop]")
let timerId = null

startBtn.addEventListener("click", startBtnClick);
stopBtn.addEventListener("click", stopBtnClick);

stopBtn.disabled = true

function startBtnClick() {
    startBtn.disabled = true
    stopBtn.disabled = false
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopBtnClick() {
    startBtn.disabled = false
    stopBtn.disabled = true
    clearInterval(timerId)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}