const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

let first = "";
let operator = "";
let second = "";

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