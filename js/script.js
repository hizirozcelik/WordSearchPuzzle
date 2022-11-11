// Hizir Ozcelik
//file name: script.js -- This is main JS file for Word Search Puzzle app
//Date: Nov 10th, 2022

// contsnts for puzzle grid
const rowNumber = 15;
const columnNumber = 15;
const numberOfWord = 15;
go = {};
// main entry point
document.addEventListener("DOMContentLoaded", () => {
  log("page is loaded");

  // event handlers
  let level = document.getElementById("level");
  level.addEventListener("change", () => selectionHandler(level));

  let create = document.getElementById("create");
  create.addEventListener("click", () => createPuzzle());
  log(level);
  fetch("static/1st_grade_vocabulary_words.json")
    .then((response) => response.json())
    .then((json) => parseJson(json))
    .catch((error) => log(error.message));

  // fetch("static/2nd_grade_vocabulary_words.json")
  //   .then((response) => response.json())
  //   .then((data) => parseJson(data))
  //   .catch((error) => log(error.message));

  // fetch("static/3rd_grade_vocabulary_words.json")
  // fetch("static/4th_grade_vocabulary_words.json")
  // fetch("static/5th_grade_vocabulary_words.json")
});

function parseJson(json) {
  log("JSON is loaded" + json.length);
  // 1. remember the original JSON
  let vocab = { wordVocab: "", isSelected: false };
  go.json = json;
  go.wordsSet = [];
  // select vocabularies for puzzle
  for (let i = 0; i < numberOfWord; i++) {
    let num = getRandomInt(go.json.length);
    log(num);
    if (go.json[num] != null) {
      go.wordsSet[i] = go.json[num].word.toUpperCase();
      go.json[num] = null;
    } else i--;
  }
  go.wordsSet.sort();
  log(go.wordsSet);
  // generate grid 2D array
  let gridRow = [];
  for (i = 0; i < rowNumber; i++) {
    gridRow.push([
      "#",
      "#",
      "#",
      "#",
      "#",
      "#",
      "#",
      "#",
      "#",
      "#",
      "#",
      "#",
      "#",
      "#",
      "#",
    ]);
  }
  log(gridRow[0][0]);

  // place words to the grid
  fillGridWithVocabularies(gridRow);
  // display puzzle
  createPuzzle(gridRow);
}

function checkAllPlace(grid, i, j, k, vocab) {
  log("checkAllPlace called");
  if (grid[j][k] != "#") {
    if (grid[j][k] != vocab.charAt(i)) {
      return false;
    }
  }
  return true;
}
function isFit(grid, x, y, vector, vocab) {
  log("isFit called");
  isCompleted = true;
  switch (vector) {
    case 0:
      if (x - vocab.length >= 0) {
        for (i = 0, j = x, k = y; i < vocab.length; i++, j--) {
          isCompleted = checkAllPlace(grid, i, j, k, vocab);
          if (!isCompleted) break;
        }
      } else return false;
      return isCompleted;
    case 1:
      if (x - vocab.length >= 0 && y + vocab.length < columnNumber) {
        for (i = 0, j = x, k = y; i < vocab.length; i++, j--, k++) {
          isCompleted = checkAllPlace(grid, i, j, k, vocab);
          if (!isCompleted) break;
        }
      } else return false;
      return isCompleted;

    case 2:
      if (columnNumber > y + vocab.length) {
        for (i = 0, j = x, k = y; i < vocab.length; i++, k++) {
          isCompleted = checkAllPlace(grid, i, j, k, vocab);
          if (!isCompleted) break;
        }
      } else return false;
      return isCompleted;
    case 3:
      if (rowNumber > x + vocab.length && y + vocab.length < columnNumber) {
        for (i = 0, j = x, k = y; i < vocab.length; i++, j++, k++) {
          isCompleted = checkAllPlace(grid, i, j, k, vocab);
          if (!isCompleted) break;
        }
      } else return false;
      return isCompleted;
    case 4:
      if (rowNumber > x + vocab.length) {
        for (i = 0, j = x, k = y; i < vocab.length; i++, j++) {
          isCompleted = checkAllPlace(grid, i, j, k, vocab);
          if (!isCompleted) break;
        }
      } else return false;
      return isCompleted;
    case 5:
      if (rowNumber > x + vocab.length && y - vocab.length >= 0) {
        for (i = 0, j = x, k = y; i < vocab.length; i++, j++, k--) {
          isCompleted = checkAllPlace(grid, i, j, k, vocab);
          if (!isCompleted) break;
        }
      } else return false;
      return isCompleted;
    case 6:
      if (y - vocab.length >= 0) {
        for (i = 0, j = x, k = y; i < vocab.length; i++, k--) {
          isCompleted = checkAllPlace(grid, i, j, k, vocab);
          if (!isCompleted) break;
        }
      } else return false;
      return isCompleted;
    case 7:
      if (x - vocab.length >= 0 && y - vocab.length >= 0) {
        for (i = 0, j = x, k = y; i < vocab.length; i++, j--, k--) {
          isCompleted = checkAllPlace(grid, i, j, k, vocab);
          if (!isCompleted) break;
        }
      } else return false;
      return isCompleted;
    default:
      return false;
  }
}

function placeWordToGrid(grid, x, y, vector, vocab) {
  log("place word to grid called");
  switch (vector) {
    case 0:
      for (i = 0, j = x, k = y; i < vocab.length; i++, j--) {
        grid[j][k] = vocab.charAt(i);
      }
      break;
    case 1:
      for (i = 0, j = x, k = y; i < vocab.length; i++, j--, k++) {
        grid[j][k] = vocab.charAt(i);
      }
      break;
    case 2:
      for (i = 0, j = x, k = y; i < vocab.length; i++, k++) {
        grid[j][k] = vocab.charAt(i);
      }
      break;
    case 3:
      for (i = 0, j = x, k = y; i < vocab.length; i++, j++, k++) {
        grid[j][k] = vocab.charAt(i);
      }
      break;
    case 4:
      for (i = 0, j = x, k = y; i < vocab.length; i++, j++) {
        grid[j][k] = vocab.charAt(i);
      }
      break;
    case 5:
      for (i = 0, j = x, k = y; i < vocab.length; i++, j++, k--) {
        grid[j][k] = vocab.charAt(i);
      }
      break;
    case 6:
      for (i = 0, j = x, k = y; i < vocab.length; i++, k--) {
        grid[j][k] = vocab.charAt(i);
      }
      break;
    case 7:
      for (i = 0, j = x, k = y; i < vocab.length; i++, j--, k--) {
        grid[j][k] = vocab.charAt(i);
      }
      break;
  }
}
// fill the grid with vocabularies
function fillGridWithVocabularies(grid) {
  log("fill grid with vocab called");
  let x = 0,
    y = 0;
  isPlaced = false;

  for (let dex = 0; dex < go.wordsSet.length; dex++) {
    while (!isPlaced) {
      x = getRandomInt(rowNumber);
      y = getRandomInt(columnNumber);
      let vector = getRandomInt(7);

      if (
        isFit(grid, x, y, vector, go.wordsSet[dex], rowNumber, columnNumber)
      ) {
        placeWordToGrid(grid, x, y, vector, go.wordsSet[dex]);
        isPlaced = true;
      }
    }
    isPlaced = false;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function urlHandler(e) {}

function selectionHandler(e) {
  go.difficultyLevel = e.value;
  log(go.difficultyLevel);
}

function createPuzzle(grid) {
  log("create function called level is ");
  // hide input area
  document.getElementById("input-div").style.display = "none";
  document.getElementById("message").innerHTML = "Here your puzzle. Enjoy!";

  // creates a <table> element and a <tbody> element
  const tbl = document.getElementById("puzzleTable");
  const tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < rowNumber; i++) {
    // creates a table row
    const row = document.createElement("tr");

    for (let j = 0; j < columnNumber; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement("td");
      const cellText = document.createTextNode(`${grid[i][j]}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
}
