import { playSound } from "./sounds.js";
const GAME_BOARD = document.getElementById('gameBoard');
const BOARD_SIZE = 5;
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

const BOARD_TILES = new Array(BOARD_SIZE);
for (let i = 0; i < BOARD_SIZE; i++) {
    BOARD_TILES[i] = new Array(BOARD_SIZE);
    for (let ii = 0; ii < BOARD_SIZE; ii++) {
        BOARD_TILES[i][ii] = Math.floor(Math.random() * TILES_ICONS.length);
    }
}
const SCORE = document.getElementById('score');
let currentSCORE = 0;
let loadingInitialMatches = true;
renderTiles(BOARD_TILES);
checkMatch(BOARD_TILES);
loadingInitialMatches = false;

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
        el.onclick = null;
        el.addEventListener('dragstart', TiledragStart);
        el.addEventListener('dragover', e => { e.preventDefault(); })
        function TiledragStart(event) {
            event.dataTransfer.setData('text/plain', `${el.dataset.row},${el.dataset.col}`);
        }
        el.addEventListener('drop', event => {
            const [initRow, initCol] = event.dataTransfer.getData('text/plain').split(',').map(Number);
            swap(parseInt(el.dataset.row), parseInt(el.dataset.col), initRow, initCol, BOARD_TILES, el)
        })
        el.addEventListener('click', (event) => {
            const clickedRow = parseInt(el.dataset.row);
            const clickedCol = parseInt(el.dataset.col);
            if (position1[0] === -1) {
                position1[0] = clickedRow;
                position1[1] = clickedCol;
                el.classList.add('square_active');
                el.setAttribute('draggable', 'true')
            } else {
                position2[0] = clickedRow;
                position2[1] = clickedCol;
                const firstEl = document.querySelector(`.square[data-row="${position1[0]}"][data-col="${position1[1]}"]`);
                swap(position1[0], position1[1], position2[0], position2[1], BOARD_TILES, firstEl);
                firstEl.classList.remove('square_active');
                position1 = [-1, -1];
                position2 = [-1, -1];
            }
        });
    });
}

async function checkMatch(arr) {
    let matchFound = false;
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let ii = 0; ii < BOARD_SIZE - 2; ii++) {
            if (arr[i][ii] !== EMPTY_TILE &&
                arr[i][ii] === arr[i][ii + 1] &&
                arr[i][ii + 1] === arr[i][ii + 2]) {
                await rezolveMatch(i, ii, arr, 1);
                matchFound = true;
            }
        }
    }
    for (let i = 0; i < BOARD_SIZE - 2; i++) {
        for (let ii = 0; ii < BOARD_SIZE; ii++) {
            if (arr[i][ii] !== EMPTY_TILE &&
                arr[i][ii] === arr[i + 1][ii] &&
                arr[i + 1][ii] === arr[i + 2][ii]) {
                await rezolveMatch(i, ii, arr, 2);
                matchFound = true;
            }
        }
    }
    return matchFound;
}

async function rezolveMatch(row, col, arr, arg) {
    const matchedTile = arr[row][col];
    if (matchedTile === EMPTY_TILE) return;

    let sequenceTiles = [{ r: row, c: col }];
    if (arg === 1) {
        for (let c = col + 1; c < BOARD_SIZE; c++) {
            if (arr[row][c] === matchedTile) sequenceTiles.push({ r: row, c });
            else break;
        }
    } else if (arg === 2) {
        for (let r = row + 1; r < BOARD_SIZE; r++) {
            if (arr[r][col] === matchedTile) sequenceTiles.push({ r, c: col });
            else break;
        }
    } else {
        return;
    }
    if (sequenceTiles.length >= 3) {
        // Animate fade-out
        for (const { r, c } of sequenceTiles) {
            const tileElement = document.querySelector(`.square[data-row="${r}"][data-col="${c}"] img`);
            if (tileElement) tileElement.classList.add('fade-out');
        }
        // Wait for animation to finish (300ms)
        await new Promise(resolve => setTimeout(resolve, 300));

        // Remove tiles from array
        for (const coords of sequenceTiles) {
            arr[coords.r][coords.c] = EMPTY_TILE;
        }

        if (!loadingInitialMatches) {
            currentSCORE += 10 * sequenceTiles.length;
            SCORE.innerHTML = "The Score is " + currentSCORE;
            playSound(matchedTile);
        }
        handleTileChange(arr);
    }
}

async function handleTileChange(board) {
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
        await checkMatch(board);
    }
}

async function swap(x1, y1, x2, y2, arr, el2) {
    if ((x2 - x1) ** 2 + (y2 - y1) ** 2 === 1) {
        const el1 = document.querySelector(`.square[data-row="${x1}"][data-col="${y1}"] img`);
        const el2img = document.querySelector(`.square[data-row="${x2}"][data-col="${y2}"] img`);
        await animateSwap(el1, el2img);

        const temp = arr[x1][y1];
        arr[x1][y1] = arr[x2][y2];
        arr[x2][y2] = temp;

        renderTiles(arr);
        let matched = await checkMatch(arr);

        if (!matched) {
            await animateSwap(
                document.querySelector(`.square[data-row="${x1}"][data-col="${y1}"] img`),
                document.querySelector(`.square[data-row="${x2}"][data-col="${y2}"] img`)
            );
            const tempBack = arr[x1][y1];
            arr[x1][y1] = arr[x2][y2];
            arr[x2][y2] = tempBack;
            renderTiles(arr);
        }
        return true;
    } else {
        return false;
    }
}




function animateSwap(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    const deltaX = rect2.left - rect1.left;
    const deltaY = rect2.top - rect1.top;

    el1.style.transition = 'transform 0.3s ease';
    el2.style.transition = 'transform 0.3s ease';

    el1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    el2.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;

    return new Promise(resolve => {
        let count = 0;
        function done() {
            count++;
            if (count === 2) resolve();
        }
        el1.addEventListener('transitionend', done, { once: true });
        el2.addEventListener('transitionend', done, { once: true });
    });
}