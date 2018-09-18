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


var stages = [{
        place : 1,
        question : "What is the only mammal that is capable of true flight?",
        answers : ["The flying squirrel","The eagle","The bat","The marsupial"],
        correctAnswer : "The bat",
        gif: "assets/images/giphy.gif"
    },
    {
        place: 2,
        question: "What is the most common bird in the world?",
        answers : ["The Robin","The Duck","The Hawk","The chicken"],
        correctAnswer : "The chicken",
        gif: "assets/images/tester.gif"

    }
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
        clearDOM();
        //questionTime = 15;
        
        //game.questionInterval();
        var source = stages[index];
        $("#question").text(source.question);


        source.answers.forEach((answer) => {
            
            var listItem = $('<button>');
            $(listItem).attr('data-name', answer)
                        .attr('id', 'choice')
                       .text(answer);
            //$(list).append(listItem);
            $('#answers').append(listItem);
        });
        
    },
    checkAnswer : function () {
        clearDOM();
        resultsTimer.countdown();
        
        var source = stages[index];
        if(isCorrect){
            $("#feedback").text(`Correct!`);
            $("#gif").html(`<img src=${source.gif}>`);
            //game.resultsInterval();
            wins++;
        }else if(isWrong){
            $("#feedback").text(`Wrong!`);
            $("#gif").html(`<img src=${source.gif}>`);
            //game.resultsInterval();
            losses++;
        }else if(isTimeout){
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
                game.checkAnswer();
            }else if(hasUserAnswered){
                clearInterval(counter);
            }
        }, 1000);
    }
}

var resultsTimer = {
    time : 5,
    countdown : function () {
        var counter = setInterval(function(){
            $("#time").text(`Seconds left: ${resultsTimer.time}`);
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
});


$(document).on("click", "#choice", chooseAnswer);


function chooseAnswer(){
   
        var source = stages[index];
        var userChoice = $(this).attr("data-name");
        if(userChoice === source.correctAnswer){
            isCorrect = true;
            hasUserAnswered = true;
            //clearInterval(game.questionInterval);
            game.checkAnswer();
        }else if(userChoice != source.correctAnswer){
            isWrong = true;
            hasUserAnswered = true;
            //clearInterval(game.questionInterval);
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



    





