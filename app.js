document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const resultDisplay = document.getElementById('result')
    let squares = []
    const width = 4

    //create the playing board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()

    //generate a new number
    function generate() {
        randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        } else generate()
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }


    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }



    //assign functions to keyCodes
    function control(e) {
        if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }
    document.addEventListener('keyup', control)

    function keyRight() {
        moveRight()
        moveRight()
        generate()
    }

    function keyLeft() {
        moveLeft()
        moveLeft()
        generate()
    }

    function keyUp() {
        moveUp()
        moveUp()
        generate()
    }

    function keyDown() {
        moveDown()
        moveDown()
        generate()
    }

    //check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You WIN'
                document.removeEventListener('keyup', control)
                setTimeout(() => clear(), 3000)
            }
        }
    }

    //check if there are no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'THE GAME IS OVER'
            document.removeEventListener('keyup', control)
            setTimeout(() => clear(), 3000)
        }
    }

    //clear timer
    function clear() {
        clearInterval(myTimer)
    }


    //add colours
    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#EC6645 '
        }
    }
    addColours()

    var myTimer = setInterval(addColours, 50)

})