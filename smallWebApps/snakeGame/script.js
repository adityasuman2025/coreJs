const DIMN = 30;
const ARROW_UP = "ArrowUp", ARROW_DOWN = "ArrowDown", ARROW_LEFT = "ArrowLeft", ARROW_RIGHT = "ArrowRight";
const KEYS = [ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT];

let score = 0;
let snakeMovementInterval;
let snakeMovementDrctn, snakeCurrPosI = DIMN / 2, snakeCurrPosJ = DIMN / 2;
const randomFoodPos = getRandomFoodPosition();
let foodCurrPosI = randomFoodPos[0], foodCurrPosJ = randomFoodPos[1];


const scoreEle = document.getElementById("score");
const boardEle = document.getElementById("board");
const playAgainBtnEle = document.getElementById("playAgainBtn");
document.addEventListener("keyup", handleBoardTyped);
playAgainBtnEle.addEventListener("click", handlePlayAgainClick);


function handleBoardTyped(e) {
    const key = e.key;
    if (KEYS.includes(key)) {
        /*----- snake can't change its direction abruptly upside down ------*/
        if (key === ARROW_UP && snakeMovementDrctn === ARROW_DOWN) return;
        if (key === ARROW_DOWN && snakeMovementDrctn === ARROW_UP) return;
        if (key === ARROW_LEFT && snakeMovementDrctn === ARROW_RIGHT) return;
        if (key === ARROW_RIGHT && snakeMovementDrctn === ARROW_LEFT) return;
        /*----- snake can't change its direction abruptly upside down ------*/

        snakeMovementDrctn = key;

        if (!snakeMovementInterval) startSnakeMovement(); // if snake is not already moving then start movement
    }
}

function startSnakeMovement() {
    snakeMovementInterval = setInterval(() => {
        switch (snakeMovementDrctn) {
            case ARROW_UP: {
                if (snakeCurrPosI - 1 >= 0) {
                    snakeCurrPosI--;
                } else handleSnakeDied(); // snake hit the boundary, hence died/game over

                break;
            }
            case ARROW_DOWN: {
                if (snakeCurrPosI + 1 < DIMN) {
                    snakeCurrPosI++;
                } else handleSnakeDied(); // snake hit the boundary, hence died/game over

                break;
            }
            case ARROW_LEFT: {
                if (snakeCurrPosJ - 1 >= 0) {
                    snakeCurrPosJ--;
                } else handleSnakeDied(); // snake hit the boundary, hence died/game over

                break;
            }
            case ARROW_RIGHT: {
                if (snakeCurrPosJ + 1 < DIMN) {
                    snakeCurrPosJ++;
                } else handleSnakeDied(); // snake hit the boundary, hence died/game over

                break;
            }
        }


        // snake collided with food
        if ((foodCurrPosI === snakeCurrPosI) && (foodCurrPosJ === snakeCurrPosJ)) {
            renderScore(++score); // increasing and rendering the updated score

            // giving new position to food
            const randomFoodPos = getRandomFoodPosition();
            foodCurrPosI = randomFoodPos[0], foodCurrPosJ = randomFoodPos[1];
        }

        renderBoard();
    }, 200);
}

function handleSnakeDied() {
    boardEle.remove();
    scoreEle.innerText = `Game Over \nYour Final Score: ${score}`;

    playAgainBtnEle.style.display = "block";

    clearInterval(snakeMovementInterval);
}

function getRandomFoodPosition() {
    let i = Math.floor(Math.random() * (DIMN - 0 + 1)) + 0;
    let j = Math.floor(Math.random() * (DIMN - 0 + 1)) + 0;

    while (i === snakeCurrPosI) { // food can't be at snake's position
        i = Math.floor(Math.random() * (DIMN - 0 + 1)) + 0;
    }

    while (j === snakeCurrPosJ) { // food can't be at snake's position
        j = Math.floor(Math.random() * (DIMN - 0 + 1)) + 0;
    }

    return [i, j];
}

function handlePlayAgainClick() {
    window.location.reload();
}

renderBoard();
function renderBoard() {
    const tempEle = document.createElement("div");

    for (let i = 0; i < DIMN; i++) {

        const rowEle = document.createElement("div");
        rowEle.classList.add("row");

        for (let j = 0; j < DIMN; j++) {
            const cellEle = document.createElement("div");
            cellEle.classList.add("cell");

            if (i === snakeCurrPosI && j === snakeCurrPosJ) cellEle.classList.add("snake"); // snake cell
            if (i === foodCurrPosI && j === foodCurrPosJ) cellEle.classList.add("food"); // food cell

            rowEle.append(cellEle);
        }

        tempEle.append(rowEle);
    }

    boardEle.innerHTML = tempEle.innerHTML;
}

renderScore(score);
function renderScore(score) {
    scoreEle.innerText = `Score: ${score}`;
}