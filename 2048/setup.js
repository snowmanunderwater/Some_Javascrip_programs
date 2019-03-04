let colorsSizes = {
  "2": {
    size: 64,
    color: "#f7f7f7" 
  },
  "4": {
    size: 64,
    color: "#dfe3ee"
  },
  "8": {
    size: 64,
    color: "#8b9dc3"
  },
  "16": {
    size: 64,
    color: "#3b5998"
  },
  "32": {
    size: 64,
    color: "#338984"
  },
  "64": {
    size: 64,
    color: "#fbae00"
  },
  "128": {
    size: 48,
    color: "#da5353"
  },
  "256": {
    size: 48,
    color: "#586d87"
  },
  "512": {
    size: 48,
    color: "#484772"
  },
  "1024": {
    size: 32,
    color: "#ee8166"
  },
  "2048": {
    size: 32,
    color: "#A659A9"
  },
}





let board;
let board_new;

function setup() {
  createCanvas(400, 400);
  noStroke();
  background(51, 0, 0);


  board = blankBoard();
  board_new = blankBoard();

  board = addNumber(board);
  board = addNumber(board);

}

function draw() {
  background(210);
  drawGrid(board);
}

function keyPressed() {

  board_new = board

  switch (keyCode) {
    case RIGHT_ARROW:
      board = toRight(board);
      break;
    case DOWN_ARROW:
      board = toDown(board);
      break;
    case UP_ARROW:
      board = toUp(board);
      break;
    case LEFT_ARROW:
      board = toLeft(board);
      break;
  }
  if (compare(board, board_new)) {
    board = addNumber(board);
  }
}


function drawGrid(board) {
  let inside = color(204, 102, 0);
  let middle = color(204, 153, 0);
  let outside = color(153, 51, 0);
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      let val = board[i][j];
      
      if (val != 0) {
        fill(colorsSizes[val].color);
      } else {
        noFill();
      }
      
      
      rect(i * w, j * w, w, w);
      if (val !== 0) {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textSize(colorsSizes[val].size);
        text(val, i * w + w / 2, j * w + w / 2);
      }

    }
  }
}
