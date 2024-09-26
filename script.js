//Create operator functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

//get Dom elements
const numbers = document.getElementById("numbers");
const numberBtn = document.createElement("button");


for(let i = 9; i >= 0; i--){
    numberBtn.textContent = i;
    numbers.appendChild(numberBtn.cloneNode(true));
}

//Create variables
let first = "";
let operator = "";
let second = "";

//Create final operate function
const operate =  (operation, number1, number2) => {
    switch(operation){
        case '+':{
            add(number1,number2);
            break;
        }
        case '-':{
            subtract(number1,number2);
            break;
        }
        case '*':{
            multiply(number1,number2);
            break;
        }
        case '/':{
            divide(number1,number2);
            break;
        }
    }
};