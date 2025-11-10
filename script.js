(function (){
    const Gameboard = {
        gameState: [['X', 'X', 'X'],
                    ['_', '_', '_'],
                    ['_', '_', '_']],

        resetGame: function () {
            this.gameState = [['_', '_', '_'],
                              ['_', '_', '_'],
                              ['_', '_', '_']]
            this.gameOver = false
        },

        gameOver: false,

        displayGame: function () {
            for (row of this.gameState) {
                console.log(row.join(''))
            } 
        },

        createPlayers: function () {
            const playerOne = { name: 'Joe', score: 0 }
            const playerTwo = { name: 'Jane', score: 0 }
            return { playerOne, playerTwo }
        },

        chooseSymbol: function (){
            this.playerOne.symbol = 'X'
            this.playerTwo.symbol = 'O'
        },

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

        printWinner: function (player) {
            console.log(`Congrats ${player.name}!!! You won the game! :)`)
            this.gameOver = true
        },

        checkWinner: function (board) {
            if (this.checkRows(board)) {
                if (this.checkRows(board) === this.playerOne.symbol) {
                    this.playerOne.score++
                    this.printWinner(this.playerOne)
                } else {
                    this.playerTwo.score++
                    this.printWinner(this.playerTwo)
                }
            }
            else if (this.checkColumns(board)) {
                if (this.checkColumns(board) === this.playerOne.symbol) {
                    this.playerOne.score++
                    this.printWinner(this.playerOne)
                } else {
                    this.playerTwo.score++
                    this.printWinner(this.playerTwo)
                }
            }
            else if (this.checkDiagonals(board)) {
                if (this.checkDiagonals(board) === this.playerOne.symbol) {
                    this.playerOne.score++
                    this.printWinner(this.playerOne)
                } else {
                    this.playerTwo.score++
                    this.printWinner(this.playerTwo)
                }
            } 
        },

        init: function () {
            const { playerOne, playerTwo } = this.createPlayers()
            this.playerOne = playerOne
            this.playerTwo = playerTwo
            this.chooseSymbol()
        },

        chooseMove: function (player) {
            let row = prompt('Which row do you choose? 0, 1, or 2')
            let column = prompt('Which column do you choose? 0, 1, or 2')
            if (this.gameState[row][column] === '_'){
                console.log(player.symbol)
                this.gameState[row][column] = player.symbol
                console.log(this.gameState[row][column])
            }
            else {
                alert('Invalid move!')
                this.chooseMove(player)
            }
            this.checkWinner(this.gameState)
        },

        playGame: function () {
            while (!this.gameOver) {
                this.displayGame()
                this.chooseMove(this.playerOne)
                if (!this.gameOver) {
                    this.displayGame()
                    this.chooseMove(this.playerTwo)
                }
                else break
            }
            this.resetGame()

        },

    }
    Gameboard.init()
    Gameboard.playGame()

})();