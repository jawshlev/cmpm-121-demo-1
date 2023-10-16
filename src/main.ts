import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Josh's game";

document.title = gameName;

let count: number = 0;
let growthRate: number = 0; // Default growth rate
let lastTimestamp: number = performance.now(); // Initialize with current timestamp
let autoIncrementActive: boolean = false; // Flag to track if auto-increment is active
const countIncreasePerSecond = 1 / 60; // 1 unit per second assuming 60 frames per second
const countDisplay = document.getElementById("countDisplay")!;

countDisplay.style.margin = "auto";
countDisplay.style.textAlign = "center";

const myButton = document.getElementById("counterButton")!;
myButton.style.textAlign = "center";

const growthRateDisplay = document.getElementById("growthRateDisplay")!;
const upgradeCountA = document.getElementById("upgradeCountA")!;
const upgradeCountB = document.getElementById("upgradeCountB")!;
const upgradeCountC = document.getElementById("upgradeCountC")!;

// Function to update the count display
function updateCountDisplay() {
  countDisplay.textContent = `Count: ${count.toFixed(2)}🍣`;
}

// Function to update the growth rate display
function updateGrowthRateDisplay() {
  growthRateDisplay.textContent = `Growth Rate: ${growthRate.toFixed(2)}🍣/s`;
}

// Function to handle the auto-increment
function handleAutoIncrement(timestamp: number) {
  if (autoIncrementActive) {
    const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert milliseconds to seconds
    count += (countIncreasePerSecond + growthRate) * deltaTime;
    updateCountDisplay();
  }

  lastTimestamp = timestamp;
  requestAnimationFrame(handleAutoIncrement);
}

// Start the auto-increment animation
requestAnimationFrame(handleAutoIncrement);

// Add event listener to the button

myButton.addEventListener("click", function () {
  count += 1; // Increment by 1 when the button is clicked
  updateCountDisplay();
});

// Add a purchasable upgrade item
const upgradeButtonA = document.createElement("button");
const upgradeButtonB = document.createElement("button");
const upgradeButtonC = document.createElement("button");

upgradeButtonA.textContent = "Purchase Upgrade (Cost: 10)";
upgradeButtonA.disabled = true; // Disable by default

upgradeButtonB.textContent = "Purchase Upgrade (Cost: 100)";
upgradeButtonB.disabled = true; // Disable by default

upgradeButtonC.textContent = "Purchase Upgrade (Cost: 1000)";
upgradeButtonC.disabled = true; // Disable by default

upgradeButtonA.addEventListener("click", function () {
  if (count >= 10) {
    count -= 10; // Deduct 10 units
    growthRate += 0.1; // Increment the growth rate
    autoIncrementActive = true; // Enable auto-increment after purchase
    upgradeItems[0].count++;
    updateCountDisplay();
    updateGrowthRateDisplay();
    updateUpgradeCounts();
    checkUpgradeAffordability(); // Recheck affordability after purchase
  }
});
upgradeButtonB.addEventListener("click", function () {
  if (count >= 100) {
    count -= 100; // Deduct 10 units
    growthRate += 2.0; // Increment the growth rate
    autoIncrementActive = true; // Enable auto-increment after purchase
    upgradeItems[1].count++;
    updateCountDisplay();
    updateUpgradeCounts();
    updateGrowthRateDisplay();
    checkUpgradeAffordability(); // Recheck affordability after purchase
  }
});
upgradeButtonC.addEventListener("click", function () {
  if (count >= 1000) {
    count -= 1000; // Deduct 10 units
    growthRate += 50; // Increment the growth rate
    autoIncrementActive = true; // Enable auto-increment after purchase
    upgradeItems[2].count++;
    updateUpgradeCounts();
    updateCountDisplay();
    updateGrowthRateDisplay();
    checkUpgradeAffordability(); // Recheck affordability after purchase
  }
});

// Add event listener to the button
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const upgradeContainer = document.createElement("div");
upgradeContainer.style.textAlign = "center"; // Center-align the container
upgradeContainer.appendChild(upgradeButtonA);
upgradeContainer.appendChild(upgradeButtonB);
upgradeContainer.appendChild(upgradeButtonC);
app.append(upgradeContainer);

const upgradeCountContainer = document.createElement("div");
upgradeCountContainer.style.textAlign = "center";
upgradeCountContainer.appendChild(growthRateDisplay);
upgradeCountContainer.appendChild(upgradeCountA);
upgradeCountContainer.appendChild(upgradeCountB);
upgradeCountContainer.appendChild(upgradeCountC);
app.append(upgradeCountContainer);

// Function to check if the upgrade can be afforded
function checkUpgradeAffordability() {
  if (count >= 10) {
    upgradeButtonA.disabled = false;
  } else {
    upgradeButtonA.disabled = true;
  }
  if (count >= 100) {
    upgradeButtonB.disabled = false;
  } else {
    upgradeButtonB.disabled = true;
  }
  if (count >= 1000) {
    upgradeButtonC.disabled = false;
  } else {
    upgradeButtonC.disabled = true;
  }
}

interface UpgradeItem {
  id: string;
  cost: number;
  growthRate: number;
  count: number;
}

const upgradeItems: UpgradeItem[] = [
  { id: "A", cost: 10, growthRate: 0.1, count: 0 },
  { id: "B", cost: 100, growthRate: 2.0, count: 0 },
  { id: "C", cost: 1000, growthRate: 50, count: 0 },
];

function updateUpgradeCounts() {
  upgradeCountA.textContent = `Upgrade A: ${upgradeItems[0].count}`;
  upgradeCountB.textContent = `Upgrade B: ${upgradeItems[1].count}`;
  upgradeCountC.textContent = `Upgrade C: ${upgradeItems[2].count}`;
}

updateUpgradeCounts();
// Add event listener to the count display for upgrade affordability check
countDisplay.addEventListener("DOMSubtreeModified", checkUpgradeAffordability);
