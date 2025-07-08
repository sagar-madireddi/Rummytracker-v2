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

  let winner = null;
  players.forEach(player => {
    const value = parseInt(form.elements[player].value);
    if (isNaN(value)) return alert("All scores must be numbers.");
    round[player] = value;
    if (value === 0) winner = player;
  });

  if (!winner) {
    alert("One player must have a score of 0 (the winner).");
    return;
  }

  round["dealer"] = players[currentRound]; // Dealer rotates
  round["winner"] = winner;

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

  scores.forEach(round => {
    const winner = round["winner"];

    players.forEach(player => {
      if (player !== winner) {
        const score = round[player];
        net[winner] += score;
        net[player] -= score;
      }
    });
  });

  const resultList = document.getElementById("result-list");
  resultList.innerHTML = "";

  players.forEach(player => {
    const amount = net[player];
    const color = amount >= 0 ? "green" : "red";
    resultList.innerHTML += `<li style="color:${color};">${player}: ₹${amount}</li>`;
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

