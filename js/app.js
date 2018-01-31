'use-strict';

(function ticTacToe() {
    /* =============================================================================
                                    GLOBAL VARIABLES
    */ //============================================================================

    // Main Div Sections  =========================================
    const startScreen = document.querySelector('#start');
    const boardScreen = document.querySelector('#board');
    const finishScreen = document.querySelector('#finish');
    // Buttons  ===================================================
    const buttonNewGame = document.querySelector('.button__newGame');
    const buttonStartGame = document.querySelector('.button__startGame');
    // Players  ===================================================
    const playerOne = document.querySelector('#player1');
    const playerTwo = document.querySelector('#player2');
    // Player Names  ==============================================
    const nameOne = document.querySelector('.nameOne');
    const nameTwo = document.querySelector('.nameTwo');
    let nameInputOne, nameInputTwo;
    // Boxes List  ================================================    
    let boxes = document.querySelector('.boxes');
    let box = boxes.children;
    // Game Over Message  =========================================
    let message = document.querySelector('.message');
    // Current Player  ============================================ 
    let activePlayer;
    // To count every click  ======================================  
    let round = 0;

    /* =============================================================================
                                    START GAME
    */ //============================================================================
    // Display start screen only
    showOrHideScreen(boardScreen, 'none', finishScreen, 'none');

    // Initiate the game  
    buttonStartGame.addEventListener('click', (e) => {
        nameInputOne = prompt('Please enter the name of Player 1.');
        nameInputTwo = prompt('Please enter the name of Player 2 or leave it empty if you want to play against the computer.');
        playerName();
        initGame();
    });

    /* =============================================================================
                                    MOUSEOVER EVENT
    */ //============================================================================

    boxes.addEventListener('mouseover', (e) => {
        let square = e.target;
        // Display "O" symbol if player is 1 
        if (square && activePlayer === 1 && !square.classList.contains('box-filled-2')) {
            square.style.backgroundImage = 'url("./img/o.svg")';
            // Display "X" symbol if player is 2              
        } else if (square && activePlayer === 2 && !square.classList.contains('box-filled-1')) {
            square.style.backgroundImage = 'url("./img/x.svg")';
        }
    });

    boxes.addEventListener('mouseout', (e) => {
        let square = e.target;
        // Removes symbol if box has no box-filled- class 
        if (square && !square.classList.contains('box-filled-2') && !square.classList.contains('box-filled-1')) {
            square.style.backgroundImage = 'none';
        }
    });

    /* =============================================================================
                                    PLAY GAME EVENT
    */ //============================================================================

    boxes.addEventListener('click', (e) => {
        let square = e.target;

        if (square && !square.classList.contains('box-filled-2') && !square.classList.contains('box-filled-1')) {
            square.classList.add('box-filled-' + activePlayer);
            // It will count every click on boxes to check if all have been clicked 
            round++;
            // Winning conditions 
            winner();
            nextPlayer();
            if (!nameInputTwo && round < 9) {
                // function for automatic mode
                robot();
            }
        }
    });
    // Restart Game
    buttonNewGame.addEventListener('click', (e) => {
        initGame();
    })

    /* =============================================================================
                                      FUNCTIONS
    */ //============================================================================

    function showOrHideScreen(elem1, value1, elem2, value2) {
        elem2.style.display = value1;
        elem1.style.display = value2;
    }

    function playerName() {
        if (nameInputOne) {
            nameOne.textContent = nameInputOne;
        }
        if (nameInputTwo) {
            nameTwo.textContent = nameInputTwo;
        }
    }

    function nextPlayer() {
        activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
        playerOne.classList.toggle('active');
        playerTwo.classList.toggle('active');
    }

    // Removes all additional classes and restore initial conditions
    function initGame() {
        showOrHideScreen(startScreen, 'none', finishScreen, 'none');
        boardScreen.style.display = 'block';
        finishScreen.classList.remove('screen-win-tie');
        finishScreen.classList.remove('screen-win-one');
        finishScreen.classList.remove('screen-win-two');
        playerOne.classList.remove('active');
        playerTwo.classList.remove('active');
        playerOne.classList.add('active');
        activePlayer = 1;
        round = 0;

        for (var i = 0; i < box.length; i++) {
            box[i].classList.remove('box-filled-1');
            box[i].classList.remove('box-filled-2');
            box[i].style.backgroundImage = 'none'
        }
    }
    // Automatic player function - it will be exectuded if the input field for player 2 name is empty
    function robot() {
        let random = Math.floor(Math.random() * 9);

        if (box[random].classList.contains('box-filled-2') || box[random].classList.contains('box-filled-1')) {
            robot();
        } else {
            box[random].classList.add('box-filled-2');
            box[random].style.backgroundImage = 'url("./img/x.svg")';
            // It will count every click on boxes to check if all have been clicked 
            round++;
            // Winning conditions 
            winner();
            nextPlayer();
        }
    }

    function winner() {
        if (
            box[0].classList.contains("box-filled-" + activePlayer) && box[1].classList.contains("box-filled-" + activePlayer) && box[2].classList.contains("box-filled-" + activePlayer) ||
            box[3].classList.contains("box-filled-" + activePlayer) && box[4].classList.contains("box-filled-" + activePlayer) && box[5].classList.contains("box-filled-" + activePlayer) ||
            box[6].classList.contains("box-filled-" + activePlayer) && box[7].classList.contains("box-filled-" + activePlayer) && box[8].classList.contains("box-filled-" + activePlayer) ||
            box[0].classList.contains("box-filled-" + activePlayer) && box[3].classList.contains("box-filled-" + activePlayer) && box[6].classList.contains("box-filled-" + activePlayer) ||
            box[1].classList.contains("box-filled-" + activePlayer) && box[4].classList.contains("box-filled-" + activePlayer) && box[7].classList.contains("box-filled-" + activePlayer) ||
            box[2].classList.contains("box-filled-" + activePlayer) && box[5].classList.contains("box-filled-" + activePlayer) && box[8].classList.contains("box-filled-" + activePlayer) ||
            box[0].classList.contains("box-filled-" + activePlayer) && box[4].classList.contains("box-filled-" + activePlayer) && box[8].classList.contains("box-filled-" + activePlayer) ||
            box[2].classList.contains("box-filled-" + activePlayer) && box[4].classList.contains("box-filled-" + activePlayer) && box[6].classList.contains("box-filled-" + activePlayer)
        ) {
            // Switch to finish screen   
            boardScreen.style.display = 'none';
            finishScreen.style.display = 'block';

            // Enable winnning screen player 1 
            if (activePlayer === 1) {
                finishScreen.classList.add('screen-win-one');
                // Display the default or input name 
                if (nameInputOne) {
                    message.textContent = nameInputOne + ' Wins';
                } else {
                    message.textContent = 'Player 1 Wins';
                }
                // Enable winnning screen player 2
            } else if (activePlayer === 2) {
                finishScreen.classList.add('screen-win-two');
                // Display the default or input name                 
                if (nameInputTwo) {
                    message.textContent = nameInputTwo + ' Wins';
                } else {
                    message.textContent = 'Computer Wins';
                }
            }
            // Tie resule if all boxes have been clicked with no win   
        } else if (round > 8) {
            boardScreen.style.display = 'none';
            finishScreen.style.display = 'block';
            message.textContent = 'It\'s a Tie!';
            finishScreen.classList.add('screen-win-tie');
        }
    }

})();


