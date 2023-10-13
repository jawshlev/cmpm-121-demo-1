import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Josh's game";

document.title = gameName;

let count: number = 0;
let lastFrameTime = performance.now();

function updateCountDisplay() {
  const countDisplay = document.getElementById("countDisplay")!;
  countDisplay.textContent = `Count: ${Math.round(count)}🍣`;
}

function incrementCounter() {
  count++;
  updateCountDisplay();
}

function animateCounter(timestamp: number) {
  const elapsedSeconds = (timestamp - lastFrameTime) / 1000;
  count += (1 / 60) * elapsedSeconds;

  incrementCounter();

  lastFrameTime = timestamp;
  requestAnimationFrame(animateCounter);
}

requestAnimationFrame(animateCounter);

const myButton = document.getElementById("counterButton")!;
myButton.addEventListener("click", incrementCounter);

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
