const generateEmptyBoard = () => {
    let board = new Array(n);
    for (let i = 0; i < n; i++) board[i] = new Array(n).fill(0);
    return board;
};

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

const randomRestart = () => {
    board.forEach(item => (item[random(0, n)] = 1));
};

const conflicts = (x, y) => {
    let count = 0;
    const inc = value => (count += value);
    let i, j;
    // Up
    i = x;
    j = y;
    while (--i >= 0) inc(board[i][j]);

    // Down
    i = x;
    j = y;
    while (++i < n) inc(board[i][j]);

    // Diagonals
    // Top Left
    i = x;
    j = y;
    while (--i >= 0 && --j >= 0) inc(board[i][j]);
    // Top Right
    i = x;
    j = y;
    while (--i >= 0 && ++j < n) inc(board[i][j]);
    // Bottom Left
    i = x;
    j = y;
    while (++i < n && --j >= 0) inc(board[i][j]);
    // Bottom Right
    i = x;
    j = y;
    while (++i < n && ++j < n) inc(board[i][j]);
    return count;
};

const generateTotalConflicts = () => {
    let totalConflicts = 0;
    board.forEach((item, indexA) => {
        for (let indexB = 0; indexB < n; indexB++) {
            if (item[indexB]) totalConflicts += conflicts(indexA, indexB);
        }
    });
    return totalConflicts / 2;
};

const hillClimbing = () => {
    let totalConflicts = generateTotalConflicts();
    // console.log(totalConflicts);
    // console.log(board);
    let count = 0;
    while (totalConflicts != 0 && count <= 10) {
        board.forEach((item, indexA) => {
            let values = [];
            for (let indexB = 0; indexB < n; indexB++) {
                if (item[indexB]) board[indexA][indexB] = 0;
                values.push(conflicts(indexA, indexB));
            }
            const minConflictIndex = values.indexOf(Math.min(...values));
            board[indexA][minConflictIndex] = 1;
        });
        totalConflicts = generateTotalConflicts();
        // console.log(totalConflicts);
        // console.log(board);
        count++;
    }
    console.log({ totalConflicts, count });
    console.log(board);
};

// ----------
const n = 8;
let board = generateEmptyBoard();

const init = () => {
    console.log('Init');
    randomRestart();
    hillClimbing();
};
init();
