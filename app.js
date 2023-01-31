let targetLoad = document.querySelector('#target-load');
targetLoad.addEventListener('input', function (event) {
  const inputValue = event.target.value;
  targetLoad = inputValue;
  calcPlates();
});

function calcPlates() {
  weight45Counter = Math.floor((targetLoad - 45) / 45 / 2);
  weight35Counter = Math.floor((targetLoad - 45 - weight45Counter * 45 * 2) / 35 / 2);
  weight25Counter = Math.floor((targetLoad - 45 - weight45Counter * 45 * 2 - weight35Counter * 35 * 2) / 25 / 2);
  weight10Counter = Math.floor((targetLoad - 45 - weight45Counter * 45 * 2 - weight35Counter * 35 * 2 - weight25Counter * 25 * 2) / 10 / 2);
  weight5Counter = Math.floor((targetLoad - 45 - weight45Counter * 45 * 2 - weight35Counter * 35 * 2 - weight25Counter * 25 * 2 - weight10Counter * 10 * 2) / 5 / 2);
  weight2_5Counter = Math.floor((targetLoad - 45 - weight45Counter * 45 * 2 - weight35Counter * 35 * 2 - weight25Counter * 25 * 2 - weight10Counter * 10 * 2 - weight5Counter * 5 * 2) / 2.5 / 2);
  document.querySelector(".weight-45 .counter input").value = weight45Counter;
  document.querySelector(".weight-35 .counter input").value = weight35Counter;
  document.querySelector(".weight-25 .counter input").value = weight25Counter;
  document.querySelector(".weight-10 .counter input").value = weight10Counter;
  document.querySelector(".weight-5 .counter input").value = weight5Counter;
  document.querySelector(".weight-2-5 .counter input").value = weight2_5Counter;
  render();
}

let decrementButtons = document.querySelectorAll(".decrement");
decrementButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    decrementValue(this.nextElementSibling);
  });
});

let incrementButtons = document.querySelectorAll(".increment");
incrementButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    incrementValue(this.previousElementSibling);
  });
});

function incrementValue(element) {
  element.value = parseInt(element.value, 10) + 1;
  weight45Counter = document.querySelector(".weight-45 .counter input").value;
  weight35Counter = document.querySelector(".weight-35 .counter input").value;
  weight25Counter = document.querySelector(".weight-25 .counter input").value;
  weight10Counter = document.querySelector(".weight-10 .counter input").value;
  weight5Counter = document.querySelector(".weight-5 .counter input").value;
  weight2_5Counter = document.querySelector(".weight-2-5 .counter input").value;

  render();
}

function decrementValue(element) {
  if (element.value > 0) {
    element.value = parseInt(element.value, 10) - 1;
    weight45Counter = document.querySelector(".weight-45 .counter input").value;
    weight35Counter = document.querySelector(".weight-35 .counter input").value;
    weight25Counter = document.querySelector(".weight-25 .counter input").value;
    weight10Counter = document.querySelector(".weight-10 .counter input").value;
    weight5Counter = document.querySelector(".weight-5 .counter input").value;
    weight2_5Counter = document.querySelector(".weight-2-5 .counter input").value;
    render();
  }
}

// Get the canvas element
const canvas = document.getElementById("barbell");
const ctx = canvas.getContext("2d");

// Get the counter values for each row
let weight45Counter = 0;
let weight35Counter = 0;
let weight25Counter = 0;
let weight10Counter = 0;
let weight5Counter = 0;
let weight2_5Counter = 0;

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

// Render Barbell & Plates
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    ctx.fillRect(barbellWidth / 2 + (weight45Counter * plateMargin) + (weight35Counter * plateMargin) + (weight25Counter * plateMargin) + (weight10Counter * plateMargin) + (weight5Counter * plateMargin) + (i * plateMargin / 1.5) + (barbellMargin - plateWidth) - plateWidth2_5 * .25, (canvas.height - plateHeight2_5) / 2, plateWidth2_5, plateHeight2_5);
  }
}

render();