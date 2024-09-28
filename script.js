//Create operator functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

//Create variables
let first = "";
let operator = "";
let second = "";
let wholeOperation =""

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
            if(number2 == 0){
                return "What you up to?Dividing by 0?"
                wholeOperation = "0"
            }
            else{
                return divide(number1,number2);
            }
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

const runOperation = (wholeOperation) => {
    if (wholeOperation.includes("?")){
        wholeOperation = wholeOperation.split("?");
        first = Number(wholeOperation[0]);
        operator = wholeOperation[1];
        second = Number(wholeOperation[2]);
        return operate(operator, first,second);
    }else{
        return wholeOperation;
    }
   
}


//get Dom elements
const numbersDiv = document.getElementById("numbers");
const numberBtn = document.createElement("button");
const operationScreen = document.getElementById("operation");
const answerScreen = document.getElementById("answer");


for(let i = 9; i >= 0; i--){
    numberBtn.textContent = i;
    numberBtn.setAttribute("class", `number`);
    numbersDiv.appendChild(numberBtn.cloneNode(true));
    if(i === 0){
        numbersDiv.innerHTML += `<button id="decimal" class="number">.</button>`
    }
}

//get buttons
const operands = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

//operands
operands.forEach(btn => {
    btn.addEventListener("click", ()=>{
        //Validate Decimal
        if(btn.textContent === "." && wholeOperation.includes(".")){
            //Check if we are working with second number
            if(wholeOperation.includes("?")){
                //Counter to count the number decimals
                let count = 0
                for(char in wholeOperation){
                    if(wholeOperation[char] === "."){
                        count++;
                    }
                }
                if(count == 2){
                    // number of decimals == 2 do nothing
                }else{
                    //add Decimal
                    updateOperationScreen(btn.textContent);  
                }         
            }
        }else{
            updateOperationScreen(btn.textContent);
        }
    });
});

operators.forEach(btn => {
    btn.addEventListener("click", (e)=>{
        const result = runOperation(wholeOperation);
        const target = e.target
        if(target.id === "clear"){
            //Clear Screen
            updateOperationScreen("");
            updateAnswerScreen("");
        }else if(target.id === "equal"){
            //Run operation
            

            //Update screens
            updateOperationScreen("");
            updateAnswerScreen(result);

        }else{
            const opArray = wholeOperation.split("?")
            console.log(opArray)
            //If two numbers are already operating
            if(opArray.includes("+") || opArray.includes("-") || opArray.includes("*") || opArray.includes("/")){
                wholeOperation = String(result);
                operationScreen.textContent = String(result)
                wholeOperation += "?"
                operationScreen.textContent += btn.textContent;
                wholeOperation += btn.textContent;
                wholeOperation += "?"
            }else{
                 //Add deliminator
                wholeOperation += "?"
                operationScreen.textContent += btn.textContent;
                wholeOperation += btn.textContent;
                wholeOperation += "?"
            }       
        }
           
    });
});



