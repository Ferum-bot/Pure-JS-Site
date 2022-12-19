// DOM listeners
document.addEventListener('DOMContentLoaded', onApplicationInit)

// Document elements providers
const provideGameGridContainer = () => {
    return document.querySelector('#game-grid-container')
}
const provideGameInformationPanel = () => {
    return document.querySelector('#game-information-panel')
}

// Constants
const EMPTY = 'empty'
const CROSS = 'cross'
const NOUGHT = 'nought'


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
}

function onPlayAgainClicked() {
    gameField = gameField.map((row) => {
        return row.map(() => EMPTY)
    })
    currentTurn = CROSS

    clearPage()
    drawCurrentGameField()
}

function setNought(x, y) {
    if (gameField[x][y] !== EMPTY) {
        return
    }
    gameField[x][y] = NOUGHT
    currentTurn = CROSS
    drawCurrentGameField()
}

function setCross(x, y) {
    if (gameField[x][y] !== EMPTY) {
        return
    }
    gameField[x][y] = CROSS
    currentTurn = NOUGHT
    drawCurrentGameField()
}


// UI Interaction
function drawCurrentGameField() {
    clearPage()

    const container = provideGameGridContainer()
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

            container.appendChild(cell)
        }
    }
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

    // First row
    if (x === 0 && y === 0) {
        drawBorder(RIGHT)
        drawBorder(BOTTOM)
    }
    if (x === 0 && y === 1) {
        drawBorder(LEFT)
        drawBorder(BOTTOM)
        drawBorder(RIGHT)
    }
    if (x === 0 && y === 2) {
        drawBorder(LEFT)
        drawBorder(BOTTOM)
    }

    // Second row
    if (x === 1 && y === 0) {
        drawBorder(TOP)
        drawBorder(RIGHT)
        drawBorder(BOTTOM)
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
    }

    // Third row
    if (x === 2 && y === 0) {
        drawBorder(TOP)
        drawBorder(RIGHT)
    }
    if (x === 2 && y === 1) {
        drawBorder(TOP)
        drawBorder(LEFT)
        drawBorder(RIGHT)
    }
    if (x === 2 && y === 2) {
        drawBorder(TOP)
        drawBorder(LEFT)
    }
}

function addCross(element) {

}

function addNought(element) {

}

function drawPlayerWins(player) {
    if (player === CROSS) {

    }
    if (player === NOUGHT) {

    }
}

function clearPage() {
    const cellsContainer = provideGameGridContainer()
    const panelContainer = provideGameInformationPanel()

    while (cellsContainer.firstChild) {
        cellsContainer.removeChild(cellsContainer.lastChild)
    }
    while (panelContainer.firstChild) {
        panelContainer.removeChild(panelContainer.lastChild)
    }
}

function createGameCell(x, y) {
    const element = document.createElement('div')
    element.classList.add('game-cell')
    element.addEventListener('click', onCellClicked)

    element.dataset.x = x
    element.dataset.y = y

    return element
}