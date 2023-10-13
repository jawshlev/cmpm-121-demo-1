import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Josh's game";

document.title = gameName;

const myButton = document.getElementById("counterButton")!;
let count: number = 0;
const countDisplay = document.getElementById("countDisplay")!;

myButton.addEventListener("click", () => {
  count++;
  countDisplay.textContent = `Count: ${count}🍣`;
});
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
