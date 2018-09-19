var wins = 0;
var losses = 0;
var index = 0;
////var questionTime = 15;
var resultsTime = 5;
var clearThese = ["#time","#question", "#feedback", "#answers", "#gif"];
var isCorrect = false;
var isWrong = false;
var isTimeout = false;
var hasUserAnswered = false;
var isGameFinished = false;


var stages = [{
        place : 1,
        question : "What is the only mammal that is capable of true flight?",
        answers : ["The flying squirrel","The eagle","The bat","The marsupial"],
        correctAnswer : "The bat",
        gif: "assets/images/batf.gif"
    },
    {
        place: 2,
        question: "What is the most common bird in the world?",
        answers : ["The Robin","The Duck","The Hawk","The chicken"],
        correctAnswer : "The chicken",
        gif: "assets/images/chicken.gif"

    },
    {
        place: 3,
        question: "Which of the following can catch a cold and other human-borne illnesess?",
        answers : ["Gorrilla","Chimpanzee","Dog","Seahorse"],
        correctAnswer : "Gorrilla",
        gif: "assets/images/gorilla.gif"

    },
    {
        place: 4,
        question: "What is the fasted land mammal on Earth?",
        answers : ["Ostritch","Jaguar","Dolphin","Cheetah"],
        correctAnswer : "Cheetah",
        gif: "assets/images/cheester.gif"

    },
    {
        place: 5,
        question: "What is the second fasted land mammal on Earth?",
        answers : ["Springbok","Sonic the Hedgehog","Spring Elk","Pronghorn Antelope"],
        correctAnswer : "Pronghorn Antelope",
        gif: "assets/images/fast.gif"

    },
    {
        place: 6,
        question: "What animal is able to regenarate its limbs? ",
        answers : ["Jellyfish","Slug","Starfish","tadpols"],
        correctAnswer : "Starfish",
        gif: "assets/images/starfish.gif"

    },
    {
        place: 7,
        question: "Which of the following do not lay eggs?",
        answers : ["Penguin","Platypus","Komoto Dragon","Bats"],
        correctAnswer : "Bats",
        gif: "assets/images/bat.gif"

    },
    {
        place: 8,
        question: "What kind of animal is a Basenji?",
        answers : ["Cat","Dog","Raccoon","Amphebian"],
        correctAnswer : "Dog",
        gif: "assets/images/basenji.gif"

    },
    {
        place: 9,
        question: "Well done, you completed this Trivia sesh",
        feedback : `You've gotten ${wins} out of  the ${wins + losses} questions correct`,
        correctAnswer : "Wanna try again? Press the Space bar now!",
        gif: "assets/images/finish.gif"

    },

]
var source = stages[index];
var game = {
    stage: 0,
    init : function () {
        $("#title").text("Animal Trivial Game")
        var startBtn = $("<button>", {
            id: "start-button",
            text: "Start"
        });
        $("#feedback").append(startBtn);
       
    },
    nextQuestion : function(){

        if((index) >= 7){
            
            
            
            $("#question").text(`${stages[8].question}`);
            $("#feedback").html(`${stages[8].feedback}`);
            $("#gif").html(`<img src=${stages[8].gif}>`);
            $("#answers").text(`${stages[8].correctAnswer}`);


        }else{
        clearDOM();
        var source = stages[index];
        $("#question").text(source.question);
        source.answers.forEach((answer) => {
            
            var listItem = $('<button>');
            $(listItem).attr('data-name', answer)
                        .attr('id', 'choice')
                        .attr('class', 'fad')
                       .text(answer);
            //$(list).append(listItem);
            $('#answers').append(listItem);
            
        });
        fadeInDOM();

        
        }
        
    },
    checkAnswer : function () {
        clearDOM();
        resultsTimer.countdown();
        
        var source = stages[index];
        if(isCorrect){
            $("#time").empty();
            $("#feedback").text(`Correct!`);
            $("#gif").html(`<img src=${source.gif}>`);
            //game.resultsInterval();
            wins++;
        }else if(isWrong){
            $("#time").empty();
            $("#feedback").text(`Wrong!`);
            $("#answers").text(`The correct answer is ${source.correctAnswer}`);
            $("#gif").html(`<img src=${source.gif}>`);
            //game.resultsInterval();
            losses++;
        }else if(isTimeout){
            $("#time").empty();
            $("#feedback").text(`Out of time!`);
            $("#answers").text(`The correct answer is ${source.correctAnswer}`);
            $("#gif").html(`<img src=${source.gif}>`);
            //game.resultsInterval();
            losses++;
        }
    },
}

var questionTimer = {
    time : 15,
    countdown : function () {
        var counter = setInterval(function(){
            $("#time").text(`Seconds left: ${questionTimer.time}`);
            questionTimer.time--
            if((questionTimer.time <= 0)){
                isTimeout = true;
                clearInterval(counter);
                $("#time").empty();
                game.checkAnswer();
            }else if(hasUserAnswered){
                $("#time").empty();
                clearInterval(counter);
            }
        }, 1000);
    }
}

var resultsTimer = {
    time : 5,
    countdown : function () {
        var counter = setInterval(function(){
            resultsTimer.time--;
            if((resultsTimer.time === 0)){
                clearInterval(counter);
                refresh();
                game.nextQuestion();
            }
        }, 1000);
    }
}

function refresh(){
    index++
    isCorrect = false;
    isWrong = false;
    isTimeout = false;
    hasUserAnswered = false;
    questionTimer.time = 15;
    resultsTimer.time = 5;
    
    clearDOM();
    questionTimer.countdown();
}

$(document).ready(function(){
    game.init();
    onClick("#start-button"); 
    $(document).keyup(function(event){
        if(isGameFinished){
            if(event.which === 32){
                location.reload();
            }else{
                return;
            }
    
        }else{
            return;
        }
    }); 
    fadeInDOM(); 
});


$(document).on("click", "#choice", chooseAnswer);



function chooseAnswer(){
        var source = stages[index];
        var userChoice = $(this).attr("data-name");
        if(userChoice === source.correctAnswer){
            isCorrect = true;
            hasUserAnswered = true;
            
            game.checkAnswer();
        }else if(userChoice != source.correctAnswer){
            isWrong = true;
            hasUserAnswered = true;
            
            game.checkAnswer();
        }
}

function onClick(bt){
    $(bt).on("click", function(){
        clearDOM();
        game.nextQuestion();
        questionTimer.countdown();
    });
}
function clearDOM(){
    clearThese.forEach((id) => {
        $(id).empty();
    });
}
function resetBooleans(){
    isCorrect = false;
    isWrong = false;
    isTimeout = false;
    hasUserAnswered = false;
    questionTime = 15;
    clearDOM();
}

function fadeInDOM(){
    $("#question").hide(0).delay(500).fadeIn(1000);
    $(".fad").hide(0).delay(500).fadeIn(3000);
}



    





