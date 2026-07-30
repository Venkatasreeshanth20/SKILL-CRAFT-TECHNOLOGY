const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");

const resetScoreBtn = document.getElementById("resetScoreBtn");

const playerModeBtn = document.getElementById("playerMode");

const computerModeBtn = document.getElementById("computerMode");

const scoreX = document.getElementById("scoreX");

const scoreO = document.getElementById("scoreO");

const drawScore = document.getElementById("drawScore");

let board = ["","","","","","","","",""];

let currentPlayer = "X";

let running = true;

let vsComputer = false;

let xWins = 0;

let oWins = 0;

let draws = 0;

const winPatterns = [

    [0,1,2],

    [3,4,5],

    [6,7,8],

    [0,3,6],

    [1,4,7],

    [2,5,8],

    [0,4,8],

    [2,4,6]

];

initializeGame();

function initializeGame(){

    cells.forEach(cell=>cell.addEventListener("click",cellClicked));

    restartBtn.addEventListener("click",restartGame);

    resetScoreBtn.addEventListener("click",resetScores);

    playerModeBtn.addEventListener("click",()=>{

        vsComputer=false;

        playerModeBtn.classList.add("active");

        computerModeBtn.classList.remove("active");

        restartGame();

    });

    computerModeBtn.addEventListener("click",()=>{

        vsComputer=true;

        computerModeBtn.classList.add("active");

        playerModeBtn.classList.remove("active");

        restartGame();

    });

    statusText.textContent="Player X's Turn";

}

function cellClicked(){

    const index=this.getAttribute("data-index");

    if(board[index]!=="" || !running){

        return;

    }

    updateCell(this,index);

    checkWinner();

    if(vsComputer && running && currentPlayer==="O"){

        setTimeout(computerMove,400);

    }

}

function updateCell(cell,index){

    board[index]=currentPlayer;

    cell.textContent=currentPlayer;

    cell.classList.add(currentPlayer);

}

function changePlayer(){

    currentPlayer=currentPlayer==="X" ? "O" : "X";

    statusText.textContent="Player "+currentPlayer+"'s Turn";

}
function checkWinner(){

    let roundWon = false;

    for(let i=0;i<winPatterns.length;i++){

        const condition = winPatterns[i];

        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]];

        if(a===""){
            continue;
        }

        if(a===b && b===c){

            roundWon = true;

            condition.forEach(index=>{
                cells[index].classList.add("winner");
            });

            break;
        }

    }

    if(roundWon){

        statusText.textContent = "Player " + currentPlayer + " Wins!";

        running = false;

        if(currentPlayer==="X"){
            xWins++;
            scoreX.textContent = xWins;
        }
        else{
            oWins++;
            scoreO.textContent = oWins;
        }

        return;
    }

    if(!board.includes("")){

        statusText.textContent = "Match Draw!";

        draws++;

        drawScore.textContent = draws;

        running = false;

        return;
    }

    changePlayer();

}

function computerMove(){

    if(!running){
        return;
    }

    let emptyCells=[];

    for(let i=0;i<board.length;i++){

        if(board[i]===""){
            emptyCells.push(i);
        }

    }

    if(emptyCells.length===0){
        return;
    }

    let randomIndex=Math.floor(Math.random()*emptyCells.length);

    let move=emptyCells[randomIndex];

    board[move]="O";

    cells[move].textContent="O";

    cells[move].classList.add("O");

    checkWinner();

}

function restartGame(){

    currentPlayer="X";

    running=true;

    board=["","","","","","","","",""];

    statusText.textContent="Player X's Turn";

    cells.forEach(cell=>{

        cell.textContent="";

        cell.classList.remove("winner");

        cell.classList.remove("X");

        cell.classList.remove("O");

    });

}

function resetScores(){

    xWins=0;

    oWins=0;

    draws=0;

    scoreX.textContent="0";

    scoreO.textContent="0";

    drawScore.textContent="0";

    restartGame();

}