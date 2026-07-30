const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = "";

function isOperator(char){
    return ["+","-","*","/","%"].includes(char);
}

function updateDisplay(){
    display.value = expression || "0";
}

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        const value = button.dataset.value;

        if(value==="C"){
            expression="";
            updateDisplay();
            return;
        }

        if(value==="DEL"){
            expression=expression.slice(0,-1);
            updateDisplay();
            return;
        }

        if(value==="="){
            calculateResult();
            return;
        }

        addValue(value);

    });

});

function addValue(value){

    if(expression==="Error"){
        expression="";
    }

    if(isOperator(value)){

        if(expression===""){
            return;
        }

        let lastChar=expression.slice(-1);

        if(isOperator(lastChar)){
            expression=expression.slice(0,-1)+value;
        }
        else{
            expression+=value;
        }

        updateDisplay();
        return;
    }

    if(value==="."){

        let parts=expression.split(/[\+\-\*\/%]/);

        let lastNumber=parts[parts.length-1];

        if(lastNumber.includes(".")){
            return;
        }

    }

    expression+=value;
    updateDisplay();

}

function calculateResult(){

    if(expression===""){
        return;
    }

    let lastChar=expression.slice(-1);

    if(isOperator(lastChar)){
        return;
    }

    try{

        let result=Function('"use strict";return ('+expression+')')();

        if(result===Infinity || result===-Infinity){
            expression="Error";
        }
        else if(Number.isNaN(result)){
            expression="Error";
        }
        else{
            expression=result.toString();
        }

    }
    catch{
        expression="Error";
    }

    updateDisplay();

}
document.addEventListener("keydown",(event)=>{

    const key=event.key;

    if(key>="0" && key<="9"){
        addValue(key);
        return;
    }

    if(key==="."){
        addValue(".");
        return;
    }

    if(key==="+" || key==="-" || key==="*" || key==="/" || key==="%"){
        addValue(key);
        return;
    }

    if(key==="Enter"){
        event.preventDefault();
        calculateResult();
        return;
    }

    if(key==="Backspace"){
        expression=expression.slice(0,-1);
        updateDisplay();
        return;
    }

    if(key==="Escape"){
        expression="";
        updateDisplay();
        return;
    }

});

buttons.forEach(button=>{

    button.addEventListener("mousedown",()=>{

        button.style.transform="scale(0.95)";

    });

    button.addEventListener("mouseup",()=>{

        button.style.transform="scale(1)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="scale(1)";

    });

});

updateDisplay();
