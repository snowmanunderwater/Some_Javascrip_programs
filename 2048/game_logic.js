
new p5();

let BOARD_INIT = [[0,4,8,8],
                  [0,4,2,2],
                  [2,2,4,0],
                  [2,4,2,0]]


// Добавляет 2 или 4 на случайную клетку
function addNumber(board) {
  // console.table('addNumber');
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        options.push({x: i, y: j});
      }
    }
  }
  if (options.length > 0) {
    let spot = random(options);
    let r = random(1);
    board[spot.x][spot.y] = r > 0.5 ? 2 : 4;
  }
  return board
}

// Возвращает пустое поле
function blankBoard() {
  // console.table('blankBoard');
  return [[0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]]
}

// Сдвигает доску вправо
function compress(board) {
  // console.table('compress');
  for (let _ = 0; _ < 3; _++) { 
    for (let i = 0; i < 4; i++) {
      if (board[i] != 0 && board[i + 1] == 0) {
        board[i + 1] = board[i];
        board[i] = 0;
      }
    }
  }
  return board
}

// Объединяет одинаковые клетки
function merge(board) {
  // console.table('merge');
  for (let i = 0; i < 4; i++) {
    if (board[board.length-i] == board[board.length - (i+1)]) {
      board[board.length -i] *= 2;
      board[board.length - (i + 1)] = 0;
    }
  }
  return board
}

// Один шаг игры
function oneStep(board) {
  // console.table('oneStep');
  for (let i = 0; i < 4; i ++) {
    board[i] = compress(board[i]);
    board[i] = merge(board[i]);
    board[i] = compress(board[i]);
  }
  return board
}

// Поворачивает поле на 90' вправо
function flipBoard(board) {
  // console.table('flipBoard');
  let result = [];
  for (let i = 0; i < board[0].length; i++) {
    let row = board.map(e => e[i]).reverse();
    result.push(row);
  }
  return result
}


function toDown(board) {
  board = oneStep(board);
  return board
}


function toUp(board) {
  board = flipBoard(board);
  board = flipBoard(board);
  board = oneStep(board);
  board = flipBoard(board);
  board = flipBoard(board);
  return board
}



function toLeft(board) {
  board = flipBoard(board);
  board = oneStep(board);
  board = flipBoard(board);
  board = flipBoard(board);
  board = flipBoard(board);
  return board
}


function toRight(board) {
  board = flipBoard(board);
  board = flipBoard(board);
  board = flipBoard(board);
  board = oneStep(board);
  board = flipBoard(board);
  return board
}

function compare(a, b) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (a[i][j] !== b[i][j]) {
        return true;
      }
    }
  }
  return false;
}