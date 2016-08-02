$(document).ready(function() {
    // FUNCTIONS
    // -----------------------------------------------------------------------
    // Countdown timer for each question -----------------------------------
    function questionTimer() {
        counter = setInterval(decrement, 1000);
    }

    function decrement() {
        questionTime--;
        $('#countdown').html('Time Remaining: ' + questionTime + ' seconds');

        if (questionTime === 0) {
            numUnanswered++;

            // $('#game-display').hide();
            // $('#choice').html("You took to long to answer.");
            // $('#answer').show();

            resetTimer();

            // Testing console -------------------------------
            console.log('Unanswered: ' + numUnanswered);
        }
    }

    function resetTimer() {
        questionTime = 30;
    }
    //Shuffle answers ------------------------------------------------------

    // Fisher-Yates shuffle
    function shuffle(array) {
        let m = array.length,
            t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }
    // Shuffle one question's answers for now
    let availableAnswers = shuffle(mario.answers);
    console.log('Active Question: ' + mario.question);
    console.log('------------------------------------------');

    // Shuffle and display answers --------------------------------------
    $('#question-text').html(mario.question);
    for (let i = 0; i < availableAnswers.length; i++) {
        let j = $('<button>');
        j.addClass('btn btn-md btn-default btn-block answer');
        j.text(availableAnswers[i]);
        $('#answers').append(j);
        // Testing Console -------------------------------------
        console.log('Available Answer: ' + availableAnswers[i]);
    }
    console.log('------------------------------------------');

    // Display results
    // Show a page with the total results wrong, right, and unanswered after all questions.

    // Initialize the game with a start page -------------------------------
    function initialize() {
        questionTime = 30;
        answerTime = 10;
        counter = '';
        numRight = 0;
        numWrong = 0;
        numUnanswered = 0;

        $('#game-display').hide();
        $('#result').hide();

        // shuffleQuestion();
        // Testing Console -----------------------------------------
        console.log('Correct Answer: ' + mario.correctAnswer);
        console.log('------------------------------------------');
        console.log(Quiz[1]);
        console.log(mario.gif);
        console.log(sonic.gif);
    }

    // PROCESSES
    // -----------------------------------------------------------------------
    // When Start is clicked display the game and start the timer ----------
    $('#start-game').on('click', function() {
        $('#game-display').show();
        $('#start').hide();
        questionTimer();
    });
    // Check if selected answer is wrong/right -----------------------------
    $(document).on('click', '.answer', function() {
        if (this.innerHTML === mario.correctAnswer) {
            numRight++;
            $('#game-display').hide();
            $('#choice').html("That's right!");
            $('#answer').show();
            // Testing console -------------------------------------
            console.log('Right: ' + numRight);
        } else {
            numWrong++;
            $('#game-display').hide();
            $('#choice').html("Sorry, that's incorrect. :(");
            $('#correct-answer').html('The correct answer is ' + mario.correctAnswer);
            $('#answer').show();
            // Testing console -------------------------------------
            console.log('Wrong: ' + numWrong);
        }
        $.ajax({
            url: mario.gif,
            method: 'GET'
        }).done(function(response) {
            $('#gif').attr('src', response.data[3].images.fixed_height.url);
        });
    });
    // INITIALIZE
    // -----------------------------------------------------------------------
    initialize();
});
