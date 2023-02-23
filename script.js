const theMission = document.getElementById("mission");

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
  
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  
  setInterval(() => {
    getRandomMission();
  }, millisecondsPerDay);