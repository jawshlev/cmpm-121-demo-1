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
const upgradeCountWholeFoods = document.getElementById("upgradeCountA1")!;
const upgradeCountThreeMichelinStar =
  document.getElementById("upgradeCountC1")!;

let upgradeCostSafeway = 10;
let upgradeCostWholeFoods = 50;
let upgradeCostHomemade = 100;
let upgradeCostChef = 1000;
let upgradeCostThreeMichelinStar = 5000;

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
const upgradeButtonWholeFoods = document.createElement("button");
const upgradeButtonChef = document.createElement("button");
const upgradeButtonThreeMichelinStar = document.createElement("button");

function updateUpgradeCosts() {
  upgradeButtonSafeway.textContent = `Safeway Sushi🛒 (Cost: ${upgradeCostSafeway.toFixed(
    2,
  )})`;

  upgradeButtonWholeFoods.textContent = `WholeFoods Sushi🥕 (Cost: ${upgradeCostWholeFoods.toFixed(
    2,
  )})`;

  upgradeButtonHomemade.textContent = `Homemade Sushi🔪 (Cost: ${upgradeCostHomemade.toFixed(
    2,
  )})`;

  upgradeButtonChef.textContent = `Sushi Chef🍱 (Cost: ${upgradeCostChef.toFixed(
    2,
  )})`;

  upgradeButtonThreeMichelinStar.textContent = `Three Michelin Star Sushi⭐️ (Cost: ${upgradeCostThreeMichelinStar.toFixed(
    2,
  )})`;
}

upgradeButtonSafeway.disabled = true; // Disable by default
upgradeButtonWholeFoods.disabled = true;
upgradeButtonHomemade.disabled = true; // Disable by default
upgradeButtonChef.disabled = true; // Disable by default
upgradeButtonThreeMichelinStar.disabled = true;

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
upgradeButtonWholeFoods.addEventListener("click", function () {
  if (count >= upgradeCostWholeFoods) {
    count -= upgradeCostWholeFoods;
    upgradeCostWholeFoods = upgradeCostWholeFoods * 1.15;
    growthRate += 1;
    autoIncrementActive = true;
    upgradeItems[1].count++;
    updateUpgradeCosts();
    updateCountDisplay();
    updateGrowthRateDisplay();
    updateUpgradeCounts();
    checkUpgradeAffordability();
  }
});
upgradeButtonHomemade.addEventListener("click", function () {
  if (count >= upgradeCostHomemade) {
    count -= upgradeCostHomemade; // Deduct 10 units
    upgradeCostHomemade = upgradeCostHomemade * 1.15;
    growthRate += 2.0; // Increment the growth rate
    autoIncrementActive = true; // Enable auto-increment after purchase
    upgradeItems[2].count++;
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
    upgradeItems[3].count++;
    updateUpgradeCosts();
    updateUpgradeCounts();
    updateCountDisplay();
    updateGrowthRateDisplay();
    checkUpgradeAffordability(); // Recheck affordability after purchase
  }
});
upgradeButtonThreeMichelinStar.addEventListener("click", function () {
  if (count >= upgradeCostThreeMichelinStar) {
    count -= upgradeCostThreeMichelinStar;
    upgradeCostThreeMichelinStar = upgradeCostThreeMichelinStar * 1.15;
    growthRate += 500;
    autoIncrementActive = true;
    upgradeItems[4].count++;
    updateUpgradeCosts();
    updateCountDisplay();
    updateGrowthRateDisplay();
    updateUpgradeCounts();
    checkUpgradeAffordability();
  }
});

// Add event listener to the button
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const upgradeContainer = document.createElement("div");
upgradeContainer.style.textAlign = "center"; // Center-align the container
upgradeContainer.appendChild(upgradeButtonSafeway);
upgradeContainer.appendChild(upgradeButtonWholeFoods);
upgradeContainer.appendChild(upgradeButtonHomemade);
upgradeContainer.appendChild(upgradeButtonChef);
upgradeContainer.appendChild(upgradeButtonThreeMichelinStar);
app.append(upgradeContainer);

const upgradeCountContainer = document.createElement("div");
upgradeCountContainer.style.textAlign = "center";
upgradeCountContainer.appendChild(growthRateDisplay);
upgradeCountContainer.appendChild(upgradeCountSafeway);
upgradeCountContainer.appendChild(upgradeCountWholeFoods);
upgradeCountContainer.appendChild(upgradeCountHomemade);
upgradeCountContainer.appendChild(upgradeCountChef);
upgradeCountContainer.appendChild(upgradeCountThreeMichelinStar);
app.append(upgradeCountContainer);

// Function to check if the upgrade can be afforded
function checkUpgradeAffordability() {
  if (count >= upgradeCostSafeway) {
    upgradeButtonSafeway.disabled = false;
  } else {
    upgradeButtonSafeway.disabled = true;
  }
  if (count >= upgradeCostWholeFoods) {
    upgradeButtonWholeFoods.disabled = false;
  } else {
    upgradeButtonWholeFoods.disabled = true;
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
  if (count >= upgradeCostThreeMichelinStar) {
    upgradeButtonThreeMichelinStar.disabled = false;
  } else {
    upgradeButtonThreeMichelinStar.disabled = true;
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
  { id: "B", cost: upgradeCostWholeFoods, growthRate: 1, count: 0 },
  { id: "C", cost: upgradeCostHomemade, growthRate: 2.0, count: 0 },
  { id: "D", cost: upgradeCostChef, growthRate: 50, count: 0 },
  { id: "E", cost: upgradeCostThreeMichelinStar, growthRate: 500, count: 0 },
];

function updateUpgradeCounts() {
  upgradeCountSafeway.textContent = `Safeway Sushi🛒(Not the best sushi in the world but not too bad): ${upgradeItems[0].count}`;
  upgradeCountWholeFoods.textContent = `WholeFoods Sushi🥕(Better than safeway for sure but still not the best): ${upgradeItems[1].count}`;
  upgradeCountHomemade.textContent = `Homemade Sushi🔪(You are quite the home cook, pretty decent sushi): ${upgradeItems[2].count}`;
  upgradeCountChef.textContent = `Sushi Chef🍱(Great sushi, very delicious): ${upgradeItems[3].count}`;
  upgradeCountThreeMichelinStar.textContent = `Three Michelin Star Sushi⭐️(The best sushi in the world): ${upgradeItems[4].count}`;
}

updateUpgradeCounts();
updateUpgradeCosts();
// Add event listener to the count display for upgrade affordability check
countDisplay.addEventListener("DOMSubtreeModified", checkUpgradeAffordability);
