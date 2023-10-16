import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "FEED THE KITTY";

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

let upgradeCostA = 10;
let upgradeCostB = 100;
let upgradeCostC = 1000;

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

function updateUpgradeCosts() {
  upgradeButtonA.textContent = `Safeway Sushi🛒 (Cost: ${upgradeCostA.toFixed(
    2,
  )})`;

  upgradeButtonB.textContent = `Homemade Sushi🔪 (Cost: ${upgradeCostB.toFixed(
    2,
  )})`;

  upgradeButtonC.textContent = `Sushi Chef🍱 (Cost: ${upgradeCostC.toFixed(
    2,
  )})`;
}

upgradeButtonA.disabled = true; // Disable by default
upgradeButtonB.disabled = true; // Disable by default
upgradeButtonC.disabled = true; // Disable by default

upgradeButtonA.addEventListener("click", function () {
  if (count >= upgradeCostA) {
    count -= upgradeCostA; // Deduct 10 units
    upgradeCostA = upgradeCostA * 1.15;
    growthRate += 0.1; // Increment the growth rate
    autoIncrementActive = true; // Enable auto-increment after purchase
    upgradeItems[0].count++;
    updateUpgradeCosts();
    updateCountDisplay();
    updateGrowthRateDisplay();
    updateUpgradeCounts();
    checkUpgradeAffordability(); // Recheck affordability after purchase
  }
});
upgradeButtonB.addEventListener("click", function () {
  if (count >= upgradeCostB) {
    count -= upgradeCostB; // Deduct 10 units
    upgradeCostB = upgradeCostB * 1.15;
    growthRate += 2.0; // Increment the growth rate
    autoIncrementActive = true; // Enable auto-increment after purchase
    upgradeItems[1].count++;
    updateUpgradeCosts();
    updateCountDisplay();
    updateUpgradeCounts();
    updateGrowthRateDisplay();
    checkUpgradeAffordability(); // Recheck affordability after purchase
  }
});
upgradeButtonC.addEventListener("click", function () {
  if (count >= upgradeCostC) {
    count -= upgradeCostC; // Deduct 10 units
    upgradeCostC = upgradeCostC * 1.15;
    growthRate += 50; // Increment the growth rate
    autoIncrementActive = true; // Enable auto-increment after purchase
    upgradeItems[2].count++;
    updateUpgradeCosts();
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
  if (count >= upgradeCostA) {
    upgradeButtonA.disabled = false;
  } else {
    upgradeButtonA.disabled = true;
  }
  if (count >= upgradeCostB) {
    upgradeButtonB.disabled = false;
  } else {
    upgradeButtonB.disabled = true;
  }
  if (count >= upgradeCostC) {
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
  { id: "A", cost: upgradeCostA, growthRate: 0.1, count: 0 },
  { id: "B", cost: upgradeCostB, growthRate: 2.0, count: 0 },
  { id: "C", cost: upgradeCostC, growthRate: 50, count: 0 },
];

function updateUpgradeCounts() {
  upgradeCountA.textContent = `Safeway Sushi🛒: ${upgradeItems[0].count}`;
  upgradeCountB.textContent = `Homemade Sushi🔪: ${upgradeItems[1].count}`;
  upgradeCountC.textContent = `Sushi Chef🍱: ${upgradeItems[2].count}`;
}

updateUpgradeCounts();
updateUpgradeCosts();
// Add event listener to the count display for upgrade affordability check
countDisplay.addEventListener("DOMSubtreeModified", checkUpgradeAffordability);
