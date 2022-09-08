const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let filledBoxes = [ "", "", "", "", "", "", "", "", "" ];
let activeUser = "X";
renderActiveUser();

const boxes = document.getElementById("boxes");
boxes.addEventListener("click", handleBoxClick);

function handleBoxClick(event) {
    const { key } = event.target.dataset || {};

    if (filledBoxes[key] != "") return; //if already filled

    filledBoxes[key] = activeUser;

    renderBox();
    checkWinner();
}

function checkWinner() {
    for (let i = 0; i<winningConditions.length; i++) {
        let a = filledBoxes[winningConditions[i][0]];
        let b = filledBoxes[winningConditions[i][1]];
        let c = filledBoxes[winningConditions[i][2]];

        if (!a || !b || !c) continue;

        if ((a === b) && (b === c)) {
            renderWinnerUser();
            return;
        }
    }

    // checking draw
    if (!filledBoxes.includes("")) {
        renderWinnerUser(true);
        return;
    }

    activeUser = activeUser === "X" ? "O" : "X";
    renderActiveUser();
}

function renderBox() {
    const { children } = boxes || {};

    for (let i=0; i<children.length; i++) {
        const node = children[i]
        node.innerText = filledBoxes[i] || "";
    }
}

function renderActiveUser() {
    document.getElementById("turn").innerHTML = activeUser + " turn";
}

function renderWinnerUser(draw = false) {
    document.getElementById("winner").innerHTML = draw ? "match draw" : activeUser + " wins";
    boxes.removeEventListener("click", handleBoxClick); //remove click event listener
}

function handleRestartClick() {
    filledBoxes = [ "", "", "", "", "", "", "", "", "" ];
    activeUser = "X";
    renderBox(); //reset filled boxes
    renderActiveUser(); //reset active user to default
    document.getElementById("winner").innerHTML = "";

    boxes.addEventListener("click", handleBoxClick);
}