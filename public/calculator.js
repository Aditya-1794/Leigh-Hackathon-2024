function calculateProductivityScore(sleepHours, homeworkHours, phoneScreenTime, physicalActivityTime, relaxingTime) {
  //put the parameters in this array
  var factors = {homeworkTime: homeworkHours, screenTime: phoneScreenTime, sleepTime: sleepHours, physicalActivityTime: physicalActivityTime, relaxingTime: relaxingTime};
  // Define weights for each factor
    const weights = {
      homeworkTime: 0.3,
      screenTime: -0.3,
      sleepTime: 0.25,
      physicalActivityTime: 0.1,
      relaxingTime: -0.05,
    };

  var weightedSums = 0;
  var totalWeight=0;
  const negativeWeightedSums = {};
   for (const factor in factors) {
      if (factors.hasOwnProperty(factor) && weights.hasOwnProperty(factor)) {
        const value = factors[factor];
        // // Validate value
        // if (typeof value !== 'number' || isNaN(value) || value < 0) {
        //   throw new Error(`Invalid value for ${factor}.`);
        // }
        // Calculate weighted sum
        
        negativeWeightedSums[factor] = value * weights[factor];
        weightedSums += value * weights[factor]*0.075;
        totalWeight += weights[factor] // Use absolute value for totalWeight
        
      }
    }
  // Find the factor with the largest absolute negative weighted sum

  let mostNegativeFactor = null;
  let maxNegativeSum = 0;
  for (const factor in negativeWeightedSums) {
    if (negativeWeightedSums[factor] < maxNegativeSum) {
      mostNegativeFactor = factor;
      maxNegativeSum = negativeWeightedSums[factor];
    }
  }
  
   // Calculate productivity score (scaled to 100)
    const productivityScore = Math.round((weightedSums / totalWeight) * 100);

   // Provide detailed feedback based on score and most negative factor
  let feedback;
  if (productivityScore >= 80) {
    feedback = 'Excellent productivity!';
  } else if (productivityScore >= 60) {
    feedback = 'Good productivity.';
  } else {
    feedback = 'Below average productivity. Consider areas of improvement.';
    if (mostNegativeFactor) {
      feedback += ` Focus on improving ${mostNegativeFactor.replace(/([A-Z])/g, ' $1').trim()} to increase your productivity.`;
      switch (mostNegativeFactor) {
        case 'homeworkTime':
          feedback += ' Try allocating more time for homework.';
          break;
        case 'screenTime':
          feedback += ' Reduce screen time to enhance focus.';
          break;
        case 'sleepTime':
          feedback += ' Ensure you get sufficient sleep for better productivity.';
          break;
        case 'physicalActivityTime':
          feedback += ' Increase physical activity for improved energy levels.';
          break;
        case 'relaxingTime':
          feedback += ' Balance relaxation time to avoid burnout.';
          break;
        default:
          break;
      }
    } else {
      feedback += ' No specific factor identified as having a negative impact.';
    }
  }

 const scoreBreakdown = {};
  for (const factor in factors) {
    scoreBreakdown[factor] = factors[factor];
  }
 // Store score breakdown in localStorage
  localStorage.setItem('scoreBreakdown', JSON.stringify(scoreBreakdown));

  if(localStorage.getItem('prevScores') == null) {
      var prevScores = [];
      prevScores.push(productivityScore);
      localStorage.setItem('prevScores', JSON.stringify(prevScores));
    }
    else {
      var prevScores = JSON.parse(localStorage.getItem('prevScores'));
      prevScores.push(productivityScore);
      localStorage.setItem('prevScores', JSON.stringify(prevScores));
    }

  //how to access an item from the localStorage
  //JSON.parse(localStorage.getItem('scoreBreakdown')).factorName

  console.log(productivityScore);
  scoreGlobal = productivityScore;
  console.log(scoreGlobal);  
  
  return { productivityScore, feedback };
}
// try {
//   const result = calculateProductivityScore(10, 4, 0, 2, 1);
//   console.log(`Productivity Score: ${result.productivityScore}`);
//   console.log(`Feedback: ${result.feedback}`);
//  } catch (error) {
//    console.error(error.message);
//  }

function clearLocalStorage() {
  localStorage.removeItem('prevScores');
  console.log('Local storage cleared.');
  location.reload();
}