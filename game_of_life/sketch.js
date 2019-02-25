let grid;
let cols;
let rows;
let resolution = 40;
let mouse_coord;


function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(400, 400);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2))
    }
  }
}

// -----------------------------------------
// ------------ GAME LOOP ------------------
// -----------------------------------------

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  if (keyCode === 83) {
    let next = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);
        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }
    grid = next;

  } else if (keyCode === 32) {
    background(40);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          fill(255);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
  }
}

// -----------------------------------------
// ------------ COUNT NEIGHBORS ------------
// -----------------------------------------

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

// -----------------------------------------
// ------------ MOUSE FUNCTIONS ------------
// -----------------------------------------

function getMouseCoord() {
  // Получает координаты курсора
  // Выдает в виде массива [mouseX, mouseY]
  var coords = [];
  coords.push(mouseX);
  coords.push(mouseY);
  return coords
}

function coordToTile(coords) {
  // Преобразует координаты мыши в координаты клетки
  // Выдает в виде массива [tileX, tileY]
  var X = coords[0];
  var Y = coords[1];
  var tile = []
  tile[0] = Math.floor(X / 40)
  tile[1] = Math.floor(Y / 40)
  return tile
}

function mousePressed() {
  mc = getMouseCoord();
  tileX = coordToTile(mc)[0];
  tileY = coordToTile(mc)[1];

  if (grid[tileX][tileY] == 1) {
    grid[tileX][tileY] = 0;
  } else if (grid[tileX][tileY] == 0) {
    grid[tileX][tileY] = 1
  }
}