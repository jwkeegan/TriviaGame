$(document).ready(function () {

    // create question objects
    // Each question has a prompt, four possible responses, and the index of the correct response
    var q1 = {
        prompt: "The game featured in Space Jam was considered the largest upset in basketball history until this team lost to a 16-seed in the 2018 NCAA Tournament",
        responses: ["Duke", "Virginia", "Kentucky", "Gonzaga"],
        answer: 1
    }

    var q2 = {
        prompt: "Which basketball player did not have his skill taken?",
        responses: ["Charles Barkley", "Muggsy Bogues", "Larry Bird", "Patrick Ewing"],
        answer: 2
    }

    var q3 = {
        prompt: "What was the half-time lead for the Monstars?",
        responses: ["48", "42", "51", "55"],
        answer: 0
    }

    var q4 = {
        prompt: "Which Independent League Baseball hat does Bill Murray wear during the movie?",
        responses: ["Sioux City Explorers", "Winnipeg Goldeyes", "Chicago Dogs", "Saint Paul Saints"],
        answer: 3
    }
    
    var q5 = {
        prompt: "Which name below is not the name of one of the Monstars",
        responses: ["Blinky", "Pound", "Nawt", "Bupkus"],
        answer: 0
    }
    
    var q6 = {
        prompt: "Which Tune is not on the Tune Squad?",
        responses: ["Yosemite Sam", "Granny", "Elmer Fudd", "Foghorn Leghorn"],
        answer: 1
    }
    
    var q7 = {
        prompt: "Which Tune is the first character to speak?",
        responses: ["Bugs Bunny", "Porky the Pig", "Daffy Duck", "Sylvester"],
        answer: 2
    }
    
    var q8 = {
        prompt: "What Minor League team did Michael Jordan play for?",
        responses: ["Chattanooga Lookouts", "Jackson Generals", "Tennessee Smokies", "Birmingham Barons"],
        answer: 3
    }
    
    var q9 = {
        prompt: "What is the name of the outer space theme park?",
        responses: ["Moron Mountain", "Magic Mountain", "Money Mountain", "Mars Mountain"],
        answer: 0
    }
    
    var q10 = {
        prompt: "How does Michael get to Looney Toons land?",
        responses: ["Through a TV screen", "Through a golf hole", "Through a portal", "Through a door in his gym"],
        answer: 1
    }
    
    var q11 = {
        prompt: "Who does Bill Murray get mistaken for by the Monstars' Boss?",
        responses: ["Chevy Chase", "Harold Ramis", "Dan Aykroyd", "Rodney Dangerfield"],
        answer: 2
    }

    var q12 = {
        prompt: "In order to get his 'powers' back, Charles Barkley promises God he will never go out with this artist again:",
        responses: ["Mariah Carey", "Celine Dion", "Janet Jackson", "Madonna"],
        answer: 3
    }

    // create array of the questions
    questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12];

    // create variables to hold values important to game
    var correctGuesses = 0;
    var intervalId;
    var timeLeft = 0;
    var questionOrder;
    var curQuestion;
    var displayQuestion = false;

    // create function to clear quiz window
    function clearPage() {
        $("#question").empty();
        $("#time-remaining").empty();
        $("#answers").empty();
    }

    // create function to randomize order of questions
    function randomizeOrder(questions) {
        // create array of numbers already put into sequence
        var usedNums = [];

        // loop until usedNums.length is as long as questions.length
        // this ensures that usedNums will use all of the questions
        while (usedNums.length < questions.length) {

            // randomly generate an index of questions
            var nextIndex = Math.floor(Math.random() * questions.length);

            // if we haven't yet used this index, put it in the array
            if (!usedNums.includes(nextIndex)) {
                usedNums.push(nextIndex);
            }
        }

        return usedNums;
    }

    // create function to show question
    function showQuestion(questionIndex) {

        // set boolean switch to true
        displayQuestion = true;

        // clear page
        clearPage();

        // find the question in 
        var question = questions[questionOrder[questionIndex]];

        // Put question prompt into question section of text
        $("#question").text(question.prompt);

        // for each possible response, append a div 
        for (i = 0; i < question.responses.length; i++) {
            $("#answers").append("<div id='response' data=" + i + ">" + question.responses[i] + "</div>");
        }

        timeLeft = 30;
        run();

    }

    // create function to process if answer is correct
    function processAnswer(answer) {

        // set boolean switch to false
        displayQuestion = false;

        // clear page
        clearPage();

        // set timeLeft to 3 for between question time
        timeLeft = 3;

        run();

        // declare correct answer
        var correctAnswer = questions[questionOrder[curQuestion]].answer;

        if (answer == correctAnswer) {

            // increment correct guesses
            correctGuesses++;

        }

        // Display user guess and correct answer
        if (answer >= 0) {
            $("#question").append("<div>You Answered: " + questions[questionOrder[curQuestion]].responses[answer] + "</div>");
        }
        $("#question").append("<div>Correct Answer: " + questions[questionOrder[curQuestion]].responses[correctAnswer] + "</div>");

        // increment curQuestion
        curQuestion++;

    }

    // Create function to end the quiz, and give user opportunity to try again
    function endQuiz() {

        // clear page
        clearPage();

        // replace start button
        $("#start-button").append("<button>Click here to try again!</button>");

        // show user how they did
        $("#question").text("You answered " + correctGuesses + "/" + questions.length + " questions correctly");

    }

    // create function to run clock until next screen
    function run() {

        // clear previous handler
        clearInterval(intervalId);

        // create new handler
        intervalId = setInterval(decrement, 1000);
    }

    // create function to decrement time
    function decrement() {

        // decrement global var
        timeLeft--;

        // Display Time remaining if it's a question page
        if (displayQuestion) {
            $("#time-remaining").text("Time Remaining: " + timeLeft);
        }

        // at end of timer
        if (timeLeft == 0) {

            // stop handler
            stop();

            // if this is a question screen, process a wrong answer
            if (displayQuestion) {
                processAnswer(-1);
            }

            // if we are at the end of our quiz, run the endQuiz function
            else if (curQuestion == questions.length) {
                endQuiz();
            }

            // otherwise (if we are showing the answer to previous Q and there are more questions)
            else {
                showQuestion(curQuestion);
            }

        }

    }

    // create stop function
    function stop() {
        clearInterval(intervalId);
    }

    // create function to initialize game
    function initialize() {

        // reset globals
        correctGuesses = 0;
        clearInterval(intervalId);
        timeLeft = 0;

        // clear quiz window
        clearPage();

        // randomize question order
        questionOrder = randomizeOrder(questions);
        curQuestion = 0;

        showQuestion(curQuestion);

    }

    // on button press, begin trivia
    $("#start-button").click(function () {
        $(this).empty();
        initialize();
    });

    $(document).on("click", "#response", function () {

        // stop timer
        stop();

        // pass this.data to processAnswer
        processAnswer($(this).attr("data"));

    });

    // create audio element
    var audioElement = document.createElement("audio");

    // set source to song in assets/media
    audioElement.setAttribute("src","assets/media/space_jam.mp3");

    // create boolean for if music is playing
    var isPlaying = false;

    $("#theme-music").on("click", function() {

        // if music is playing, stop it
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
        } 
        
        // if music is not playing, start it
        else {
            audioElement.play();
            isPlaying = true;
        }

    });

});