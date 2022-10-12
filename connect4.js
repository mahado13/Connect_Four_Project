//Author: Mahad Osman
//Exercise: Connect four project
//Date: Oct 12, 2022
//Reference: Springboard Connect Four solution for findSpotCol(x) & how to handle a tie

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //board =([HEIGHT][WIDTH]); 

  //Building an Array while y is less than height we push in columns while y != height
  for (let y = 0; y < HEIGHT; y++){
    board.push(Array.from({size: WIDTH}));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector("#board"); //selecting for the html elemnt with board

  // TODO: add comment for this code
  /*The following two blocks are to create and appened the column header to the top of game board
  We initally create the top row, set an ID attribute and than add our event listener to the entire row
  Once the following has been created and set we loop over the width of the cell and set individual td's with an ID of x
  Once the td's are create they are then appened to the top row as header cells than the entire top row is appened to the parent board element
  */

  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  /*
  Similar to te above this is howthe rest of the board is set and created with a nested loop. 
  With the the nest for loop the intial for creates a row for every tr (y element) until we reach our boards height
  The nested loop will create a cell or td (x element) until we reach our boards width. 
  Inside the td loop we also assign each cell a id with the height and width that cell is located at before appending it
  We than append each td to it's approriate row and than appened it to the entire board.
  */
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //Referenced solutions as I kept returning null Y instead of an actual value
  for(let y = HEIGHT -1; y >= 0; y--){
    if(!board[y][x]){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
let piece = document.createElement('div');
piece.classList.add('piece');
piece.classList.add(`player${currPlayer}`);

piece.style.top = -50 * (y+2); //referenced from the solution

//To find placement we use similarly get the cell just like line 56
const placement = document.getElementById(`${y}-${x}`);
console.log(placement)
//Once found we place it into the parent element
placement.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  //A simple alret with whatever is passed in to the function will alert whenever the function is called
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  console.log(x)

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  console.log(y)
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board

  //Place the piece into the proper cell
  placeInTable(y, x);
  board[y][x] = currPlayer; //also setting the piece to the currPlayer to keep track of which pieces belong to who.

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  //We will need to check if every row & and every cell is full, if it is indeed full than return end game with a msg for tie
  //Referenced the solution 
  if(board.every((row) => row.every((cell) => cell))){
    return endGame('It was a tie!');  
  }

// if (board.every((row)=>{
//   row.every((cell)=>{
//     cell
//   })
//   return endGame('it was a tie!')
// }))


  // switch players
  // TODO: switch currPlayer 1 <-> 2

  //If current player is equal to 1 than switch to 2 else switch to 1
  currPlayer = currPlayer === 1?  2:1; //Ternary operator version

  //If else version
  // if(currPlayer === 1){
  //   currPlayer = 2;
  // }else{
  //   currPlayer = 1;
  // }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  /*
    the following code is how we check if the win condition has been met.
    We have two loops with one nested to run a constant check against the cells. 
    We have setup four win conditions based on each access and have set them as arrays.
    For the horziontal win condition if we have four x's that are right next to each other than that win condition is returned true
    For the Vertical win condition if we have four y's that are right next to each other than that win condition is returned true
    For Diagonal right win condition we are checking if we have a match y + x going to the right or in the case of array's increasing in values and if so we return true
    For Diagonal left win condition we are checking if we have a match y + x going to the left or in the case of array's decreasing in values and if so we return true

  */

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
