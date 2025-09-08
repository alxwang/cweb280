// circle.js
const { PI } = Math;

// Calculate area of a circle
exports.area = (r) => PI * r ** 2;

// Calculate circumference of a circle
exports.circumference = (r) => 2 * PI * r;

// PI is private here, not exported
