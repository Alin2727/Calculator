let numbers = document.querySelectorAll(".number");
let operation = document.querySelectorAll(".operation");
let deleteButton = document.querySelector(".delete");
let clear = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let decimal = document.querySelector(".decimal");


let previousScreen = document.querySelector(".previous");
let currentScreen = document.querySelector(".current");

let operator = '';
let previousValue = '';
let currentValue = '';


numbers.forEach((number) => number.addEventListener("click", function(e) {
  
    showNumber(e.target.textContent)
    currentScreen.textContent = decimalFormat(currentValue);

}))




function decimalFormat(text){

    let contor = 0;
    let finalText = '';

    let textWithDecimal = '';

    if(text.includes('.')){
        textWithDecimal = text.slice(text.indexOf('.') );
        text = text.substring(0, text.indexOf('.'));
    }
    
    for(let i = text.length - 1; i >= 0; i--){
        let digit = text[i];
        finalText += digit;
        contor ++;
        if(contor == 3){
            if(i == 0){
                break;
            }
            finalText += ',';
            contor = 0;
        }
    }

    

    return finalText.split('').reverse().join('') + textWithDecimal;
 
 
 }


operation.forEach((op) => op.addEventListener("click", function(e) {

    showOperation(e.target.textContent)
    previousScreen.textContent = previousValue + " " + operator;
    currentScreen.textContent = currentValue;

}))

equal.addEventListener("click", function(){
if(currentValue != '' && previousValue != ''){

    calculate()
    previousScreen.textContent = '';
    currentScreen.textContent = previousValue;

}})

decimal.addEventListener("click", function(){

    addDecimal()

})

deleteButton.addEventListener("click", function(){

    deleteNumber()

})


// All clear function
clear.addEventListener("click", function(){

    previousValue = '';
    currentValue = '';
    operator = '';
    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
})



// Showing number and operator


function showNumber(num){

    currentValue += num;
}

function showOperation(op){
    operator = op;
    previousValue = currentValue;
    currentValue = "";
}


function calculate(){

    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+"){
         previousValue += currentValue;

    } else if (operator === "-"){
        previousValue -= currentValue;

    }else if (operator === "x"){
        previousValue *= currentValue;

    }else {(operator === "÷")
        previousValue /= currentValue; 

    }    

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();  
    currentValue = previousValue.toString();    
  
}

function roundNumber(num){
return Math.round(num * 1000) / 1000;

}

function addDecimal(){

        if(!currentValue.includes(".")){
            currentValue += ".";
        }

}



function deleteNumber(){


    if( currentScreen.textContent != ''){
        currentScreen.textContent = currentValue.slice(0, -1);
        currentValue = currentScreen.textContent;
    }

}

