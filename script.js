document.addEventListener('DOMContentLoaded', () => {
    const gameBoardElement = document.getElementById('game-board');
    const scoreElement = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');

    let gameBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    let score = 0;
    let gameOver = false;

    function createTileElement(value) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.value = value;
        tile.textContent = value !== 0 ? value : '';
        return tile;
    }

    function updateGameBoard() {
        gameBoardElement.innerHTML = '';
        for (let row of gameBoard) {
            for (let cell of row) {
                const tile = createTileElement(cell);
                gameBoardElement.appendChild(tile);
            }
        }
    }

    function generateRandomTile() {
        const emptyPositions = [];
        for (let row = 0; row < gameBoard.length; row++) {
            for (let col = 0; col < gameBoard[row].length; col++) {
                if (gameBoard[row][col] === 0) {
                    emptyPositions.push({ row, col });
                }
            }
        }
        if (emptyPositions.length > 0) {
            const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
            gameBoard[randomPosition.row][randomPosition.col] = Math.random() < 0.9 ? 2 : 4;
            updateGameBoard();
        }
    }

    function resetGame() {
        gameBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        score = 0;
        gameOver = false;
        scoreElement.textContent = 'Score: 0';
        generateRandomTile();
        generateRandomTile();
        updateGameBoard();
    }

    function move(direction) {
        let moved = false;

        if (direction === 'up') {
            for (let col = 0; col < 4; col++) {
                for (let row = 1; row < 4; row++) {
                    if (gameBoard[row][col] !== 0) {
                        let r = row;
                        while (r > 0 && gameBoard[r - 1][col] === 0) {
                            gameBoard[r - 1][col] = gameBoard[r][col];
                            gameBoard[r][col] = 0;
                            r--;
                            moved = true;
                        }
                        if (r > 0 && gameBoard[r - 1][col] === gameBoard[r][col]) {
                            gameBoard[r - 1][col] *= 2;
                            gameBoard[r][col] = 0;
                            score += gameBoard[r - 1][col];
                            moved = true;
                        }
                    }
                }
            }
        } else if (direction === 'down') {
            for (let col = 0; col < 4; col++) {
                for (let row = 2; row >= 0; row--) {
                    if (gameBoard[row][col] !== 0) {
                        let r = row;
                        while (r < 3 && gameBoard[r + 1][col] === 0) {
                            gameBoard[r + 1][col] = gameBoard[r][col];
                            gameBoard[r][col] = 0;
                            r++;
                            moved = true;
                        }
                        if (r < 3 && gameBoard[r + 1][col] === gameBoard[r][col]) {
                            gameBoard[r + 1][col] *= 2;
                            gameBoard[r][col] = 0;
                            score += gameBoard[r + 1][col];
                            moved = true;
                        }
                    }
                }
            }
        } else if (direction === 'left') {
            for (let row = 0; row < 4; row++) {
                for (let col = 1; col < 4; col++) {
                    if (gameBoard[row][col] !== 0) {
                        let c = col;
                        while (c > 0 && gameBoard[row][c - 1] === 0) {
                            gameBoard[row][c - 1] = gameBoard[row][c];
                            gameBoard[row][c] = 0;
                            c--;
                            moved = true;
                        }
                        if (c > 0 && gameBoard[row][c - 1] === gameBoard[row][c]) {
                            gameBoard[row][c - 1] *= 2;
                            gameBoard[row][c] = 0;
                            score += gameBoard[row][c - 1];
                            moved = true;
                        }
                    }
                }
            }
        } else if (direction === 'right') {
            for (let row = 0; row < 4; row++) {
                for (let col = 2; col >= 0; col--) {
                    if (gameBoard[row][col] !== 0) {
                        let c = col;
                        while (c < 3 && gameBoard[row][c + 1] === 0) {
                            gameBoard[row][c + 1] = gameBoard[row][c];
                            gameBoard[row][c] = 0;
                            c++;
                            moved = true;
                        }
                        if (c < 3 && gameBoard[row][c + 1] === gameBoard[row][c]) {
                            gameBoard[row][c + 1] *= 2;
                            gameBoard[row][c] = 0;
                            score += gameBoard[row][c + 1];
                            moved = true;
                        }
                    }
                }
            }
        }

        if (moved) {
            generateRandomTile();
            updateScore();
            checkGameOver();
        }
    }

    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    function checkGameOver() {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (gameBoard[row][col] === 2048) {
                    alert('You win!');
                    gameOver = true;
                    return;
                }
                if (gameBoard[row][col] === 0) {
                    return;
                }
                if (row < 3 && gameBoard[row][col] === gameBoard[row + 1][col]) {
                    return;
                }
                if (col < 3 && gameBoard[row][col] === gameBoard[row][col + 1]) {
                    return;
                }
            }
        }
        alert('Game over!');
        gameOver = true;
    }

    resetButton.addEventListener('click', resetGame);

    document.addEventListener('keydown', (e) => {
        if (gameOver) return;
        switch (e.key) {
            case 'ArrowUp':
                move('up');
                break;
            case 'ArrowDown':
                move('down');
                break;
            case 'ArrowLeft':
                move('left');
                break;
            case 'ArrowRight':
                move('right');
                break;
        }
    });

    // Initialize the game with two random tiles
    resetGame();
});
