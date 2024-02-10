const bigBox = document.getElementById("big-box");
const bottomBox = document.getElementById("bottom-box");


// this function will create the sudoku box
(function(){
    for(let i = 1; i <= 9; i++){
        const box = document.createElement("div");
        box.classList.add("box");

        for( let j = 1; j <= 9; j++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            const inputBox = document.createElement("input");
            inputBox.setAttribute("type","number");
            box.appendChild(cell)
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

