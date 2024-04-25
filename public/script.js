isShowing = false;

window.onload = function() {
  togglePopup();
  
};

function togglePopup() {
  if(isShowing) {
    popup.style.visibility='hidden'
    popup.style.opacity = 0;
    isShowing = false;
  }
  else {
    popup.style.visibility='visible'
    popup.style.opacity = 1;
    isShowing = true;
  }
}


function transition() {
  //calculate the score
  var sleepHours = document.getElementById('sleepHours').value;
  var homeworkHours = document.getElementById('homeworkHours').value;
  var phoneScreenTime = document.getElementById('phoneScreenTime').value;
  var physicalActivityTime = document.getElementById('physicalActivityTime').value;
  var relaxingTime = document.getElementById('relaxingTime').value;

  const getScore = calculateProductivityScore(sleepHours, homeworkHours, phoneScreenTime, physicalActivityTime, relaxingTime)

  const score = getScore.productivityScore;

  //create the chart
  const xValues = ['Score: ' + score];
  const yValues = [score, 100-score];
  const barColors = [
    "#b91d47"
  ];

  new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: ""
      }
    }
  });

  //other stats
  document.getElementById('stat1').innerHTML = getScore.feedback;
  shareButton = document.getElementById('shareButton');
  shareButton.addEventListener('click', function() {
    //copy score to clipboard
    navigator.clipboard.writeText('My productivity score today is ' + score + '. Can you beat that?');

    // Alert the copied text
    shareButton.innerText = "Copied!";
  });

  //transition
  frame1.style.display='none'
  frame1.style.opacity = 0

  frame2.style.visibility='visible'
  frame2.style.opacity = 1

  //import data into database
  //send data to server
}

// async function submitScore(event) {
//   event.preventDefault();
//   const username = prompt('Enter your name:');
//   // const getScoreFromGlobal = scoreGlobal;
//   console.log(getScoreFromGlobal);

//   try {
//     const response = await fetch('/add-score', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, getScoreFromGlobal }),
//     });
//     const data = await response.json();
//     alert(data.message);
//   } catch (err) {
//     console.error(err);
//     alert('Error submitting score');
//   }
// }

async function fetchLeaderboard() {
  try {
    const response = await fetch('/leaderboard');
    const leaderboard = await response.json();
    console.log(leaderboard);
    // Display leaderboard data as needed
  } catch (err) {
    console.error(err);
  }
}

fetchLeaderboard();
