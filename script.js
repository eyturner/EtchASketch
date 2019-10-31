createGrid = function(numRows) {
  let sketchDiv = document.querySelector('.sketchDiv');
  for (let i = 0; i < numRows; i++) {
    var row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < numRows; j++) {
      var cell = document.createElement('div');
      cell.className = 'cell';
      cell.style.backgroundColor = 'white';
      row.appendChild(cell);
    }
    sketchDiv.appendChild(row);
  }
  setCellSize(numRows);
}

setCellSize = function(numRows) {
  let cells = document.querySelectorAll('.cell');
  let row = document.querySelector('.row')
  let rowWidth = row.offsetWidth;
  var width = (rowWidth / numRows);
  var height = (555 / numRows);
  cells.forEach((cell) => {
    cell.style.height = height + 'px';
    cell.style.width = width + 'px';
  });
}

toggleFill = function(isRandom, cell) {
  if (!isRandom) {
    cell.style.backgroundColor = 'black';
  } else {
    randR = Math.floor(255 * Math.random())
    randG = Math.floor(255 * Math.random())
    randB = Math.floor(255 * Math.random())
    cell.style['background-color'] = 'rgb(' + randR + ',' + randG + ',' + randB + ')';
  }
}

reset = function() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.style.backgroundColor = 'white';
  });
}

destroyBoard = function() {
  let sketchDiv = document.querySelector('.sketchDiv');
  const rows = document.querySelectorAll('.row');
  rows.forEach((row) => {
    const cells = row.querySelectorAll('.cell');
    cells.forEach((cell) => {
      row.removeChild(cell);
    });
    sketchDiv.removeChild(row);
  });
}

addColoring = function(isRandom) {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('mouseover', (e) => {
      toggleFill(isRandom, cell);
    });
  });
}

changeSize = function(newSize) {
  destroyBoard();
  createGrid(newSize);
  addColoring(false);
}

main = function(size) {
  let numRows = size;
  cells = createGrid(numRows);
  addColoring(false);

  const btns = document.querySelectorAll('.btn');
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      classes = btn.classList
      if (classes.contains('colorRand')) {
        addColoring(true);
      } else if (classes.contains('colorBlack')) {
        addColoring(false);
      } else if (classes.contains('resetBtn')) {
        reset();
        addColoring(false);
      } else {
        var newSize = prompt("What size board would you like?")
        if (newSize != null) {
          changeSize(newSize);
        }
      }
    });
  });
}

main(20);
