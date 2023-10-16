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
const upgradeCountSafeway = document.getElementById("upgradeCountA")!;
const upgradeCountHomemade = document.getElementById("upgradeCountB")!;
const upgradeCountChef = document.getElementById("upgradeCountC")!;

let upgradeCostSafeway = 10;
let upgradeCostHomemade = 100;
let upgradeCostChef = 1000;

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
const upgradeButtonSafeway = document.createElement("button");
const upgradeButtonHomemade = document.createElement("button");
const upgradeButtonChef = document.createElement("button");

function updateUpgradeCosts() {
  upgradeButtonSafeway.textContent = `Safeway Sushi🛒 (Cost: ${upgradeCostSafeway.toFixed(
    2,
  )})`;

  upgradeButtonHomemade.textContent = `Homemade Sushi🔪 (Cost: ${upgradeCostHomemade.toFixed(
    2,
  )})`;

  upgradeButtonChef.textContent = `Sushi Chef🍱 (Cost: ${upgradeCostChef.toFixed(
    2,
  )})`;
}

upgradeButtonSafeway.disabled = true; // Disable by default
upgradeButtonHomemade.disabled = true; // Disable by default
upgradeButtonChef.disabled = true; // Disable by default

upgradeButtonSafeway.addEventListener("click", function () {
  if (count >= upgradeCostSafeway) {
    count -= upgradeCostSafeway; // Deduct 10 units
    upgradeCostSafeway = upgradeCostSafeway * 1.15;
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
upgradeButtonHomemade.addEventListener("click", function () {
  if (count >= upgradeCostHomemade) {
    count -= upgradeCostHomemade; // Deduct 10 units
    upgradeCostHomemade = upgradeCostHomemade * 1.15;
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
upgradeButtonChef.addEventListener("click", function () {
  if (count >= upgradeCostChef) {
    count -= upgradeCostChef; // Deduct 10 units
    upgradeCostChef = upgradeCostChef * 1.15;
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
upgradeContainer.appendChild(upgradeButtonSafeway);
upgradeContainer.appendChild(upgradeButtonHomemade);
upgradeContainer.appendChild(upgradeButtonChef);
app.append(upgradeContainer);

const upgradeCountContainer = document.createElement("div");
upgradeCountContainer.style.textAlign = "center";
upgradeCountContainer.appendChild(growthRateDisplay);
upgradeCountContainer.appendChild(upgradeCountSafeway);
upgradeCountContainer.appendChild(upgradeCountHomemade);
upgradeCountContainer.appendChild(upgradeCountChef);
app.append(upgradeCountContainer);

// Function to check if the upgrade can be afforded
function checkUpgradeAffordability() {
  if (count >= upgradeCostSafeway) {
    upgradeButtonSafeway.disabled = false;
  } else {
    upgradeButtonSafeway.disabled = true;
  }
  if (count >= upgradeCostHomemade) {
    upgradeButtonHomemade.disabled = false;
  } else {
    upgradeButtonHomemade.disabled = true;
  }
  if (count >= upgradeCostChef) {
    upgradeButtonChef.disabled = false;
  } else {
    upgradeButtonChef.disabled = true;
  }
}

interface UpgradeItem {
  id: string;
  cost: number;
  growthRate: number;
  count: number;
}

const upgradeItems: UpgradeItem[] = [
  { id: "A", cost: upgradeCostSafeway, growthRate: 0.1, count: 0 },
  { id: "B", cost: upgradeCostHomemade, growthRate: 2.0, count: 0 },
  { id: "C", cost: upgradeCostChef, growthRate: 50, count: 0 },
];

function updateUpgradeCounts() {
  upgradeCountSafeway.textContent = `Safeway Sushi🛒: ${upgradeItems[0].count}`;
  upgradeCountHomemade.textContent = `Homemade Sushi🔪: ${upgradeItems[1].count}`;
  upgradeCountChef.textContent = `Sushi Chef🍱: ${upgradeItems[2].count}`;
}

updateUpgradeCounts();
updateUpgradeCosts();
// Add event listener to the count display for upgrade affordability check
countDisplay.addEventListener("DOMSubtreeModified", checkUpgradeAffordability);
