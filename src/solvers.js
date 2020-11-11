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
      if (newBoard.hasAnyRowConflicts() || newBoard.hasAnyColConflicts()) {
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

  var addNextOne = function(matrix) {
    //base case is: matrix reduces to n
    // var nCount = 0;
    // for (let i = 0; i < matrix.length; i++) {
    //   nCount += matrix[i].reduce((a, c) => a + c);
    // }]
    var nCount = 0;
    for ( var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        nCount += matrix[row][col];
      }
    }
    // var nCount = matrix.reduce( (a, row) => {
    //   return row.reduce( (a, c) => a + c );
    // } );
    console.log('nCount = ', nCount);

    if (nCount === n) {
      //increment solutionCount
      solutions++;
    } else {

      // if ()
      //iterate rows
      for ( var row = 0; row < n; row++) {
        //if a row reduces to zero
        if (matrix[row].reduce((a, c ) => a + c ) === 0 ) {
          //iterate column
          for ( var col = 0; col < n; col++) {

            matrix[row][col] = 1;
            //if no conflicts,
            if ( !newBoard.hasAnyRowConflicts() && !newBoard.hasAnyColConflicts() ) {
              //return solutions += addNextOne(matrix)
              return solutions += addNextOne(matrix);
            } else if (row === n && col === n ) {
              return 0;
            } else {
              matrix[row][col] = 0;
            }
          }
        }// else, shift the 1 one place to the right and recurse.
        // something = 0;
        //
        return solutions += addNextOne(matrix);
      }
    }
    return solutions;
  };
  if (n === 2) {
    // debugger;
  }
  addNextOne(matrix);
  console.log('Number of solutions for ' + n + ' rooks:', solutions);
  return solutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



//[ [0,0]
//  [0,0]
//]

//[ [1,0]
//  [0,1]
//]

//[ [0,1]
//  [1,0]
//]

