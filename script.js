const GAME_BOARD = document.getElementById('gameBoard');
const BOARD_SIZE = 8;
const EMPTY_TILE = -1;
const TILES_ICONS = [
    './game-tiles/discord.svg',
    './game-tiles/github.svg',
    './game-tiles/youtube.svg',
    './game-tiles/whatsapp.svg',
    './game-tiles/instagram.svg'
];
let position1 = [-1, -1];
let position2 = [-1, -1];
const SCORE = document.getElementById('score');
let curentSCORE = 0;

const BOARD_TILES = new Array(BOARD_SIZE);
for (let i = 0; i < BOARD_SIZE; i++) {
    BOARD_TILES[i] = new Array(BOARD_SIZE);
    for (let ii = 0; ii < BOARD_SIZE; ii++) {
        BOARD_TILES[i][ii] = Math.floor(Math.random() * TILES_ICONS.length);
    }
}
renderTiles(BOARD_TILES);
checkMatch(BOARD_TILES);

function renderTiles(arr) {
    GAME_BOARD.innerHTML = '';
    arr.forEach((el, rowIndex) => {
        const row = document.createElement('tr');
        el.forEach((root, colIndex) => {
            const square = document.createElement('td');
            square.classList.add('square');
            square.dataset.row = rowIndex;
            square.dataset.col = colIndex;

            if (root !== EMPTY_TILE) {
                const tile = document.createElement('img');
                tile.src = TILES_ICONS[root];
                tile.classList.add('icon_' + root);
                tile.classList.add('tile');
                square.appendChild(tile);
                square.classList.add('square_' + root);
            } else {
                square.classList.add('empty');
            }
            row.appendChild(square);
        });
        GAME_BOARD.appendChild(row);
    });
    AddEventListenersForTiles();
}

function AddEventListenersForTiles() {
    document.querySelectorAll('.square').forEach((el) => {
        el.addEventListener('click', (event) => {
            const clickedRow = parseInt(el.dataset.row);
            const clickedCol = parseInt(el.dataset.col);

            if (position1[0] === -1) {
                position1[0] = clickedRow;
                position1[1] = clickedCol;
                el.classList.add('square_active');
            } else {
                position2[0] = clickedRow;
                position2[1] = clickedCol;

                swap(position1[0], position1[1], position2[0], position2[1], BOARD_TILES);
                el.classList.remove('square_active');
                position1[0] = -1;
                position1[1] = -1;
                position2[0] = -1;
                position2[1] = -1;
            }
        });
    });
}

function checkMatch(arr) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let ii = 0; ii < BOARD_SIZE - 2; ii++) {
            if (arr[i][ii] !== EMPTY_TILE &&
                arr[i][ii] === arr[i][ii + 1] &&
                arr[i][ii + 1] === arr[i][ii + 2]) {
                rezolveMatch(i, ii, arr, 1);
            }
        }
    }
    for (let i = 0; i < BOARD_SIZE - 2; i++) {
        for (let ii = 0; ii < BOARD_SIZE; ii++) {
            if (arr[i][ii] !== EMPTY_TILE &&
                arr[i][ii] === arr[i + 1][ii] &&
                arr[i + 1][ii] === arr[i + 2][ii]) {
                rezolveMatch(i, ii, arr, 2);
            }
        }
    }
}

function rezolveMatch(row, col, arr, arg) {
    const matchedTile = arr[row][col];
    if (matchedTile === EMPTY_TILE) {
        return;
    }
    let sequenceTiles = [];
    sequenceTiles.push({ r: row, c: col });

    if (arg === 1) {
        for (let c = col + 1; c < BOARD_SIZE; c++) {
            if ((arr[row][c] === matchedTile)) {
                sequenceTiles.push({ r: row, c: c });
            } else {
                break;
            }
        }
    } else if (arg === 2) {
        for (let r = row + 1; r < BOARD_SIZE; r++) {
            if (matchedTile === arr[r][col]) {
                sequenceTiles.push({ r: r, c: col });
            } else {
                break;
            }
        }
    } else {
        console.error('Unexpected error in rezolveMatch: Invalid arg type.');
        return;
    }

    if (sequenceTiles.length >= 3) {
        for (const coords of sequenceTiles) {
            arr[coords.r][coords.c] = EMPTY_TILE;
        }
    }
    handleTileChange(arr);
}

function handleTileChange(board) {
    let repeat = false;
    for (let col = 0; col < BOARD_SIZE; col++) {
        let emptyCount = 0;
        for (let row = BOARD_SIZE - 1; row >= 0; row--) {
            if (board[row][col] === EMPTY_TILE) {
                emptyCount++;
            } else if (emptyCount > 0) {
                board[row + emptyCount][col] = board[row][col];
                board[row][col] = EMPTY_TILE;
                repeat = true;
            }
        }
        for (let row = 0; row < emptyCount; row++) {
            board[row][col] = Math.floor(Math.random() * TILES_ICONS.length);
            repeat = true;
        }
    }
    renderTiles(board);
    if (repeat) {
        checkMatch(board);
    }
}

function swap(x1, y1, x2, y2, arr) {
    if ((x2 - x1) * (x2 - x1) <= 1 && (y2 - y1) * (y2 - y1) <= 1 && (x1 === x2 || y1 === y2)) {
        const temp = arr[x1][y1];
        arr[x1][y1] = arr[x2][y2];
        arr[x2][y2] = temp;
        renderTiles(arr);
        checkMatch(arr);
        return true;
    } else {
        window.alert("Not a valid move, lil bro! Try swapping only adjacent tiles horizontally or vertically.");
        return false;
    }
}