//Create operator functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

//Create final operate function
const operate =  (operation, number1, number2) => {
    switch(operation){
        case '+':{
            return add(number1,number2);
            break;
        }
        case '-':{
            return subtract(number1,number2);
            break;
        }
        case '*':{
            return multiply(number1,number2);
            break;
        }
        case '/':{
            return divide(number1,number2);
            break;
        }
    }
};

const updateOperationScreen = (text) => {
    if(text === ""){
        operationScreen.textContent = text;
        wholeOperation = text;
    }else{
        operationScreen.textContent += text;
        wholeOperation += text;
    }
    
}

const updateAnswerScreen = (text) => {
    answerScreen.textContent = "";
    answerScreen.textContent = text;
}

//Create variables
let first = "";
let operator = "";
let second = "";
let wholeOperation =""

//get Dom elements
const numbersDiv = document.getElementById("numbers");
const numberBtn = document.createElement("button");
const operationScreen = document.getElementById("operation");
const answerScreen = document.getElementById("answer");


for(let i = 9; i >= 0; i--){
    numberBtn.textContent = i;
    numberBtn.setAttribute("class", `number`);
    numbersDiv.appendChild(numberBtn.cloneNode(true));
}

//get buttons
const operands = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

//operands
operands.forEach(btn => {
    btn.addEventListener("click", ()=>{
        updateOperationScreen(btn.textContent);
    });
});

operators.forEach(btn => {
    btn.addEventListener("click", (e)=>{
        const target = e.target
        if(target.id === "clear"){
            //Clear Screen
            updateOperationScreen("");
            updateAnswerScreen("");
        }else if(target.id === "equal"){
            //Run operation
            wholeOperation = wholeOperation.split("?");
            first = Number(wholeOperation[0]);
            operator = wholeOperation[1];
            second = Number(wholeOperation[2]);
            const result = operate(operator, first,second);

            //Update screens
            updateOperationScreen("");
            updateAnswerScreen(result);

        }else{
            //Add deliminator
            wholeOperation += "?"
            operationScreen.textContent += btn.textContent;
            wholeOperation += btn.textContent;
            wholeOperation += "?"
        }       
    });
});



