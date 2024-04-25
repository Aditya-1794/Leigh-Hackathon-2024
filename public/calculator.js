var prevScores = [];

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
        totalWeight += weights[factor];
      }
    }
  // Find the factor with the largest absolute negative weighted sum
  let mostNegativeFactor = null;
  let maxNegativeSum = 0;
  for (const factor in negativeWeightedSums) {
    const absoluteSum = Math.abs(negativeWeightedSums[factor]);
    if (absoluteSum > maxNegativeSum) {
      mostNegativeFactor = factor;
      maxNegativeSum = absoluteSum;
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
       feedback += ` Focus on improving ${mostNegativeFactor} to increase your productivity.`;
     } else {
       feedback += ' No specific factor identified as having a negative impact.';
     }
   }

  console.log(productivityScore);
  scoreGlobal = productivityScore;
  console.log(scoreGlobal);  

  let prevScores = JSON.parse(localStorage.getItem("prevScores") || "[]");
  prevScores.push(productivityScore);
  localStorage.setItem("prevScores", JSON.stringify(prevScores));
  
  return { productivityScore, feedback };
}
try {
  const result = calculateProductivityScore(10, 4, 0, 2, 1);
  console.log(`Productivity Score: ${result.productivityScore}`);
  console.log(`Feedback: ${result.feedback}`);
 } catch (error) {
   console.error(error.message);
 }