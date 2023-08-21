// sample coordinates data
const coordinates = [
  { x: 14, y: 55 },
  { x: 15, y: 57 },
  { x: 16, y: 58 },
  { x: 17, y: 56 },
  { x: 18, y: 60 },
];

// Function to perform linear regression
function calculateLinearRegression(coordinates) {
  const numberOfCoordinates = coordinates.length;
  let coordinateSummation_x = 0;
  let coordinateSummation_y = 0;
  let coordinateSummation_xy = 0;
  let coordinateSummation_x2 = 0;

  // Calculate sums needed for linear regression
  for (const coordinate of coordinates) {
    coordinateSummation_x += coordinate.x;
    coordinateSummation_y += coordinate.y;
    coordinateSummation_xy += coordinate.x * coordinate.y;
    coordinateSummation_x2 += coordinate.x * coordinate.x;
  }

  // Calculate mean for X
  let meanX = coordinateSummation_x / numberOfCoordinates;

  // Calculate mean for Y
  let meanY = coordinateSummation_y / numberOfCoordinates;

  // Calculate Sum of Squares (SSX)
  const ssx = coordinates.reduce(
    (sum, coordinate) => sum + Math.pow(coordinate.x - meanX, 2),
    0
  );

  // Calculate Sum of Products (SP)
  const sp = coordinates.reduce(
    (sum, coordinate) => sum + (coordinate.x - meanX) * (coordinate.y - meanY),
    0
  );

  // Calculating gradient by dividing the sum of products with sum of squares
  b = sp / ssx;

  // Calculating y-intercept by subtracting (b * meanX) from meanY
  a = meanY - b * meanX;

  // rounding slope and y_intercept to 3 decimal places to avoid unnecessarily long decimal places in answers.
  const roundedString_a = a.toFixed(3);
  const roundedString_b = b.toFixed(3);

  // A string named summary having a tabular output of the summary
  let summary = `
      ************* SUMMARY *************\n
      |     Output     |      Value\t|
      |----------------|------------------|
      | Sum of x       |   ${coordinateSummation_x}\t\t|
      | Sum of y       |   ${coordinateSummation_y}\t\t|
      | Mean of x      |   ${meanX}\t\t|
      | Mean of y      |   ${meanY}\t\t|
      | SSX            |   ${ssx}\t\t|
      | SP             |   ${sp}\t\t|
      `;

  // final output of the linear regression equation
  let linearRegressionOutput = `\nEQUATION:  y = ${roundedString_b}x + ${roundedString_a}`;

  return { summary, linearRegressionOutput };
}
// calling function and expecting object containing the summary and linearRegressionOutput
const { summary, linearRegressionOutput } =
  calculateLinearRegression(coordinates);

// Displaying output
console.log(summary, linearRegressionOutput);
