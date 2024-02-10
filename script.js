const bigBox = document.getElementById("big-box");
const bottomBox = document.getElementById("bottom-box");

const board = new Array(9).fill(null).map(() => new Array(9).fill(null));
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];


// this function will create the sudoku box
(function () {
  for (let i = 0; i < 9; i++) {
    const box = document.createElement("div");
    box.classList.add("box");

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      const inputBox = document.createElement("input");
      inputBox.setAttribute("type", "number");
      inputBox.setAttribute("id", (9 * i + j + 1).toString());
      cell.appendChild(inputBox);
      box.appendChild(cell);
    }
    bigBox.appendChild(box);
  }
})();

// this function create the 9 buttons
(function createBottomLine() {
  for (let i = 1; i <= 9; i++) {
    const button = document.createElement("button");
    button.classList.add("cell", "bt-btn");
    button.setAttribute("id", "btn" + i);
    button.setAttribute("value", i.toString());
    button.innerText = i.toString();
    button.addEventListener("click", function (e) {});
    bottomBox.appendChild(button);
  }
})();

// this function can will create a 1 to 9 increasing array into a random non dublicate array
shuffleArray(nums);
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

//  this function will generate a sudoku by getting 1 null 2d array and 1 non-dublicate array
sudokuGenaratorAlgorithm();
function sudokuGenaratorAlgorithm() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (i == 0) {
        board[i][j] = nums[j];
      } else if (i % 3 == 0) {
        if (j < 8) {
          board[i][j] = board[i - 1][j + 1];
        } else {
          board[i][j] = board[i - 1][0];
        }
      } else {
        if (j < 6) {
          board[i][j] = board[i - 1][3 + j];
        } else {
          board[i][j] = board[i - 1][j - 6];
        }
      }
    }
  }
}


removeNumbers();

// this function will remove some element of the sudoku grid
function removeNumbers() {
  const numToRemove = 40;
  let removedCount = 0;
  while (removedCount < numToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (board[row][col] !== 0) {
      board[row][col] = 0;
      removedCount++;
    }
  }
}

// filling sudoku grid in page
sudokuGridFilling();
function sudokuGridFilling() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const particularCell = document.getElementById((9 * i + j + 1).toString()
      );
      if (board[i][j] != 0) {
        particularCell.setAttribute("value", board[i][j]);
        particularCell.setAttribute("readOnly", "true");
      }
       
    }
  }
}



function generateNewSudoku(){
  location.reload();

}
