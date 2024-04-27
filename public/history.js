document.addEventListener('DOMContentLoaded', async() => {
  const scores = JSON.parse(localStorage.getItem('prevScores'));
  
  //if the array is empty, make a blank chart
  if (scores == null) {
      const xyValues = [
        {x:0, y:0},
      ];
      new Chart("myChart2", {
        type: "scatter",
        data: {
          datasets: [{
            pointRadius: 4,
            pointBackgroundColor: "rgba(0,0,255,1)",
            data: xyValues
          }]
        },
        options: {
          legend: {display: false},
          scales: {
            xAxes: [{ticks: {min: 0, max:20}}],
            yAxes: [{ticks: {min: 0, max:100}}],
          }
        }
      });
  }
  //normal chart generation
  else {
    // Generate xyValues array based on scores array
    const xyValues = scores.map((score, index) => ({
      x: index + 1, // X values increase by 1 for each score
      y: score,     // Y values correspond to the score values
    }));

    new Chart("myChart2", {
      type: "scatter",
      data: {
        datasets: [{
          pointRadius: 4,
          pointBackgroundColor: "rgba(0,0,255,1)",
          data: xyValues
        }]
      },
      options: {
        legend: {display: false},
        scales: {
          xAxes: [{ticks: {min: 0, max:scores.length+3}}],
          yAxes: [{ticks: {min: 0, max:100}}],
        }
      }
    });
  }

  //BOX CHART FOR STAT BREAKDOWN
  const hw = JSON.parse(localStorage.getItem('scoreBreakdown')).homeworkTime;
  const sleep = JSON.parse(localStorage.getItem('scoreBreakdown')).sleepTime;
  const phone = JSON.parse(localStorage.getItem('scoreBreakdown')).screenTime;
  const physical = JSON.parse(localStorage.getItem('scoreBreakdown')).physicalActivityTime;
  const relax = JSON.parse(localStorage.getItem('scoreBreakdown')).relaxingTime;

  const xValues = ["Homework", "Sleep", "Phone time", "Activity", "Relaxing"];
  const yValues = [hw, sleep, phone, physical, relax];

  const barColors = ["blue", "blue","blue","blue","blue"];

  new Chart("myChart3", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: ""
      },
      scales: {
        xAxes: [{ticks: {min: 0, max:scores.length+3}}],
        yAxes: [{ticks: {min: 0, max:12}}],
      }
    }
  });

  //getting AI feedback
  sendFeedbackData(sleep, hw, phone, physical, relax)
  .then(feedbackAI => {
    console.log('final feedback: ' + feedbackAI);
    document.getElementById('feedback').innerHTML = feedbackAI;
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
});

async function sendFeedbackData(s, h, p, ph, r) {
  const feedbackTextarea = document.getElementById('feedbackTextarea');
  const delay = 50; // Milliseconds between each character

  const url = '/api/getFeedback';
  const data = { s, h, p, ph, r };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Error fetching feedback');
    }

    const responseData = await response.json();
    const feedbackResult = responseData.feedbackResult;

    // Clear previous feedback
    feedbackTextarea.value = '';

    // Simulate typing effect
    for (let i = 0; i < feedbackResult.length; i++) {
      feedbackTextarea.value += feedbackResult[i];
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Return the feedback result
    return feedbackResult;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Throw the error to be caught by the caller
  }
}
