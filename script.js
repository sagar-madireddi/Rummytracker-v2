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

<<<<<<< HEAD
  const resultList = document.getElementById("result-list");
  resultList.innerHTML = "";

  // Step 1: Initialize debt tracking matrix
  const debts = {};
  players.forEach(p => {
    debts[p] = {};
    players.forEach(q => {
      if (p !== q) debts[p][q] = 0;
    });
  });

  // Step 2: Populate debts from each round
=======
  // Matrix of who owes whom
  const debt = {};
  players.forEach(p => {
    debt[p] = {};
    players.forEach(q => {
      if (p !== q) debt[p][q] = 0;
    });
  });

  // Populate debts based on round results
>>>>>>> 6e7cddf26c9f788a84c3242b5373d92db1a0ab41
  scores.forEach(round => {
    const winner = round.winner;
    players.forEach(player => {
      if (player !== winner) {
<<<<<<< HEAD
        debts[player][winner] += round[player];
=======
        const amount = round[player];
        debt[player][winner] += amount;
>>>>>>> 6e7cddf26c9f788a84c3242b5373d92db1a0ab41
      }
    });
  });

<<<<<<< HEAD
  // Step 3: Show who owes whom (no netting)
  players.forEach(from => {
    players.forEach(to => {
      if (from !== to && debts[from][to] > 0) {
        resultList.innerHTML += `<li>${from} owes ${to} ₹${debts[from][to]}</li>`;
=======
  // Build result message
  const resultList = document.getElementById("result-list");
  resultList.innerHTML = "";

  players.forEach(from => {
    players.forEach(to => {
      if (from !== to && debt[from][to] > 0) {
        resultList.innerHTML += `<li>${from} owes ${to} ₹${debt[from][to]}</li>`;
>>>>>>> 6e7cddf26c9f788a84c3242b5373d92db1a0ab41
      }
    });
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
