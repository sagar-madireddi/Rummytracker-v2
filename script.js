let players = [];
let scores = [];
let currentRound = 0;

function createPlayerInputs() {
  const count = parseInt(document.getElementById("player-count").value);
  if (isNaN(count) || count < 2) return alert("Enter at least 2 players.");

  const container = document.getElementById("player-names");
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    container.innerHTML += `<input type="text" id="player-${i}" placeholder="Player ${i + 1}" required><br>`;
  }

  container.innerHTML += `<button onclick="startGame()">Start Game</button>`;
}

function startGame() {
  const count = parseInt(document.getElementById("player-count").value);
  players = [];
  for (let i = 0; i < count; i++) {
    const name = document.getElementById(`player-${i}`).value.trim();
    if (!name) return alert("All names must be filled.");
    players.push(name);
  }

  document.getElementById("setup").style.display = "none";
  document.getElementById("round-section").style.display = "block";
  showRound();
}

function showRound() {
  document.getElementById("round-title").textContent = `Round ${currentRound + 1} - Dealer: ${players[currentRound]}`;
  const inputs = document.getElementById("score-inputs");
  inputs.innerHTML = "";

  players.forEach(player => {
    inputs.innerHTML += `
      <label>${player}'s Score:</label>
      <input type="number" name="${player}" required><br>
    `;
  });
}

function submitRound(event) {
  event.preventDefault();
  const round = {};
  const form = document.getElementById("score-form");

  players.forEach(player => {
    const value = parseInt(form.elements[player].value);
    if (isNaN(value)) return alert("All scores must be numbers.");
    round[player] = value;
  });

  scores.push(round);
  currentRound++;

  if (currentRound < players.length) {
    showRound();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("round-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";

  const net = {};
  players.forEach(p => net[p] = 0);

  for (let i = 0; i < scores.length; i++) {
    const round = scores[i];
    const dealer = players[i];
    const winner = players.find(p => round[p] === 0);

    if (!winner) continue;

    players.forEach(player => {
      if (player !== winner) {
        net[winner] += round[player];
        net[player] -= round[player];
      }
    });
  }

  const resultList = document.getElementById("result-list");
  resultList.innerHTML = "";

  players.forEach(player => {
    resultList.innerHTML += `<li>${player} → Net Balance: ₹${net[player]}</li>`;
  });
}

function resetGame() {
  players = [];
  scores = [];
  currentRound = 0;
  document.getElementById("result-section").style.display = "none";
  document.getElementById("setup").style.display = "block";
  document.getElementById("player-names").innerHTML = "";
  document.getElementById("player-count").value = "";
}

