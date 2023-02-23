//Declare init variables

var buttonColors =["green", "red", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var userClick = false;

//hide help buttons
$("#grey").hide();
$("#grey2").hide();



//Press Any Key to start or click anywhere to start
$(document).on("keydown", ()=>{
    if ($("h1").html().indexOf("Level") === -1){
        initGame();
    }
});

//Initiate game
function initGame(){
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
    $("#level-title").text("Level 0");
    $("#final-level").text("");
}

//Next sequence 
function nextSequence(){
    $("#level-title").text("Level " + (gamePattern.length).toString());
    var randomNumber = getRandomInt(buttonColors.length);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playFullPattern();
    userClickedPattern = [];
}

//PlayBack full game Pattern and wait until cycle finished
function playFullPattern(){
    for (var i = 0; i < gamePattern.length; i++){
        playDelayedButton(i); 
    }
    setTimeout(function(){
        userClick = true;
    },500*gamePattern.length + 200);
}

//Add delay to play full game pattern
function playDelayedButton(i){
    setTimeout(function(){
        animateSequence(gamePattern[i]);
        playSound(gamePattern[i]); 
    },500*i);
}

//function play Sound
function playSound(name){
    var randomSound = new Audio(url = "sounds/" + name + ".mp3");
    randomSound.play();
}

//function user registered pattern
function userRegisterColor(color){
    userClickedPattern.push(color);
}

//Generate random integer - on max
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Function animate press - animate button pressed by user
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

//Animate game over 
function animateGameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 1000);
}

function animateSequence(currentColor){
    $("#" + currentColor).fadeOut(100).fadeIn(100);
}


//Button handler
$(".btn").on("click", (e) => {
    if (userClick === true) { 
        userRegisterColor(e.target.id);
        playSound(e.target.id);
        animatePress(e.target.id);
        if (gamePattern[userClickedPattern.length - 1] != userClickedPattern[userClickedPattern.length - 1]) {
            userClick = false;
            $("#level-title").text("Game Over, press any key to restart");
            $("#final-level").text("Level reached : " + (gamePattern.length - 1).toString());
            animateGameOver();
        }
    }
    if ((gamePattern.length == userClickedPattern.length) &&
        (gamePattern[gamePattern.length - 1] == userClickedPattern[userClickedPattern.length - 1]) &&
        (userClick === true)) {       
        userClick = false;
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
    

});


//Support buttons - to debug
$("#grey").on("click", () => {
    nextSequence();
});

$("#grey2").on("click", () => {
    console.log(gamePattern);
    //console.log(userClickedPattern);
});