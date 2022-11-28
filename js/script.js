// Hizir Ozcelik
//file name: script.js -- This is main JS file for Word Search Puzzle app
//Date: Nov 10th, 2022

// contants for puzzle grid
const rowNumber = 15;
const columnNumber = 15;
const numberOfWord = 15;
go = {}; //global empty object for variables

// main entry point
document.addEventListener("DOMContentLoaded", () => {
  console.log("page is loaded");
  // event handlers
  let level = document.getElementById("level");
  level.selectedIndex = 0; //set default for first option
  go.difficultyLevel = level.value; // set deffault value for the puzzle
  level.addEventListener("change", () => selectionHandler(level.value));

  let create = document.getElementById("create");
  create.addEventListener("click", () => initializePuzzleGrid());
  
  URLs = [];
  URLs[1] = "static/1st_grade_vocabulary_words.json";
  URLs[2] = "static/2nd_grade_vocabulary_words.json";
  URLs[3] = "static/3rd_grade_vocabulary_words.json";
  URLs[4] = "static/4th_grade_vocabulary_words.json";
  URLs[5] = "static/5th_grade_vocabulary_words.json";

  for (let i = 1; i < 6; i++) {
    fetch(URLs[i])
      .then((response) => response.json())
      .then((json) => parseJson(json, i))
      .catch((error) => console.log(error.message));
  }
});

function parseJson(json, i) {
  if ((i == 1)) go.grade1 = json;
  if ((i == 2)) go.grade2 = json;
  if ((i == 3)) go.grade3 = json;
  if ((i == 4)) go.grade4 = json;
  if ((i == 5)) go.grade5 = json;

  console.log("JSON is loaded number of words on the list is " + json.length);
}

function toggleDiv() {
  let x = document.getElementById("myDIV");
  let buttonText = document.getElementById("buttonText");
  if (x.style.display === "block") {
      x.style.display = "none";
      buttonText.innerText="Show solution";
  } else {
      x.style.display = "block";
      buttonText.innerText="Hide solution"
  }
}

function checkAllPlace(grid, i, j, k, vocab) {
  if (grid[j][k] != "#") {
    if (grid[j][k] != vocab.charAt(i)) {
      return false;
    }
  }
  return true;
}
function isFit(grid, x, y, vector, vocab) {
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

function selectionHandler(val) {
  go.difficultyLevel = val;
  console.log(go.difficultyLevel);

}

function initializePuzzleGrid() {
  console.log(go.difficultyLevel);
  // Remember the json with user selection
  if ((go.difficultyLevel == "Grade-1")) go.json = go.grade1;
  if ((go.difficultyLevel == "Grade-2")) go.json = go.grade2;
  if ((go.difficultyLevel == "Grade-3")) go.json = go.grade3;
  if ((go.difficultyLevel == "Grade-4")) go.json = go.grade4;
  if ((go.difficultyLevel == "Grade-5")) go.json = go.grade5;

  // hide input area
  document.getElementById("id-user").style.display = "none";
  // display puzzle area
  document.getElementById("id-hide").style.display = "block";
  document.getElementById("btnHide").style.display = "block";

  document.getElementById("puzzleCreated").innerHTML =
    "Puzzle created with " +go.difficultyLevel + " words. Enjoy!";
  document.getElementById("footNote").innerHTML =
    "Your puzzle file saved on your default folder! You can print and solve it! Online play coming soon!";

  go.wordsSet = [];

  // select vocabularies for puzzle
  for (let i = 0; i < numberOfWord; i++) {
    let num = getRandomInt(go.json.length);
    if (go.json[num] != null) {
      go.wordsSet[i] = go.json[num].word.toUpperCase();
      go.json[num] = null;
    } else i--;
  }
  go.wordsSet.sort();
  console.log(go.wordsSet);
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

  // place words to the grid
  fillGridWithVocabularies(gridRow);

  // copies just values, not references!
  let solution = getCopyOfMatrix(gridRow);
  go.solutionGrid = solution;
  // replace '#' with random letters
  fillGridWithRandomLetters(gridRow);
  // display puzzle
  displayPuzzle(gridRow);
  textToFile(gridRow,go.wordsSet, go.solutionGrid,"puzzle.txt");
  displayWordList(go.wordsSet);
  displaySolution(go.solutionGrid);
}

// Generate a string from table
function textToFile(gridRow, wordsSet, solution, filename) {
  var text = "Enjoy the puzzle! \n\n";
  let k = 0;
  for (var i = 0; i < gridRow.length; i++) {
    for (var j = 0; j < gridRow[i].length; j++) {
      text += gridRow[i][j] + " ";
    }
    text += "\t" + wordsSet[k] + "\r";
    k++;
  }
  text += "\n\n Solution: \n\n";
  for (var i = 0; i < gridRow.length; i++) {
    for (var j = 0; j < gridRow[i].length; j++) {
      text += solution[i][j] + " ";
    }
    text += "\r";
  }
  text += "\n\nThank you for using the puzzle generator! \n";
  text += "Online play coming soon! \n";
  text += "Created by Hizir Ozcelik, Nov 2022 @Sheridon College \n";

  var blob = new Blob([text], { type: "text/plain" });
  var anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = window.URL.createObjectURL(blob);
  anchor.target = "_blank";
  anchor.style.display = "none"; // just to be safe!
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
} 


function fillGridWithRandomLetters(gridRow) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < rowNumber; i++) {
    for (let j = 0; j < columnNumber; j++) {
      if (gridRow[i][j] == "#") {
        gridRow[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }
}

function getCopyOfMatrix(mat) {
  return JSON.parse(JSON.stringify(mat));
}

function displayWordList(wordSet) {
  document.getElementById("wordList").innerHTML = "Word List";
  // creates a <table> element and a <tbody> element
  const wordsTbl = document.getElementById("wordsTable");
  const wordsTblBody = document.createElement("tbody");
  // creating all cells
  // creates a table row
  for (let j = 0; j < numberOfWord; j++) {
    const wordsRow = document.createElement("tr");
    // Create a <td> element and a text node, make the text
    // node the contents of the <td>, and put the <td> at
    // the end of the table row
    const wordsCell = document.createElement("td");
    const wordsCellText = document.createTextNode(`${wordSet[j]}`);
    wordsCell.appendChild(wordsCellText);
    wordsRow.appendChild(wordsCell);
    // add the row to the end of the table body
    wordsTblBody.appendChild(wordsRow);
  }
  // put the <tbody> in the <table>
  wordsTbl.appendChild(wordsTblBody);
}

function displayPuzzle(grid) {
  document.getElementById("puzzle-title").innerHTML = "Puzzle";
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
function displaySolution(grid) {
  document.getElementById("solution-title").innerHTML = "Solution";
  // creates a <table> element and a <tbody> element
  const tbl = document.getElementById("solutionTable");
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