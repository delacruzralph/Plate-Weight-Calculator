# Plate-Weight-Calculator

This code is an implementation of a simple weightlifting calculator. It uses JavaScript to calculate the amount of weight that should be placed on each side of a barbell in order to achieve a target load, and then renders the resulting configuration of plates on the screen.

The code is divided into three sections: the model, the view, and the controller. The model defines the state of the application, including the target load and the amount of weight on each side of the barbell. The view is responsible for rendering the current state of the model on the screen, and the controller handles user input and updates the model accordingly.

The model contains several methods for updating the state of the application. The updateTargetLoad method sets the target load to a new value and recalculates the amount of weight on each side of the barbell. The incrementPlatesAmt and decrementPlatesAmt methods add or remove a given weight from the barbell, and the updateIncluded method updates whether a particular weight should be included in the calculation. Finally, the calcPlates method calculates the amount of weight on each side of the barbell based on the current target load and included weights.

The view contains three methods for rendering the current state of the model on the screen. The renderPlatesPerSide method updates the display of the amount of weight on each side of the barbell. The renderTargetWeightLoad method updates the display of the target load, and the renderBarbell method renders the configuration of plates on the screen.

The controller contains three methods for handling user input. The incrementPlatesPerSide and decrementPlatesPerSide methods are called when the user clicks the "plus" or "minus" button next to a weight, and they update the model accordingly. The handleTargetLoadInput method is called when the user types a new target load into the input field, and it updates the model and view accordingly.

Overall, this code demonstrates a basic implementation of the Model-View-Controller pattern in JavaScript, as well as some common techniques for updating the state of an application in response to user input.



