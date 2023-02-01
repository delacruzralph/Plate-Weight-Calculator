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
    this.calcPlates();
  },
  platesAmt: {
    45: { amt: 0, included: true },
    35: { amt: 0, included: true },
    25: { amt: 0, included: true },
    10: { amt: 0, included: true },
    5: { amt: 0, included: true },
    '2.5': { amt: 0, included: true },
  },
  incrementPlatesAmt: function (weight) {
    if (weight == '2-5') {
      weight = '2.5';
    }
    this.platesAmt[weight]['amt'] += 1;
  },
  decrementPlatesAmt: function (weight) {
    if (weight == '2-5') {
      weight = '2.5';
    }
    if (this.platesAmt[weight]['amt'] > 0) {
      this.platesAmt[weight]['amt'] -= 1;
    }
  },
  updateIncluded: function (weight, include) {
    if (weight == '2-5') {
      weight = '2.5';
    }
    this.platesAmt[weight]['included'] = include;
    this.calcPlates();
    console.log(weight);
    console.log(include);
  },
  calcPlates: function () {
    const weights = [45, 35, 25, 10, 5, 2.5];
    let remainingWeight = this.targetLoad - 45;

    weights.forEach(weight => {
      this.platesAmt[weight]['amt'] = this.platesAmt[weight]['included'] ? Math.floor(remainingWeight / weight / 2) : 0;
      remainingWeight -= this.platesAmt[weight]['amt'] * weight * 2;
    });
  }
}

const view = {
  renderPlatesPerSide: function (platesAmt) {
    document.querySelector(".weight-45 .counter input").value = platesAmt[45]['amt'];
    document.querySelector(".weight-35 .counter input").value = platesAmt[35]['amt'];
    document.querySelector(".weight-25 .counter input").value = platesAmt[25]['amt'];
    document.querySelector(".weight-10 .counter input").value = platesAmt[10]['amt'];
    document.querySelector(".weight-5 .counter input").value = platesAmt[5]['amt'];
    document.querySelector(".weight-2-5 .counter input").value = platesAmt['2.5']['amt'];
  },
  renderTargetWeightLoad: function (platesAmt) {
    document.querySelector('#target-load').value = 45 + 2 * (platesAmt[45]['amt'] * 45 + platesAmt[35]['amt'] * 35 + platesAmt[25]['amt'] * 25 + platesAmt[10]['amt'] * 10 + platesAmt[5]['amt'] * 5 + platesAmt['2.5']['amt'] * 2.5);
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
  },
  updateIncluded: function (updatedWeightIncluded) {
    model.updateIncluded(updatedWeightIncluded.id.slice(8), updatedWeightIncluded.checked);
    view.renderPlatesPerSide(model.platesAmt);
    view.renderTargetWeightLoad(model.platesAmt);
  },
  handleIncludeInput: function (e) {
    this.updateIncluded(e.target);
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

// Include Checkbox
document.querySelectorAll('input[type="checkbox"]').forEach(function (check) {
  check.addEventListener('click', function (e) {
    controller.handleIncludeInput(e);
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