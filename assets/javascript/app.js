var wins = 0;
var losses = 0;
var index = 0;
var clearThese = ["#time","#question", "#feedback", "#answers", "#gif"];

var stages = [{
        place : 1,
        question : "some question",
        answers : [0,1,2,3],
        correctAnswer : "someAnswers",
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
    someStage : function(){
        var source = stages[index];
        $("#question").text(source.question);
        source.answers.forEach((answer) => {
            var button = $('<button>');
            $(button).attr('data-name', answer)
                     .text(answer);
            $('#answers').append(button);
        });
        
    }
    
    



}

$(document).ready(function(){
    game.init();
    onClick("#start-button");

});

function onClick(btn){
    $(btn).on("click", function(){
        clearDOM();
    });
}
function clearDOM(){
    clearThese.forEach((id) => {
        $(id).empty();
    });
}

    





