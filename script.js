let players = [];
let scores = [];
let currentRound = 0;

function startGame(event) {
  event.preventDefault();
  const input = document.getElementById("players-input").value.trim();
  players = input.split('\n').map(p => p.trim()).filter(p => p !== '');

  if (players.length < 2) {
    alert("Enter at least 2 players.");
    return;
  }

  document.getElementById("setup-section").style.display = "none";
  document.getElementById("round-section").style.display = "block";
  showRound();
}

function showRound() {
  document.getElementById("round-title").textContent = `Round ${currentRound + 1} — Dealer: ${players[currentRound]}`;
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
  const form = document.getElementById("score-form");
  const round = {};
  let winner = null;

  players.forEach(player => {
    const val = parseInt(form.elements[player].value);
    if (isNaN(val)) return alert("All scores must be numbers.");
    round[player] = val;
    if (val === 0) winner = player;
  });

  if (!winner) {
    alert("One player must have score 0 (winner).");
    return;
  }

  round["dealer"] = players[currentRound];
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
    const winner = round.winner;
    players.forEach(player => {
      if (player !== winner) {
        const val = round[player];
        net[winner] += val;
        net[player] -= val;
      }
    });
  });

  const resultList = document.getElementById("result-list");
  resultList.innerHTML = "";
  players.forEach(player => {
    const color = net[player] >= 0 ? "green" : "red";
    resultList.innerHTML += `<li style="color:${color};">${player}: ₹${net[player]}</li>`;
  });
}

function resetGame() {
  players = [];
  scores = [];
  currentRound = 0;

  document.getElementById("setup-section").style.display = "block";
  document.getElementById("round-section").style.display = "none";
  document.getElementById("result-section").style.display = "none";
  document.getElementById("players-input").value = "";
}
