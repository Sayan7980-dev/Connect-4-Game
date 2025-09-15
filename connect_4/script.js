let playerBlue = "B";
let playerYellow = "Y";
let currPlayer = playerBlue;
let gameOver = false;
let board;
let currColumns;
let rows = 6;
let columns = 7;

window.onload = function () {
  setGame();
  document.getElementById("restart").addEventListener("click", resetGame);
};

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  document.getElementById("board").innerHTML = "";
  document.getElementById("winner").innerText = "";
  document.getElementById("turn").innerText = "🔵 Blue’s Turn";
  currPlayer = playerBlue;
  gameOver = false;

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) return;

  let coords = this.id.split("-");
  let c = parseInt(coords[1]);
  let r = currColumns[c];

  if (r < 0) return;

  board[r][c] = currPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());

  if (currPlayer == playerBlue) {
    tile.classList.add("blue-piece");
    currPlayer = playerYellow;
    document.getElementById("turn").innerText = "🟡 Yellow’s Turn";
  } else {
    tile.classList.add("yellow-piece");
    currPlayer = playerBlue;
    document.getElementById("turn").innerText = "🔵 Blue’s Turn";
  }

  currColumns[c] = r - 1;

  checkWinner();
}

function checkWinner() {
  // Horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Vertical
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c] &&
          board[r + 1][c] == board[r + 2][c] &&
          board[r + 2][c] == board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Diagonal bottom-left to top-right
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r - 1][c + 1] &&
          board[r - 1][c + 1] == board[r - 2][c + 2] &&
          board[r - 2][c + 2] == board[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Diagonal top-left to bottom-right
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c + 1] &&
          board[r + 1][c + 1] == board[r + 2][c + 2] &&
          board[r + 2][c + 2] == board[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}
function setWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] == playerBlue) {
    winner.innerText = "🔵 Blue Wins!";
  } else {
    winner.innerText = "🟡 Yellow Wins!";
  }
  gameOver = true;
  document.getElementById("turn").innerText = "";
}

function resetGame() {
  setGame();
}
