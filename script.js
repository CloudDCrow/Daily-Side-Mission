const theMission = document.getElementById("mission");
const xpBar = document.querySelector('.xp-bar');
const xpProgress = document.querySelector('.xp-progress');
const levelNum = document.querySelector('#level-num');
const xpNum = document.querySelector('#xp-num');
const completedButton = document.querySelector('#completed-button');
const attemptedButton = document.querySelector("#attempted-button");

const date = new Date();
const currentDate = date.getDate();

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

function updateXP() {
  if (localStorage.getItem('xp') != null) {
    xp = parseInt(localStorage.getItem('xp'));
  }
  if (localStorage.getItem('xpRequirement') != null) {
    xpRequirement = parseInt(localStorage.getItem('xpRequirement'));
  }
  if (localStorage.getItem('level') != null) {
    level = parseInt(localStorage.getItem('level'));
  }
}

function updateXPBar() {
  const progress = xp / xpRequirement * 100;
  xpProgress.style.width = `${progress}%`;
  xpNum.textContent = `${xp}/${xpRequirement}`;
  levelNum.textContent = level;
}
  
getRandomMission();
updateXP();
updateXPBar();

function levelUp() {
  level++;
  localStorage.setItem('level', level);

  xp = xp - xpRequirement;
  xpRequirement += 5;
  localStorage.setItem('xpRequirement', xpRequirement);

  levelNum.textContent = level;
  xpNum.textContent = `${xp}/${xpRequirement}`;
}

function handleCompletedButtonClick() {
  const gainedXP = Math.floor(Math.random() * (8 - 5 + 1)) + 5;
  
  xp += gainedXP;
  
  if (xp >= xpRequirement) {
    levelUp();
  }2
  
  localStorage.setItem('xp', xp);
  updateXPBar();
  completedButton.style.display = 'none';
  attemptedButton.style.display = 'none';
}

function handleAttemptedButtonClick() {
  const gainedXP = 2;
  
  xp += gainedXP;
  
  if (xp >= xpRequirement) {
    levelUp();
  }

  localStorage.setItem('xp', xp)
  updateXPBar();
  completedButton.style.display = 'none';
  attemptedButton.style.display = 'none';
}

completedButton.addEventListener('click', handleCompletedButtonClick);
attemptedButton.addEventListener('click', handleAttemptedButtonClick);