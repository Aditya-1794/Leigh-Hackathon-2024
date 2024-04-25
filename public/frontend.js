async function fetchLeaderboard() {
  try {
    const response = await fetch('/leaderboard');
    const leaderboard = await response.json();
    displayLeaderboard(leaderboard);
  } catch (err) {
    console.error(err);
  }
}
function displayLeaderboard(leaderboard) {
  const leaderboardContainer = document.getElementById('leaderboard');

  // Clear previous leaderboard data
  leaderboardContainer.innerHTML = '';

  // Create a table to display leaderboard
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Rank</th>
        <th>Username</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      ${leaderboard.map((entry, index) => `
        <tr onmouseover="this.style.backgroundColor='#f2f2f2'" onmouseout="this.style.backgroundColor=''" style="border-bottom: 1px solid black; box-shadow: 0 0 3px rgba(0, 0, 0, 0.35); margin: 5px; padding: 5px; border-radius: 5px; width: 120%; overflow: scroll;">
          <td>${index + 1}</td>
          <td>${entry.username}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
          <td>${entry.score}</td>
<td>
  <button style="background-color: white; border: none;" onClick="this.style.color='black'; this.innerHTML=(this.innerHTML == '★') ? '☆' : '★'">
    ☆
  </button>
</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  leaderboardContainer.appendChild(table);
}
// Function to display other HTML content
function displayHTMLContent() {
  // Show the HTML content by setting its style.display property to "block"
  document.getElementById('popup').style.display = 'block';
}

// Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const username = prompt('Enter your name:');
  const score = scoreGlobal;
  console.log(score);

  try {
    const response = await fetch('/add-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, score }),
    });

    if (response.ok) {
      // If the score is added successfully, fetch and display the updated leaderboard
      fetchLeaderboard();
    } else {
      console.error('Failed to add score:', response.statusText);
    }
  } catch (err) {
    console.error('Error adding score:', err);
  }
}

// Add event listener to the form for form submission
//const form = document.getElementById('scoreForm');
//form.addEventListener('submit', handleSubmit);
// Call fetchLeaderboard and displayHTMLContent when the page loads
window.onload = () => {
  fetchLeaderboard();
  displayHTMLContent(); // Uncomment this line if you don't want to wait for leaderboard data
};

// Add event listener to the form for form submission

