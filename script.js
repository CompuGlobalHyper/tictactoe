(function (){
    const Gameboard = {
        //Internal gamestate array
        gameState: [['_', '_', '_'],
                    ['_', '_', '_'],
                    ['_', '_', '_']],

        //Resets all the booleans and fields
        resetGame: function () {
            const resetButton = document.querySelector('#reset-button')
            const gameLog = document.getElementById('log')
            resetButton.addEventListener('click', () => {
                console.log("you have reset")
                this.playerOne = ''
                this.playerTwo = ''
                this.isX = true
                this.gameStarted = false
                this.gameOver = true
                let newDiv = document.createElement('div')
                gameLog.appendChild(newDiv)
                newDiv.textContent = `> You have reset the game. Please choose your player names...`
                Gameboard.cleanLog()
                this.gameState = [['_', '_', '_'],
                                ['_', '_', '_'],
                                ['_', '_', '_']]
                const gameSquares = document.querySelectorAll('.square')
                gameSquares.forEach(function(gamePiece) {
                    gamePiece.children[0].textContent = " "
                })
            })
        },
        
        //Objects that relate to various 'states' of gameplay
        gameOver: false,
        isX : true,
        gameStarted: false,
        disableGame: false,
        playerOne: '',
        playerTwo: '',
        playerOneFound : false,
        playerTwoFound : false,
        logCounter : 0,

        //Button event for adding the player's name and setting playerFound boolean
        createPlayers: function () {
            const playerButton = document.querySelectorAll('button')
            playerButton.forEach((button) => {
                button.addEventListener('click', (event) => {
                    event.preventDefault()
                    if (!Gameboard.gameStarted) {
                        if (button.id === 'player-one-button') {
                            const submission = document.getElementById('player-one').value
                                this.playerOne = submission
                                console.log(submission)
                                this.playerOneFound = true
                        }
                        if (button.id === 'player-two-button') {
                                const submission = document.getElementById('player-two').value
                                this.playerTwo = submission
                                this.playerTwoFound = true
                        }
                    }
                })
            })
        },

        //Checks the rows of the array for 3 in a row
        checkRows: function (board) {
            console.log(board)
            for (let row = 0; row < 3; row++) {
                if (board[row][0] !== '_') {
                    if (board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
                        return board[row][0]
                    }
                }
            } return null
        },

        //Checks the columns of the array for 3 in a row
        checkColumns: function (board) {
            for (let col = 0; col < 3; col++) {
                if (board[0][col]!== '_') {
                    if (board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
                        return board[0][col]
                    }
                }
            } 
            return null
        },

        //Checks the diagonals of the array for 3 in row
        checkDiagonals: function (board) {
            if (board[0][0] !== '_') {
                if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
                    return board[0][0]
                }
            }
            if (board[0][2] !== '_') {
                if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
                    return board[0][2]
                }
            }
            return null
        },

        //Checks to see if the board is full resulting in a tie
        checkTie: function (board) {
            for (let row of board) {
                for (let square of row) {
                    if (square === "_") return false
                }
            }
            return true
        },

        //Prints the winner and a reset string
        printWinner: function () {
            const gameLog = document.getElementById('log')
            let newDiv = document.createElement('div')
            gameLog.appendChild(newDiv)
            if (this.isX && !this.gameOver) {
                newDiv.textContent = `> Congrats ${this.playerOne}!!! You won the game! :)`
                Gameboard.cleanLog()
                this.gameOver = true
            }
            else if (!this.gameOver){
                newDiv.textContent = `> Congrats ${this.playerTwo}!!! You won the game! :)`
                Gameboard.cleanLog()
                this.gameOver = true
            }
            if (this.gameOver && !this.disableGame) {
            this.disableGame = true
            let newDiv2 = document.createElement('div')
            gameLog.appendChild(newDiv2)
            newDiv2.textContent = `> Please click 'Reset' to start selecting new player names`
            Gameboard.cleanLog()
            }
            this.playerOneFound = false
            this.playerTwoFound = false
        },

        //Prints a 'tie' string and a reset string
        printTie: function () { 
            const gameLog = document.getElementById('log')
            let newDiv = document.createElement('div')
            newDiv.textContent = `> It was a tie, oh well...`
            gameLog.appendChild(newDiv)
            Gameboard.cleanLog()
            this.gameOver = true
            this.disableGame = true
            let newDiv2 = document.createElement('div')
            gameLog.appendChild(newDiv2)
            newDiv2.textContent = `> Please click 'Reset' to start selecting new player names`
            Gameboard.cleanLog()
        },

        //Runs all '3 in a row' functions and checks for a tie
        checkWinner: function (board) {
            if (this.checkRows(board)) {
                if (this.checkRows(board) === 'X') {
                    this.printWinner()
                } else {
                    this.printWinner()
                }
            }
            else if (this.checkColumns(board)) {
                if (this.checkColumns(board) === 'X') {
                    this.printWinner()
                } else {
                    this.playerTwo.score++
                    this.printWinner()
                }
            }
            else if (this.checkDiagonals(board)) {
                if (this.checkDiagonals(board) === 'X') {
                    this.printWinner()
                } else {
                    this.printWinner()
                }
            } else if (this.checkTie(board)) {
                console.log("TIE")
                this.printTie()
            }
        },

        //Prints actions of the game in a DOM window
        logGame: function () {
            const gameLog = document.getElementById('log')
            const gameSquares = document.querySelectorAll('.square')
            gameSquares.forEach(function(gamePiece) {
                gamePiece.addEventListener('click', function() {
                    if (Gameboard.gameStarted) {
                        console.log(Gameboard.playerOne)
                        console.log(gamePiece.children[0].textContent)
                        if (Gameboard.playerOneFound && Gameboard.playerTwoFound) {
                            if ((gamePiece.children[0].textContent === 'X' ||
                                gamePiece.children[0].textContent === 'O') &&
                                !Gameboard.gameOver) {
                                    let newDiv = document.createElement('div')
                                    gameLog.appendChild(newDiv)
                                    newDiv.textContent = '> Invalid move, please try again.'
                                    Gameboard.cleanLog()
                                }  
                            else if (Gameboard.isX && !Gameboard.gameOver) {
                                let newDiv = document.createElement('div')
                                gameLog.appendChild(newDiv)
                                newDiv.textContent = `> ${Gameboard.playerOne} has placed an 'X'`
                                Gameboard.cleanLog()

                            }
                            else if (!Gameboard.gameOver) {
                                let newDiv = document.createElement('div')
                                gameLog.appendChild(newDiv)
                                newDiv.textContent = `> ${Gameboard.playerTwo} has placed an 'O'`
                                Gameboard.cleanLog()
                            }
                        }
                    }
                })
            })
        },

        //Logs choices made in the DOM into the gamestate array
        chooseMove: function () {
            const gameSquares = document.querySelectorAll('.square')
            gameSquares.forEach(function(gamePiece) {
                gamePiece.addEventListener('click', function() {
                    console.log(Gameboard.isX)
                    if (gamePiece.children[0].textContent === 'X' ||
                        gamePiece.children[0].textContent === 'O') {
                            return
                        }  
                    else if (Gameboard.isX && !Gameboard.gameOver) {
                        const row = gamePiece.children[0].dataset.row
                        const col = gamePiece.children[0].dataset.col
                        gamePiece.children[0].textContent = 'X'
                        Gameboard.gameState[row][col] = 'X'

                    }
                    else if (!Gameboard.gameOver) {
                        const row = gamePiece.children[0].dataset.row
                        const col = gamePiece.children[0].dataset.col
                        gamePiece.children[0].textContent = 'O'
                        Gameboard.gameState[row][col] = 'O'
                    }
                    if (!Gameboard.gameOver) {
                        Gameboard.checkWinner(Gameboard.gameState)
                        Gameboard.isX = !Gameboard.isX
                    }
                    
                })
            })
        },

        //Prints player names when submitted
        logPlayers: function () {
            const gameLog = document.getElementById('log')
            const gameLogCounter = 0
            const playerButton = document.querySelectorAll('button')
                playerButton.forEach((button) => {
                    button.addEventListener('click', (event) => {
                        event.preventDefault()
                        if (!Gameboard.gameStarted) {
                            if (button.id === 'player-one-button') {
                                const submission = document.getElementById('player-one').value
                                if (submission) {
                                    let newDiv = document.createElement('div')
                                    gameLog.appendChild(newDiv)
                                    newDiv.textContent = `> Player One is named ${submission} and will use 'X'`
                                    Gameboard.cleanLog()
                                }
                            }
                            if (button.id === 'player-two-button') {
                                const submission = document.getElementById('player-two').value
                                if (submission) {
                                    let newDiv = document.createElement('div')
                                    gameLog.appendChild(newDiv)
                                    newDiv.textContent = `> Player Two is named ${submission} and will use 'O'`
                                    Gameboard.cleanLog()
                                }
                            }
                        }
                    })
                })
        },

        //Prints that the game is ready and activates the function to select squares
        startGame: function () {
            startButton = document.querySelector('#start-button')
            startButton.addEventListener('click', () => {
                console.log("You clicked on start")
                if (this.playerOneFound && this.playerTwoFound && !this.gameStarted) {
                    const gameLog = document.getElementById('log')
                    let newDiv = document.createElement('div')
                    gameLog.appendChild(newDiv)
                    newDiv.textContent = '> Game is ready to play!'
                    this.gameOver = false
                    this.gameStarted = true
                    Gameboard.cleanLog()
                    this.chooseMove()
                }
            })
        },

        //Runs functions for submitting player names, printing strings and start/reset
        init: function () {
            console.log("Creating players")
            this.createPlayers()
            console.log("Initializing player log")
            this.logPlayers()
            console.log ("Initializing game log")
            this.logGame()
            console.log("Activating reset button")
            this.resetGame()
            console.log("Activating start button")
            this.startGame()
        },

        //Deletes strings from the DOM as needed
        cleanLog: function () {
            console.log(this.logCounter)
            const log = document.querySelector('#log')
            if (this.logCounter > 2) {
                log.children[0].remove()
            }
            else this.logCounter += 1;
        }

    }
Gameboard.init()
})();
