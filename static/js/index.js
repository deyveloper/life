const canvas = document.getElementById('gameBoard');
const canvasCtx = canvas.getContext('2d');
const gameMatrix = [];
const matrixSize = [80, 80];


canvas.onclick = (e) => {
    const X = Math.floor(e.offsetX / 10);
    const Y = Math.floor(e.offsetY / 10);

    gameMatrix[X][Y] = 1;

    drawPixel(X * 10, Y * 10);
};

const drawPixel = (X, Y) => {
    canvasCtx.fillRect(X, Y, 10, 10);
};

const drawMatrix = () => {
    canvasCtx.clearRect(0, 0, matrixSize[0] * 10, matrixSize[0] * 10);
    for (let i = 0; i < matrixSize[0]; i++) {
        for (let j = 0; j < matrixSize[1]; j++) {
            if (gameMatrix[i][j] === 1) drawPixel(i * 10, j * 10);
        };
    };
};

const initializeGameMatrix = () => {
    for (let i = 0; i < matrixSize[0]; i++) {
        const innerMatrix = [];
        for (let j = 0; j < matrixSize[1]; j++) {
            innerMatrix[j] = 0;
        };
        gameMatrix[i] = innerMatrix;
    };
};

const prepareLife = () => {
    for (let i = 0; i < matrixSize[0]; i++) {
        for (let j = 0; j < matrixSize[1]; j++) {
            const coordinated = [i * 10, j * 10];
            let numberOfNeighbours = 0;

            if (gameMatrix[fpmVertical(i - 1)][j] === 1) numberOfNeighbours++;
            if (gameMatrix[fppVertical(i + 1)][j] === 1) numberOfNeighbours++;
            if (gameMatrix[i][fpmHorizontal(j - 1)] === 1) numberOfNeighbours++;
            if (gameMatrix[i][fppHorizontal(j + 1)] === 1) numberOfNeighbours++;
            if (gameMatrix[fpmVertical(i - 1)][fppHorizontal(j + 1)] === 1) numberOfNeighbours++;
            if (gameMatrix[fppVertical(i + 1)][fpmHorizontal(j - 1)] === 1) numberOfNeighbours++;
            if (gameMatrix[fppVertical(i + 1)][fppHorizontal(j + 1)] === 1) numberOfNeighbours++;
            if (gameMatrix[fpmVertical(i - 1)][fpmHorizontal(j - 1)] === 1) numberOfNeighbours++;

            if (gameMatrix[i][j] !== 1 && numberOfNeighbours === 3) {
                gameMatrix[i][j] = 1;
                continue;
            };
            if (gameMatrix[i][j] === 1 && (numberOfNeighbours < 2 || numberOfNeighbours > 3)) {
                gameMatrix[i][j] = 0;
            };
        };
    };
    drawMatrix();
    setTimeout(prepareLife, 300);
};

const fpmVertical = (num) => num < 0 ? matrixSize[0] - 1 : num;
const fpmHorizontal = (num) => num < 0 ? matrixSize[1] - 1 : num;
const fppVertical = (num) => num === matrixSize[0] ? 0 : num;
const fppHorizontal = (num) => num === matrixSize[1] ? 0 : num;

initializeGameMatrix();
document.getElementById('startLife').onclick = prepareLife;