/** @format */

var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
  setGame();
};

function setGame() {
  // 既存のタイルをクリア
  let boardElement = document.getElementById("board");
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }

  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      boardElement.append(tile);
    }
  }
  // ゲームを始めるために2つのタイルを設定
  setTwo();
  setTwo();
}

function updateTile(tile, num) {
  tile.innerHTML = ""; // タイルの中身をクリア
  tile.classList.value = "tile"; // タイルの基本クラスを設定

  if (num > 0) {
    tile.classList.add(`x${num}`); // タイルに数値に応じたクラスを追加
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZero(row);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
      i++; // 新しいタイルがすでに結合したタイルには進化しないため
    }
  }
  row = filterZero(row);
  while (row.length < columns) {
    row.push(0);
  }
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    board[r] = row.reverse();
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function setTwo() {
  // 空き位置を検索する
  let emptyTiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) {
        emptyTiles.push({ r, c });
      }
    }
  }

  if (emptyTiles.length > 0) {
    // 空き位置からランダムに1つ選択する
    let randomPos = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    let r = randomPos.r;
    let c = randomPos.c;

    // 選択した位置に新しいタイルを設置する
    board[r][c] = getRandomNum(); // 新しいタイルの値（2または4）
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    updateTile(tile, board[r][c]);
  }
}

function getRandomNum() {
  // 2または4をランダムに返す
  return Math.random() > 0.5 ? 2 : 4;
}

function hasEmptyTile() {
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}
document.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    // 現在のURLのパスを取得
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf("/") + 1);

    // 現在のページに基づいてリダイレクト先を決定
    if (currentPage === "index.html") {
      window.location.href = "index1.html";
    } else if (currentPage === "index1.html") {
      window.location.href = "index.html";
    }
  }
});

function alertButton() {
  score = 0; // スコアをリセット
  document.getElementById("score").innerText = score; // スコア表示を更新
  setGame();
}
