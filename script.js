//Create operator functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

//Create variables
let first = "";
let operator = "";
let second = "";
let wholeOperation ="";
const operations = ["+","-","/","*"];

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
                return "What you up to?Dividing by 0?";
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
    numberBtn.setAttribute("id", `number${i}`);
    numbersDiv.appendChild(numberBtn.cloneNode(true));
    if(i === 0){
        numbersDiv.innerHTML += `<button id="decimal" class="number">.</button>`
    }
}

//get buttons
const operands = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

//operands 
//this is the event listener function for the numbers and the decimal point
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

//This is the event listener for the operator buttons
operators.forEach(btn => {
    btn.addEventListener("click", (e)=>{
        //Run operation
        const result = runOperation(wholeOperation);
        //get target element
        const target = e.target

        if(wholeOperation.length === 0 && (target.id !=="subtract" && target.id !== "clear" ) &&  answerScreen.textContent === ""){
            //Do not put operator at beginning unless it is to negate
        }else if(target.id === "clear"){
            //Clear Screen
            updateOperationScreen("");
            updateAnswerScreen("");
        }else if(target.id === "equal"){
            //Update screens
            updateOperationScreen("");
            updateAnswerScreen(result);

        }else if(target.id === "del"){
            //remove deliminator"?"
            const characters = wholeOperation.split("").filter(elem => elem !== "?");
            //reset whole operation
            wholeOperation = "";
            //Check if operation includes ? deliminator
            if(characters.length > 0){
                characters.splice(-1,1);
            }
            for(let i = 0; i < characters.length;i++){
                if(operations.includes(characters[i+1])){
                    wholeOperation += characters[i];
                    wholeOperation += "?";
                }else if(operations.includes(characters[i])){
                    wholeOperation += characters[i];
                    wholeOperation += "?";
                }else{
                    wholeOperation += characters[i];

                }
            }
            operationScreen.textContent = characters.join("");
        } else{
            const opArray = wholeOperation.split("?")
            console.log(opArray)
            //If two numbers are already operating
            if(opArray.includes("+") || opArray.includes("-") || opArray.includes("*") || opArray.includes("/")){
                //Update answer screen and use Ans on calculation screen
                updateAnswerScreen(result);
                
                wholeOperation = String(result);
                operationScreen.textContent = "Ans"
                wholeOperation += "?"
                operationScreen.textContent += btn.textContent;
                wholeOperation += btn.textContent;
                wholeOperation += "?"
            }else if(wholeOperation.length === 0 && answerScreen.textContent != "" && answerScreen.textContent != "What you up to?Dividing by 0?"){
                //In case where we are adding to our current result
                wholeOperation = answerScreen.textContent;
                operationScreen.textContent = "Ans"
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



