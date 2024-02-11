const bigBox = document.getElementById("big-box");
const bottomBox = document.getElementById("bottom-box");
const congratulation = document.getElementById("congra");

const board = new Array(9).fill(null).map(() => new Array(9).fill(null));
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// this variable will track the current selected input field
let select_box = null;
// this variable will track the last selected input field
let lastSelect = null;
//this will track the existed value that you want to put again and it violate the rules of sudoku 
let findExistedValue = null;

// this variable will control if user can input value or not 
let makeInput = true;
// this variable decide that how many blank space shoud provide the user
let numToRemove = 40;

// this function will create the sudoku box 
// the most complex part is this 
// i arange the id like this so it can be easily find the row and column
(function () {
  let bigGirdpasser = 0;
  for (let i = 0; i < 9; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
     bigGirdpasser = i % 3 == 0 && i != 0 ? bigGirdpasser + 1 : bigGirdpasser;
     let smallGridPasser = 0;
     let fakeArray = [null, null, null];
    for (let j = 0; j < 9; j++) {
       smallGridPasser =
         j % 3 == 0 && j != 0 ? smallGridPasser + 1 : smallGridPasser;
       let id = null;
       if (fakeArray[j % 3] == null) {
         id = 3 * (i % 3) + j + 1 + bigGirdpasser * 27;
         fakeArray[j % 3] = id;
         console.log(id);
       } else {
         let v = fakeArray[j % 3] + 9;
          id = v;
         fakeArray[j % 3] = v;
         console.log(id);
       }
      const cell = document.createElement("div");
      cell.classList.add("cell");
      const inputBox = document.createElement("input");
      inputBox.setAttribute("type", "number");
      inputBox.setAttribute("inputmode", "none");
      inputBox.setAttribute("id", id.toString());
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
      const particularCell = document.getElementById(
        (9 * i + j + 1).toString()
      );
      if (board[i][j] != 0) {
        particularCell.setAttribute("value", board[i][j]);
        particularCell.setAttribute("readOnly", "true");
      } else {
        particularCell.addEventListener("click", selectInput);
      }
    }
  }
}

// this function will make backround color of selected field green by adding class select
function selectInput() {
  
  if(makeInput){
    if (select_box == null) {
      document.getElementById(this.id).classList.add("select");
      select_box = this;
    } else {
      document.getElementById(select_box.id).classList.remove("select");
      document.getElementById(this.id).classList.add("select");
      select_box = this;
    }
  }
  
}

for (let i = 1; i < 10; i++) {

      document
        .getElementById("btn" + i.toString())
        .addEventListener("click", () => {
          if (select_box != null && makeInput) {
            let x = document.getElementById("btn" + i.toString()).value;
            document.getElementById(select_box.id).value = parseInt(x);
            // here is the checkVal function call that will check that user input value is valid or not 
            checkVal();
          }
        });
  
  
}
// here is the checkVal function call that will check that user input value is valid or not 
function checkVal() {
   let id_val = parseInt(select_box.id) - 1;
   let row = Math.floor(id_val / 9);
   let col = id_val % 9;
   let num = select_box.value;

   let bol = isValid(board, row, col, num); // by the help of this isValid function it will check

   if (bol == false) {
     document.getElementById(select_box.id).classList.add("wrong");
     lastSelect = select_box.id;
     makeInput = false;

   } else {
     numToRemove--;
     board[row][col] = num;
     document.getElementById(select_box.id).value = num;
     if(numToRemove == 0){
      setTimeout(function(){
        congratulation.classList.toggle("congratulation");
        setTimeout(function () {
          congratulation.classList.toggle("congratulation");
          generateNewSudoku();
        }, 1500);
      },1000)
      
     }
     
   }
}

// this is a helper function that will help user to check that inputed value is valid or not 
function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] == num) {
      let val = row * 9 + i + 1;
      findExistedValue = document.getElementById(val.toString());
      findExistedValue.classList.add("wrong");
      return false;
    }
    if (board[i][col] == num) {
      let val = i * 9 + col + 1;
      findExistedValue = document.getElementById(val.toString());
      findExistedValue.classList.add("wrong");
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] == num) {
        let val = i * 9 + j + 1;
        findExistedValue = document.getElementById(val.toString());
        findExistedValue.classList.add("wrong");
        return false;
      }
    }
  }

  return true;
}

// this function will make the sudoku in previous state 
function undo() {
  if(findExistedValue != null){
    document.getElementById(lastSelect).value = null;
    select_box.classList.remove("wrong");
    console.log(findExistedValue);
    findExistedValue.classList.remove("wrong");
    select_box.value = null;
    makeInput = true;
  }
  
}

// this function will generate new sudoku by simply reload the page 
function generateNewSudoku() {
  location.reload();
}








