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
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrixInBoard));
  return matrixInBoard;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var matrix = window.makeEmptyMatrix(n);
  var newBoard = new Board(matrix);
  var matrixInBoard = newBoard.rows();
  var solutions = 0;
  var boards = [];
  //function
  var generateSolutions = function(row) {

    if ( row === n) {
      solutions++;
    } else {
      for ( var col = 0; col < n; col++) {
        matrixInBoard[row][col] = 1;
        if (!newBoard.hasAnyRooksConflicts()) {
          generateSolutions(row + 1);
          matrixInBoard[row][col] = 0;
        } else {
          matrixInBoard[row][col] = 0;
        }
      }
    }
    return;
  };
  console.log('Number of solutions for ' + n + ' rooks:', solutions);
  generateSolutions(0);
  return solutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {


  var matrix = window.makeEmptyMatrix(n);
  var newBoard = new Board(matrix);
  var matrixInBoard = newBoard.rows();

  var queens = 0;

  if (n === 0) { return []; }
  if (n === 1) { return [[1]]; }
  if (n === 2 || n === 3) {
    // debugger;
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
  // console.log('Number of solutions for ' + n + ' queens:', solutions);
  generateSolutions(0);
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
    if ( row === n) {
      solutions++;
    } else {
      for ( var col = 0; col < n; col++) {
        matrixInBoard[row][col] = 1;
        if (!newBoard.hasAnyQueensConflicts()) {
          generateSolutions(row + 1);
          matrixInBoard[row][col] = 0;
        } else {
          matrixInBoard[row][col] = 0;
        }
      }
    }
    return;
  };
  console.log('Number of solutions for ' + n + ' queens:', solutions);
  generateSolutions(0);
  return solutions;
};