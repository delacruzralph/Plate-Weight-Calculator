/* TODO:
  - Add included property to each plate (nested object)
  - Include? functionality 
  - Automatically round target weight to nearest 2.5lb
  - Render barbell
*/

// Model
// let targetLoad;
// let plateCounter; 
// updatePlateCounter(id);
// updateTargetLoad(weight);
// updatePlatesPerSide(targetLoad);

// View
// renderTargetLoad();
// renderPlatesPerSide();
// renderBarbell();

// Controller
// incrementPlatesPerSide(weight)
// decrementPlatesPerSide(weight)
// handleTargetLoadInput();

const model = {
  targetLoad: 0,
  updateTargetLoad: function (updatedTargetLoad) {
    this.targetLoad = updatedTargetLoad;
    console.log(this.targetLoad);
    this.calcPlates();
  },
  platesAmt: {
    45: {amt: 0, included: true},
    35: 0,
    25: 0,
    10: 0,
    5: 0,
    '2-5': 0
  },
  incrementPlatesAmt: function (weight) {
    this.platesAmt[weight] += 1;
  },
  decrementPlatesAmt: function (weight) {
    if (this.platesAmt[weight] > 0) {
      this.platesAmt[weight] -= 1;
    }
  },
  calcPlates: function () {
    this.platesAmt[45]['amt'] = Math.floor((this.targetLoad - 45) / 45 / 2);
    this.platesAmt[35] = Math.floor((this.targetLoad - 45 - this.platesAmt[45]['amt'] * 45 * 2) / 35 / 2);
    this.platesAmt[25] = Math.floor((this.targetLoad - 45 - this.platesAmt[45]['amt'] * 45 * 2 - this.platesAmt[35] * 35 * 2) / 25 / 2);
    this.platesAmt[10] = Math.floor((this.targetLoad - 45 - this.platesAmt[45]['amt'] * 45 * 2 - this.platesAmt[35] * 35 * 2 - this.platesAmt[25] * 25 * 2) / 10 / 2);
    this.platesAmt[5] = Math.floor((this.targetLoad - 45 - this.platesAmt[45]['amt'] * 45 * 2 - this.platesAmt[35] * 35 * 2 - this.platesAmt[25] * 25 * 2 - this.platesAmt[10] * 10 * 2) / 5 / 2);
    this.platesAmt['2-5'] = Math.floor((this.targetLoad - 45 - this.platesAmt[45]['amt'] * 45 * 2 - this.platesAmt[35] * 35 * 2 - this.platesAmt[25] * 25 * 2 - this.platesAmt[10] * 10 * 2 - this.platesAmt[5] * 5 * 2) / 2.5 / 2);
    console.log(this.platesAmt);
  }
}

const view = {
  renderPlatesPerSide: function (platesAmt) {
    document.querySelector(".weight-45 .counter input").value = platesAmt[45]['amt'];
    document.querySelector(".weight-35 .counter input").value = platesAmt[35];
    document.querySelector(".weight-25 .counter input").value = platesAmt[25];
    document.querySelector(".weight-10 .counter input").value = platesAmt[10];
    document.querySelector(".weight-5 .counter input").value = platesAmt[5];
    document.querySelector(".weight-2-5 .counter input").value = platesAmt['2-5'];
  },
  renderTargetWeightLoad: function (platesAmt) {
    document.querySelector('#target-load').value = 45 + 2 * (platesAmt[45] * 45 + platesAmt[35] * 35 + platesAmt[25] * 25 + platesAmt[10] * 10 + platesAmt[5] * 5 + platesAmt['2-5'] * 2.5);
  }

}

const controller = {
  updateTargetLoad: function (updatedTargetLoad) {
    model.updateTargetLoad(updatedTargetLoad);
    view.renderPlatesPerSide(model.platesAmt);
  },
  handleTargetLoadInput: function (e) {
    this.updateTargetLoad(e.target.value);
  },
  decrementValue: (e) => {
    model.decrementPlatesAmt(e.target.classList[1].slice(7));
    view.renderPlatesPerSide(model.platesAmt);
    view.renderTargetWeightLoad(model.platesAmt);
  },
  incrementValue: (e) => {
    model.incrementPlatesAmt(e.target.classList[1].slice(7));
    view.renderPlatesPerSide(model.platesAmt);
    view.renderTargetWeightLoad(model.platesAmt);
  }
}

/* =============
   EVENT LISTENERS
   ============= */

// Target Weight Load
document.querySelector('#target-load').addEventListener('input', function (e) {
  controller.handleTargetLoadInput(e);
});

// Decrement Per Side
document.querySelectorAll(".decrement").forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    controller.decrementValue(e);
  });
});

// Increment Per Side
document.querySelectorAll(".increment").forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    controller.incrementValue(e);
  });
});

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