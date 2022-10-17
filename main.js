let character = document.getElementById("character");
let game = document.getElementById("game");
let interval;
let both = 0;
let counter = 0;
let currentBlocks = []; 

// console.log(window.getComputedStyle(character));
// console.log(window.getComputedStyle(character).getPropertyValue("left"));


//providing left & right arrowkey functionality
function moveLeft() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left")); //getting position of character
    if(left>0){
        character.style.left = left - 2 + "px"; //move left
    }
}
function moveRight(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380) {
        character.style.left = left + 2 + "px"; //move right
    }
}
document.addEventListener("keydown", event =>{
    if(both==0)  {                            // to make only one interval run by using arrowkey
        both++;
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key==="ArrowRight") {
            interval = setInterval(moveRight, 1);
        }
    }
}
);
// to make only one interval run by using arrowkey
document.addEventListener("keyup", event =>{
    clearInterval(interval);
    both=0;
});


var blocks = setInterval(function(){  //to generate blocks and holes 
    // move the block on game container
    var blockLast = document.getElementById("block"+(counter-1));   // getting previous appended block using counter
    var holeLast = document.getElementById("hole"+(counter-1));    //  getting previous appended hole using counter
    if(counter>0) { 
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top")); // getting previous appended block top position
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top")); //getting previous appended hole top position
    }
    if(blockLastTop<400||counter==0){   // creating a block and holes only if the top postion < 400
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter); // giving unique id to each block
        hole.setAttribute("id", "hole"+counter);   // giving unique id to each hole 
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360); // making hole postion random 400-40=360px
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter ++;                               // for giving unique id

    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));         // getting character top position         
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));       // getting character left position    
    var drop = 0;
    if(characterTop <= 0) {
        alert("Game over. Score: "+(counter-9));
        clearInterval(blocks);
        location.reload()
    }
    for(var i = 0; i <currentBlocks.length;i++) {
        let current = currentBlocks[i];
        let iblock = document.getElementById("block" +current); // getting current block 
        let ihole = document.getElementById("hole"+current);    // getting current hole
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));  //getting current block top position
        let iholeleft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));  //getting current hole top position
        iblock.style.top = iblockTop - 0.5 + "px";  //making it move up 
        ihole.style.top = iblockTop - 0.5 + "px";
        if(iblockTop < -20) {      //removing blocks and holes if they are top of game 
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }

     if(iblockTop-20<characterTop && iblockTop>characterTop) {
         drop++;
         if(iholeleft<=characterLeft && iholeleft+20>=characterLeft){
             drop = 0;
         }
     }
    }
    if(drop ==0) {
        if(characterTop < 400) {
            character.style.top = characterTop + 2 + "px";
        }
    }
    else {
        character.style.top = characterTop - 0.5 + "px";
    }
}, 1);


// Add onclick listener to toggle music button

let music = new Audio("music.mp3")

document.querySelector("#music").addEventListener('click', ()=>{
    if(music.paused) {
        music.play() 
        document.querySelector("#music").innerText="Music OFF"
    }
    else  {
        music.pause();
        document.querySelector("#music").innerText="Music ON"
    }
})