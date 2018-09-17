var wins = 0;
var losses = 0;
var index = 0;
var questionTime = 15;
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
        question: "another question",
        answer : [4,5,6,7],
        correctAnswer : "someAnswers",
        gif: "assets/images/tester.gif"

    }
]
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
        questionTime = 15;
        resultsTime = 5;
        game.questionInterval();
        var source = stages[index];
        $("#question").text(source.question);
        source.answers.forEach((answer) => {
            var list = $('<ul>');
            var listItem = $('<li>');
            $(listItem).attr('data-name', answer)
                       .text(answer);
            $(list).append(listItem);
            $('#answers').append(list);
        });
        
    },
    checkAnswer : function () {
        clearDOM();
        game.resultsInterval();
        var source = stages[index];
        if(isCorrect){
            $("#feedback").text(`Correct!`);
            $("#gif").html(`<img src=${source.gif}>`);
            index++;
            wins++
        }else if(isWrong){
            $("#feedback").text(`Correct!`);
            $("#gif").html(`<img src=${source.gif}>`);
            index++;
            losses++
        }else if(isTimeout){
            $("#feedback").text(`Out of time!`);
            $("#answers").text(`The correct answer is ${source.correctAnswer}`);
            $("#gif").html(`<img src=${source.gif}>`);
            index++;
            losses++
        }
    },
    questionInterval : function (){
        var interval = setInterval(function(){
            if(questionTime <= 0){
                isTimeout = true;
                clearDOM();
                game.checkAnswer();
                clearInterval(interval);
            }
            $("#time").text(`Time remaining : ${questionTime}`);
            questionTime--
        }, 1000)
    },
    resultsInterval : function (){
        var interval = setInterval(function(){
            if(resultsTime <= 0){
                clearDOM();
                game.nextQuestion();
                
                clearInterval(interval);

            }
            $("#time").text(`Time remaining : ${resultsTime}`);
            resultsTime--
        
        }, 1000);
    }
}

$(document).ready(function(){
    game.init();
    onClick("#start-button");
    $('<li>').on("click",function(){
        var source = stages[index];
        var userChoice = $(this).attr('data-name');
        if(userChoice === source.correctAnswer){
            isCorrect = true;
            hasUserAnswered = true;
            game.checkAnswer();
        }else if(userChoice != source.correctAnswer){
            isWrong = true;
            hasUserAnswered = true;
            game.checkAnswer();
        }
    });
    
});

function onClick(btn){
    $(btn).on("click", function(){
        clearDOM();
        game.nextQuestion();
    });
}
function clearDOM(){
    clearThese.forEach((id) => {
        $(id).empty();
    });
}



    





