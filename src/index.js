// DOM listeners
document.addEventListener('DOMContentLoaded', onApplicationInit)

// Document elements providers
const provideGameContainer = () => {
    return document.querySelector('#game-container')
}
const provideGameGridContainer = () => {
    return document.querySelector('#game-grid-container')
}
const provideGameInformationPanel = () => {
    return document.querySelector('#game-information-panel')
}
const providePlayAgainButton = () => {
    return document.querySelector('#play-again')
}
const provideWinTitle = () => {
    return document.querySelector('#title')
}
const provideTurnTitle = () => {
    return document.querySelector('#game-state-title')
}

// Constants
const EMPTY = 'empty'
const CROSS = 'cross'
const NOUGHT = 'nought'

const HIDDEN_CLASS = 'hidden'


// State variables
let gameField = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
]

let currentTurn = CROSS


// Events callbacks controllers
function onApplicationInit() {
    drawCurrentGameField()
    drawCurrentTurn()

    const playAgainButton = providePlayAgainButton()
    playAgainButton.addEventListener('click', onPlayAgainClicked)
}

function onCellClicked(event) {
    event.preventDefault()

    const gameCell = event.currentTarget
    const x = gameCell.dataset.x
    const y = gameCell.dataset.y

    if (gameField[x][y] !== EMPTY) {
        return
    }
    if (currentTurn === NOUGHT) {
        setNought(x, y)
    }
    if (currentTurn === CROSS) {
        setCross(x, y)
    }

    const winner = getGameWinnerOrNull()
    if (winner) {
        drawPlayerWins(winner)
    }
}

function onPlayAgainClicked() {
    gameField = gameField.map((row) => {
        return row.map(() => EMPTY)
    })
    currentTurn = CROSS

    clearPage()
    drawCurrentGameField()
    drawCurrentTurn()
}


// Game controllers
function getGameWinnerOrNull() {
    let winner = EMPTY

    // Check rows
    for (let x = 0; x < 3; x++) {
        if (gameField[x][0] === EMPTY) {
            continue
        }

        const currentCell = gameField[x][0]
        let isTheSame = true

        for (let y = 0; y < 3; y++) {
            if (currentCell !== gameField[x][y]) {
                isTheSame = false
                break
            }
        }

        if (isTheSame) {
            winner = gameField[x][0]
            break
        }
    }

    // Check columns
    for (let y = 0; y < 3; y++) {
        if (gameField[0][y] === EMPTY) {
            continue
        }

        const currentCell = gameField[0][y]
        let isTheSame = true

        for (let x = 0; x < 3; x++) {
            if (currentCell !== gameField[x][y]) {
                isTheSame = false
                break
            }
        }

        if (isTheSame) {
            winner = gameField[0][y];
            break
        }
    }

    const firstDiagonal = gameField[0][0] === gameField[1][1] && gameField[0][0] === gameField[2][2]
    const secondDiagonal = gameField[0][2] === gameField[1][1] && gameField[0][2] === gameField[2][0]

    // Check diagonals
    if (firstDiagonal && gameField[0][0] !== EMPTY) {
        winner = gameField[0][0]
    }
    if (secondDiagonal && gameField[0][2] !== EMPTY) {
        winner = gameField[0][2]
    }

    if (winner !== EMPTY) {
        return winner
    } else {
        return null
    }
}

function setNought(x, y) {
    if (gameField[x][y] !== EMPTY) {
        return
    }
    gameField[x][y] = NOUGHT
    currentTurn = CROSS
    drawCurrentGameField()
    drawCurrentTurn()
}

function setCross(x, y) {
    if (gameField[x][y] !== EMPTY) {
        return
    }
    gameField[x][y] = CROSS
    currentTurn = NOUGHT
    drawCurrentGameField()
    drawCurrentTurn()
}


// UI Interaction
function drawCurrentGameField() {
    clearPage()

    const cellsContainer = provideGameGridContainer()
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            const cell = createGameCell(x, y)
            drawBorders(cell, x, y)

            if (gameField[x][y] === CROSS) {
                addCross(cell)
            }
            if (gameField[x][y] === NOUGHT) {
                addNought(cell)
            }

            cellsContainer.appendChild(cell)
        }
    }

    cellsContainer.classList.remove(HIDDEN_CLASS)

    const gameContainer = provideGameContainer()
    gameContainer.classList.remove(HIDDEN_CLASS)
}

function drawBorders(element, x, y) {
    const TOP = 'top'
    const RIGHT = 'right'
    const BOTTOM = 'bottom'
    const LEFT = 'left'

    const drawBorder = (side) => {
        switch (side) {
            case TOP:
                element.classList.add('top-cell-border')
                break
            case RIGHT:
                element.classList.add('right-cell-border')
                break
            case BOTTOM:
                element.classList.add('bottom-cell-border')
                break
            case LEFT:
                element.classList.add('left-cell-border')
                break
        }
    }

    const removeBorder = (side) => {
        switch (side) {
            case LEFT:
                element.classList.add('left-cell-remove-border')
                break
            case TOP:
                element.classList.add('top-cell-remove-border')
                break
            case RIGHT:
                element.classList.add('right-cell-remove-border')
                break
            case BOTTOM:
                element.classList.add('bottom-cell-remove-border')
                break
        }
    }

    // First row
    if (x === 0 && y === 0) {
        drawBorder(RIGHT)
        drawBorder(BOTTOM)
        removeBorder(LEFT)
        removeBorder(TOP)
    }
    if (x === 0 && y === 1) {
        drawBorder(LEFT)
        drawBorder(BOTTOM)
        drawBorder(RIGHT)
        removeBorder(TOP)
    }
    if (x === 0 && y === 2) {
        drawBorder(LEFT)
        drawBorder(BOTTOM)
        removeBorder(TOP)
        removeBorder(RIGHT)
    }

    // Second row
    if (x === 1 && y === 0) {
        drawBorder(TOP)
        drawBorder(RIGHT)
        drawBorder(BOTTOM)
        removeBorder(LEFT)
    }
    if (x === 1 && y === 1) {
        drawBorder(LEFT)
        drawBorder(TOP)
        drawBorder(RIGHT)
        drawBorder(BOTTOM)
    }
    if (x === 1 && y === 2) {
        drawBorder(LEFT)
        drawBorder(TOP)
        drawBorder(BOTTOM)
        removeBorder(RIGHT)
    }

    // Third row
    if (x === 2 && y === 0) {
        drawBorder(TOP)
        drawBorder(RIGHT)
        removeBorder(LEFT)
        removeBorder(BOTTOM)
    }
    if (x === 2 && y === 1) {
        drawBorder(TOP)
        drawBorder(LEFT)
        drawBorder(RIGHT)
        removeBorder(BOTTOM)
    }
    if (x === 2 && y === 2) {
        drawBorder(TOP)
        drawBorder(LEFT)
        removeBorder(RIGHT)
        removeBorder(BOTTOM)
    }
}

function addCross(element) {
    const image = document.createElement('img')
    image.src = './static/close.png'
    image.classList.add('cross')
    element.appendChild(image)
}

function addNought(element) {
    const image = document.createElement('img')
    image.src = './static/dry-clean.png'
    image.classList.add('nought')
    element.appendChild(image)
}

function drawCurrentTurn() {
    const turnTitle = provideTurnTitle()
    turnTitle.classList.remove(HIDDEN_CLASS)
    turnTitle.innerHTML = `Current turn: ${currentTurn}`
}

function drawPlayerWins(player) {
    clearPage()

    let text = ''
    if (player === CROSS) {
        text = 'Cross player wins!'
    }
    if (player === NOUGHT) {
        text = 'Nought player wins!'
    }

    const title = provideWinTitle()
    const panelContainer = provideGameInformationPanel()

    title.innerHTML = text
    panelContainer.classList.remove(HIDDEN_CLASS)
}

function clearPage() {
    const cellsContainer = provideGameGridContainer()
    const panelContainer = provideGameInformationPanel()
    const gameTurnTitle = provideTurnTitle()
    const gameContainer = provideGameContainer()

    while (cellsContainer.firstChild) {
        cellsContainer.removeChild(cellsContainer.lastChild)
    }

    panelContainer.classList.add(HIDDEN_CLASS)
    cellsContainer.classList.add(HIDDEN_CLASS)
    gameTurnTitle.classList.add(HIDDEN_CLASS)
    gameContainer.classList.add(HIDDEN_CLASS)
}


// Support and util functions
function createGameCell(x, y) {
    const element = document.createElement('div')
    element.classList.add('game-cell')
    element.addEventListener('click', onCellClicked)

    element.dataset.x = x
    element.dataset.y = y

    return element
}