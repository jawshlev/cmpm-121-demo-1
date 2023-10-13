import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Josh's game";

document.title = gameName;

const myButton = document.getElementById("counterButton")!;
let count: number = 0;

function updateCountDisplay() {
  const countDisplay = document.getElementById("countDisplay")!;
  countDisplay.textContent = `Count: ${count}🍣`;
}
function incrementCounter() {
  count++;
  updateCountDisplay();
}
setInterval(incrementCounter, 1000);
myButton.addEventListener("click", incrementCounter);

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
