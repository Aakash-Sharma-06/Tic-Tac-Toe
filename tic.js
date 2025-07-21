let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let game = document.querySelector(".game");
let newBtn= document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let clickSound = new Audio("click-234708.mp3");
let winSound = new Audio("you-win-sequence-1-183948.mp3");
let drawSound = new Audio("swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3");

let turnO = true;

const win_patterns = [[0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
let clickCount=0;
let isWinnerfound=false;

const resetGame=()=>{
    turnO=true;
    enableboxes();
    msgContainer.classList.add("hide");
    clickCount = 0;
    isWinnerfound = false;
};


boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        clickSound.play();
        if(turnO){
            box.innerText='O';
            turnO=false;
        }
        else{
            box.innerText='X';
            turnO=true;
        }
        box.disabled=true;

        checkWinner();
        clickCount++;
        checkDraw();
    });
});

const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};


const showWinner=(winner)=>{
    isWinnerfound=true;
    winSound.play();
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

const checkWinner=()=>{
    for(let pattern of win_patterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val == pos2val && pos2val == pos3val) {
                showWinner(pos1val);
            }    
        }
    }
};

const checkDraw=()=>{
    if (clickCount===9 && isWinnerfound==false) {
        drawSound.play();
        msg.innerText="Its a Draw";
        msgContainer.classList.remove("hide");
    }
};

let isMuted=false;

document.querySelector("#mute").addEventListener("click",()=>{
    isMuted= !isMuted;
    clickSound.muted = isMuted;
    winSound.muted = isMuted;
    drawSound.muted = isMuted;
    const muteBtn=document.querySelector("#mute");
    muteBtn.innerText= isMuted? "🔊 Unmute" : "🔇 Mute";
});

newBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
