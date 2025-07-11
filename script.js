const GAME_BOARD = document.getElementById('gameBoard');
const BOARD_SIZE = 8;
const TILES_ICONS = [
    './game-tiles/discord.svg',
    './game-tiles/github.svg',
    './game-tiles/youtube.svg',
    './game-tiles/whatsapp.svg',
    './game-tiles/instagram.svg'
];
let position1 = Int8Array(2);
let position2 = Int8Array(2);

const SCORE = document.getElementById('score');
const BOARD_TILES = new Array(BOARD_SIZE);
for (let i = 0; i < BOARD_SIZE; i++) {
    BOARD_TILES[i] = new Array(BOARD_SIZE);
}
for (let i = 0; i < BOARD_SIZE; i++) {
    for (let ii = 0; ii < BOARD_SIZE; ii++) {
        BOARD_TILES[i][ii] = Math.floor(Math.random() * TILES_ICONS.length);
    }
}
renderTiles(BOARD_TILES);
function renderTiles(arr) {
    GAME_BOARD.innerHTML = '';
    arr.forEach(el => {
        const row = document.createElement('tr');
        el.forEach(root => {
            const tile = document.createElement('img');
            tile.src = TILES_ICONS[root];
            tile.classList.add('icon_' + root);
            tile.classList.add('tile');
            const square = document.createElement('td');
            square.appendChild(tile);
            square.classList.add('square');
            row.appendChild(square);
        }); GAME_BOARD.appendChild(row);
    });
    checkMatch(BOARD_TILES);
}
function checkMatch(arr) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let ii = 0; ii < BOARD_SIZE - 2; ii++) {
            if (arr[i][ii] === arr[i][ii + 1] && arr[i][ii + 1] === arr[i][ii + 2]) {
                rezolveMatch(i, ii, arr, 1)//row;
            }

        }
    }
    for (let i = 0; i < BOARD_SIZE - 2; i++) {
        for (let ii = 0; ii < BOARD_SIZE; ii++) {
            if (arr[i][ii] === arr[i + 1][ii] && arr[i + 1][ii] === arr[i + 2][ii]) {
                rezolveMatch(i, ii, arr, 2)//column;
            }

        }
    }
}
function rezolveMatch(row, col, arr, arg) {
    if (arg == 1) {
        let rightMatch = -1;
        for (let ii = col + 2; ii < BOARD_SIZE; ii++) {
            if (arr[row][col + 2] == arr[row][ii]) {
                rightMatch++;
            }
        }
        for (let i = rightMatch + 2; i >= 0; i--) {
            arr[row][col + rightMatch] = Math.floor(Math.random() * TILES_ICONS.length);
        }
        renderTiles(arr);
    } else if (arg == 2) {
        let downMatch = -1;
        for (let ii = row + 2; ii < BOARD_SIZE; ii++) {
            if (arr[row + 2][col] == arr[ii][col]) {
                downMatch++;
            }
        }
        for (let i = downMatch + 2; i >= 0; i--) {
            arr[row + downMatch][col] = Math.floor(Math.random() * TILES_ICONS.length);
        }
        renderTiles(arr);
    } else {
        alert('unexpected error');
    }
}
