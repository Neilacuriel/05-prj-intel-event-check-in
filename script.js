document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("checkInForm");
  const nameInput = document.getElementById("attendeeName");
  const teamSelect = document.getElementById("teamSelect");
  const greeting = document.getElementById("greeting");
  const celebration = document.getElementById("celebration");

  const attendeeCount = document.getElementById("attendeeCount");
  const progressBar = document.getElementById("progressBar");

  const waterCount = document.getElementById("waterCount");
  const zeroCount = document.getElementById("zeroCount");
  const powerCount = document.getElementById("powerCount");

  let total = 0;
  let water = 0;
  let zero = 0;
  let power = 0;
  const goal = 50;

  function updateProgress() {
    const percent = Math.min((total / goal) * 100, 100);
    progressBar.style.width = `${percent}%`;
  }

  function getWinningMessage() {
    const maxCount = Math.max(water, zero, power);
    const winners = [];

    if (water === maxCount) {
      winners.push("Team Water Wise");
    }

    if (zero === maxCount) {
      winners.push("Team Net Zero");
    }

    if (power === maxCount) {
      winners.push("Team Renewables");
    }

    if (winners.length === 1) {
      return `Goal reached! The winning team is ${winners[0]}!`;
    }

    if (winners.length === 2) {
      return `Goal reached! It's a tie between ${winners[0]} and ${winners[1]}!`;
    }

    return "Goal reached! It's a three-way tie between Team Water Wise, Team Net Zero, and Team Renewables!";
  }

  function updateCelebration() {
    if (total >= goal) {
      celebration.textContent = getWinningMessage();
      return;
    }

    celebration.textContent = "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const team = teamSelect.value;

    if (name === "" || team === "") {
      greeting.textContent = "Please enter a name and pick a team.";
      return;
    }

    total += 1;
    attendeeCount.textContent = total;

    if (team === "water") {
      water += 1;
      waterCount.textContent = water;
    } else if (team === "zero") {
      zero += 1;
      zeroCount.textContent = zero;
    } else if (team === "power") {
      power += 1;
      powerCount.textContent = power;
    }

    greeting.textContent = `Welcome, ${name}! Thanks for supporting ${teamSelect.options[teamSelect.selectedIndex].text}.`;

    updateProgress();
    updateCelebration();
    form.reset();
    nameInput.focus();
  });

  updateProgress();
  updateCelebration();
});
