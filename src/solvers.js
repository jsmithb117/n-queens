/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  var matrix = window.makeEmptyMatrix(n);
  var newBoard = new Board(matrix);
  var matrixInBoard = newBoard.rows();

  for ( var row = 0; row < n; row++) {
    for ( var col = 0; col < n; col++) {
      matrixInBoard[row][col] = 1;
      if (newBoard.hasAnyRooksConflicts()) {
        matrixInBoard[row][col] = 0;
        continue;
      }
    }
  }
  return matrixInBoard;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var matrix = window.makeEmptyMatrix(n);
  var newBoard = new Board(matrix);
  var matrixInBoard = newBoard.rows();
  var solutions = 0;
  var boards = [];
  var breaking = false;

  var generateSolutions = function(row) {
    if (row === n) {
      solutions++;
    } else {
      if (n % 2 === 0 && row === 0 && n > 2) {
        if (n === 2) {
          var m = n / 2 + 1;
        } else {
          var m = n / 2;
        }
      } else {
        var m = n;
      }
      for ( var col = 0; col < m; col++) {
        matrixInBoard[row][col] = 1;
        if (!newBoard.hasAnyRooksConflicts()) {
          generateSolutions(row + 1);
          if ( breaking === true ) { break; }
          matrixInBoard[row][col] = 0;
        } else {
          if ( n > 2 && n % 2 === 1) {
            if (matrixInBoard[0][Math.floor(n / 2)] === 1 && matrixInBoard[1][Math.floor(n / 2)] === 1) {
              solutions *= 2;
              breaking = true;
              break;
            }
          }
          matrixInBoard[row][col] = 0;
        }
      }
    }
    return;
  };
  generateSolutions(0);

  if (n % 2 === 0 && n > 2) {
    return solutions * 2;
  } else {
    return solutions;
  }
};

window.findNQueensSolution = function(n) {
  var matrix = window.makeEmptyMatrix(n);
  var newBoard = new Board(matrix);
  var matrixInBoard = newBoard.rows();
  var queens = 0;

  if (n === 0) { return []; }
  if (n === 1) { return [[1]]; }
  if (n === 2 || n === 3) {
    return matrixInBoard;
  }
  var generateSolutions = function(row) {
    if (queens === n && !newBoard.hasAnyQueensConflicts()) {
      return matrixInBoard;
    } else {
      for ( var col = 0; col < n; col++) {
        matrixInBoard[row][col] = 1;
        queens++;
        if (!newBoard.hasAnyQueensConflicts()) {
          generateSolutions(row + 1);
          if (queens === n) {
            return matrixInBoard;
          }
          matrixInBoard[row][col] = 0;
          queens--;
        } else {
          matrixInBoard[row][col] = 0;
          queens--;
        }
      }
    }
    return;
  };

  return generateSolutions(0);
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var matrix = window.makeEmptyMatrix(n);
  var newBoard = new Board(matrix);
  var matrixInBoard = newBoard.rows();
  var solutions = 0;
  var boards = [];

  var generateSolutions = function(row) {
    if (n === 0 || n === 1) {
      solutions += 1;
      return;
    }
    if ( row === n) {
      solutions++;
    } else {
      if (n % 2 === 0 && row === 0) {
        var m = n / 2;
      } else {
        var m = n;
      }
      for ( var col = 0; col < m; col++) {
        matrixInBoard[row][col] = 1;
        if (n % 2 === 1) {
          var first = matrixInBoard[0][Math.floor(n / 2)] === 1;
          var second = matrixInBoard[1][Math.floor(n / 2)] === 1;
          if (first && second) {
            solutions *= 2;
            return;
          }
        }
        if (!newBoard.hasAnyQueensConflicts()) {
          generateSolutions(row + 1);
          var first = matrixInBoard[0][Math.floor(n / 2)] === 1;
          var second = matrixInBoard[1][Math.floor(n / 2)] === 1;
          if (first && second) {
            return;
          }
          matrixInBoard[row][col] = 0;
        } else {
          matrixInBoard[row][col] = 0;
        }
      }
    }
    return;
  };
  generateSolutions(0);
  if (n % 2 === 0 && n !== 0) {
    return solutions * 2;
  } else {
    return solutions;
  }
};