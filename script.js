const theMission = document.getElementById("mission");
const xpBar = document.querySelector('.xp-bar');
const xpProgress = document.querySelector('.xp-progress');
const levelNum = document.querySelector('#level-num');
const xpNum = document.querySelector('#xp-num');
const completedButton = document.querySelector('#completed-button');

let xp = 0;
let level = 1;
let xpRequirement = 10;

const getRandomMission = () => {
  fetch("missions.json")
    .then(response => response.json())
    .then(missions => {
      const randomIndex = Math.floor(Math.random() * missions.missions.length);
      const randomMission = missions.missions[randomIndex];
      theMission.textContent = randomMission;
    });
}
  
getRandomMission();

function updateXPBar() {
  const progress = xp / xpRequirement * 100;
  xpProgress.style.width = `${progress}%`;
  xpNum.textContent = `${xp}/${xpRequirement}`;
}

function levelUp() {
  level++;
  xp = xp - xpRequirement;
  xpRequirement += 5;
  levelNum.textContent = level;
  xpNum.textContent = `${xp}/${xpRequirement}`;
}

function handleCompletedButtonClick() {
  // Generate a random amount of XP between 5 and 10
  const gainedXP = Math.floor(Math.random() * (8 - 5 + 1)) + 5;
  
  xp += gainedXP;
  
  // If we've reached the XP requirement for the current level, level up
  if (xp >= xpRequirement) {
    levelUp();
  }
  
  updateXPBar();
}

completedButton.addEventListener('click', handleCompletedButtonClick);