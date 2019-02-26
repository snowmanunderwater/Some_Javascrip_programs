let grid;

function setup() {
  createCanvas(400, 400);
  grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  addNumber();
  addNumber();
  frameRate(10);
}

function addNumber() {
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        options.push({
          x: i,
          y: j
        });
      }
    }
  }
  if (options.length > 0);
  let spot = random(options);
  let r = random(1);
  grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;
}

function draw() {
  background(255);
  drawGrid()
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    toRight();
  } else if (keyCode === LEFT_ARROW) {
    toLeft();
  } else if (keyCode === UP_ARROW) {
    toUp();
  } else if (keyCode === DOWN_ARROW) {
    toDown();
  }
}


function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(i * w, j * w, w, w);

      let val = grid[i][j];
      if (grid[i][j] !== 0) {
        textAlign(CENTER, CENTER);
        textSize(64);
        fill(0);
        noStroke();
        text(val,
          i * w + w / 2,
          j * w + w / 2);
      }
    }
  }
}

function compress() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i + 1][j] === 0) {
        grid[i + 1][j] = grid[i][j];
        grid[i][j] = 0;
      }
    }
  }
}

function merge() {
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[grid.length - i][j] == grid[grid.length - (i + 1)][j]) {
        grid[grid.length - i][j] *= 2;
        grid[grid.length - (i + 1)][j] = 0;
      }
    }
  }
}

function flipArray() {
  let result = [];
  for (let i = 0; i < grid[0].length; i++) {
    let row = grid.map(e => e[i]).reverse();
    result.push(row);
  }
  grid = result;
}

function operate() {
  compress()
  merge()
  compress()
}

function toRight() {
  let new_grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      new_grid[i][j] = grid[i][j]
    }
  }


  operate();


  let same = false;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (new_grid[i][j] != grid[i][j]) {
        same = true;
      }
    }
  }

  if (same) {
    addNumber();
  }

}

function toLeft() {

  let new_grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      new_grid[i][j] = grid[i][j]
    }
  }


  flipArray();
  flipArray();
  operate()
  flipArray();
  flipArray();


  let same = false;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (new_grid[i][j] != grid[i][j]) {
        same = true;
      }
    }
  }

  if (same) {
    addNumber();
  }
}

function toDown() {

  let new_grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      new_grid[i][j] = grid[i][j]
    }
  }


  flipArray();
  operate()
  flipArray();
  flipArray();
  flipArray();

  let same = false;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (new_grid[i][j] != grid[i][j]) {
        same = true;
      }
    }
  }

  if (same) {
    addNumber();
  }
}

function toUp() {

  let new_grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      new_grid[i][j] = grid[i][j]
    }
  }

  flipArray();
  flipArray();
  flipArray();
  operate()
  flipArray();

  let same = false;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (new_grid[i][j] != grid[i][j]) {
        same = true;
      }
    }
  }

  if (same) {
    addNumber();
  }
}
