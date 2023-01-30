// Get the canvas element
const canvas = document.getElementById("barbell");
const ctx = canvas.getContext("2d");

// Get the counter values for each row
const weight45Counter = 0;
// document.querySelector(".weight-45 .counter input").value;
const weight35Counter = 0;
// document.querySelector(".weight-35 .counter input").value;
const weight25Counter = 0;
const weight10Counter = 0;
const weight5Counter = 0;
const weight2_5Counter = 0;

// Plate dimensions
const plateMargin = 20;

const plateWidth = 15;
const plateHeight = 75;

const plateWidth35 = 15;
const plateHeight35 = 65;

const plateWidth25 = 15;
const plateHeight25 = 50;

const plateWidth10 = 15;
const plateHeight10 = 40;

const plateWidth5 = 10;
const plateHeight5 = 30;

const plateWidth2_5 = 7.5;
const plateHeight2_5 = 20;

// Barbell dimensions
const barbellWidth = canvas.width;
const barbellHeight = 10;
const barbellMargin = 40;


// Draw the barbell
ctx.fillRect(0, (canvas.height - barbellHeight) / 2, barbellWidth, barbellHeight);

// Draw the 45 lb plates
for (let i = 0; i < weight45Counter; i++) {
  ctx.fillStyle = "black";
  ctx.fillRect(barbellWidth / 2 - (i * plateMargin) - barbellMargin, (canvas.height - plateHeight) / 2, plateWidth, plateHeight);
  ctx.fillRect(barbellWidth / 2 + (i * plateMargin) + (barbellMargin - plateWidth), (canvas.height - plateHeight) / 2, plateWidth, plateHeight);
}

// Draw the 35 lb plates
for (let i = 0; i < weight35Counter; i++) {
  ctx.fillStyle = "black";
  ctx.fillRect(barbellWidth / 2 - (weight45Counter * plateMargin) - (i * plateMargin) - barbellMargin, (canvas.height - plateHeight35) / 2, plateWidth35, plateHeight35);
  ctx.fillRect(barbellWidth / 2 + (weight45Counter * plateMargin) + (i * plateMargin) + (barbellMargin - plateWidth), (canvas.height - plateHeight35) / 2, plateWidth35, plateHeight35);
}

// Draw the 25 lb plates
for (let i = 0; i < weight25Counter; i++) {
  ctx.fillStyle = "black";
  ctx.fillRect(barbellWidth / 2 - (weight45Counter * plateMargin) - (weight35Counter * plateMargin) - (i * plateMargin) - barbellMargin, (canvas.height - plateHeight25) / 2, plateWidth25, plateHeight25);
  ctx.fillRect(barbellWidth / 2 + (weight45Counter * plateMargin) + (weight35Counter * plateMargin) + (i * plateMargin) + (barbellMargin - plateWidth), (canvas.height - plateHeight25) / 2, plateWidth25, plateHeight25);
}

// Draw the 10 lb plates
for (let i = 0; i < weight10Counter; i++) {
  ctx.fillStyle = "black";
  ctx.fillRect(barbellWidth / 2 - (weight45Counter * plateMargin) - (weight35Counter * plateMargin) - (weight25Counter * plateMargin) - (i * plateMargin) - barbellMargin, (canvas.height - plateHeight10) / 2, plateWidth10, plateHeight10);
  ctx.fillRect(barbellWidth / 2 + (weight45Counter * plateMargin) + (weight35Counter * plateMargin) + (weight25Counter * plateMargin) + (i * plateMargin) + (barbellMargin - plateWidth), (canvas.height - plateHeight10) / 2, plateWidth10, plateHeight10);
}

// Draw the 5 lb plates
for (let i = 0; i < weight5Counter; i++) {
  ctx.fillStyle = "black";
  ctx.fillRect(barbellWidth / 2 - (weight45Counter * plateMargin) - (weight35Counter * plateMargin) - (weight25Counter * plateMargin) - (weight10Counter * plateMargin) - (i * plateMargin / 1.5) - barbellMargin + plateWidth5 / 2, (canvas.height - plateHeight5) / 2, plateWidth5, plateHeight5);
  ctx.fillRect(barbellWidth / 2 + (weight45Counter * plateMargin) + (weight35Counter * plateMargin) + (weight25Counter * plateMargin) + (weight10Counter * plateMargin) + (i * plateMargin / 1.5) + (barbellMargin - plateWidth), (canvas.height - plateHeight5) / 2, plateWidth5, plateHeight5);
}

// Draw the 2.5 lb plates
for (let i = 0; i < weight2_5Counter; i++) {
  ctx.fillStyle = "black";
  ctx.fillRect(barbellWidth / 2 - (weight45Counter * plateMargin) - (weight35Counter * plateMargin) - (weight25Counter * plateMargin) - (weight10Counter * plateMargin) - (weight5Counter * plateMargin) - (i * plateMargin / 1.5) - barbellMargin + plateWidth2_5 * 1.25, (canvas.height - plateHeight2_5) / 2, plateWidth2_5, plateHeight2_5);
  ctx.fillRect(barbellWidth / 2 + (weight45Counter * plateMargin) + (weight35Counter * plateMargin) + (weight25Counter * plateMargin) + (weight10Counter * plateMargin)  + (weight5Counter * plateMargin)+ (i * plateMargin / 1.5) + (barbellMargin - plateWidth) - plateWidth2_5 * .25, (canvas.height - plateHeight2_5) / 2, plateWidth2_5, plateHeight2_5);
}
