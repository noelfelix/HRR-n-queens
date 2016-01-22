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
  var board = [];
  var colIndex = [];
  for(var i = 0; i < n; i++) {
    colIndex.push(i);
  }
  for(var i = 0; i < n; i++) {
    var index = colIndex.splice(Math.floor(Math.random() * colIndex.length),1)[0];
    board[i] = [];
    for(var j = 0; j < n; j++) {
      if(j === index) {
        board[i][j] = 1;
      } else {
        board[i][j] = 0;
      }
    }
  }
  var solution = board; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = n; //fixme
  for(var i = n - 1; i > 0; i--){
    solutionCount *= i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var initBoard = function(n){
    var board = [];
    
    for(var i = 0; i < n; i ++){
      var row = []
      for(var j = 0; j < n; j++){
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  var copyBoardState = function(from){
    var copy = [];
    for(var i = 0; i < from.length; i++){
      copy[i] = [];
      for(var j = 0; j < from[i].length; j++){
        copy[i][j] = from[i][j];
      }
    }
    return copy;
  }

  var replaceWithZeros = function(board){
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board[i].length; j++){
        if(board[i][j] === -1){
          board[i][j] = 0;
        }
      }
    }
    return board;  
  }

  var buildBoard = function(boardState, lastBoardStates, currentRow){
    currentRow = currentRow || 0;
    lastBoardStates = lastBoardStates || [];
    if(currentRow >= n){
      return boardState;
    }
    var currentColumn;

    var placed = false;
    for(var i = 0; i < n; i++){
      if(!placed && boardState[currentRow][i] === 0){
        currentColumn = i;
        boardState[currentRow][currentColumn] = 1;
        lastBoardStates.push([copyBoardState(boardState), [currentRow, i]]);
        placed = true;
      } else {
        boardState[currentRow][i] = -1;
      }
    }

    for(var i = currentRow + 1; i < n; i++){
      boardState[i][currentColumn] = -1;
    }

    for(var i = 1; (currentRow + i) < n; i++){
      if(currentColumn - i > -1){
        boardState[currentRow + i][currentColumn - i] = -1;
      }
      if(currentColumn + i < n){
        boardState[currentRow + i][currentColumn + i] = -1;
      }
    }

    var faultyRow = true;
    for(var i = 0; faultyRow && i < n; i++){
      if(boardState[currentRow][i] !== -1){
        faultyRow = false;
      }
    }
    if(faultyRow){
      if(!lastBoardStates.length){
        return initBoard(n);
      }
      var revert = lastBoardStates.pop();
      revert[0][revert[1][0]][revert[1][1]] = -1;
      return buildBoard(revert[0], lastBoardStates, currentRow - 1);
    }

    return buildBoard(boardState, lastBoardStates, currentRow + 1);
  }

  solution = buildBoard(initBoard(n)) || [];

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return replaceWithZeros(solution);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  solutionCount = 0;
  var solutions = {};

  var initBoard = function(n){
    var board = [];
    
    for(var i = 0; i < n; i ++){
      var row = []
      for(var j = 0; j < n; j++){
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  var copyBoardState = function(from){
    var copy = [];
    for(var i = 0; i < from.length; i++){
      copy[i] = [];
      for(var j = 0; j < from[i].length; j++){
        copy[i][j] = from[i][j];
      }
    }
    return copy;
  }

  var replaceWithZeros = function(board){
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board[i].length; j++){
        if(board[i][j] === -1){
          board[i][j] = 0;
        }
      }
    }
    return board;  
  }

  var buildAllBoards = function(boardState, lastBoardStates, currentRow){
    currentRow = currentRow || 0;
    lastBoardStates = lastBoardStates || [];
    if(currentRow >= n){
      solutionCount++;
      if(lastBoardStates.length){
        var revert = lastBoardStates.pop();
        revert[0][revert[1][0]][revert[1][1]] = -1;
        return buildAllBoards(revert[0], lastBoardStates, currentRow - 1);
      }
    }
    var currentColumn;

    var placed = false;
    for(var i = 0; i < n; i++){
      if(!placed && boardState[currentRow][i] === 0){
        currentColumn = i;
        boardState[currentRow][currentColumn] = 1;
        lastBoardStates.push([copyBoardState(boardState), [currentRow, i]]);
        placed = true;
      } else {
        boardState[currentRow][i] = -1;
      }
    }

    for(var i = currentRow + 1; i < n; i++){
      boardState[i][currentColumn] = -1;
    }

    for(var i = 1; (currentRow + i) < n; i++){
      if(currentColumn - i > -1){
        boardState[currentRow + i][currentColumn - i] = -1;
      }
      if(currentColumn + i < n){
        boardState[currentRow + i][currentColumn + i] = -1;
      }
    }

    var faultyRow = true;
    for(var i = 0; faultyRow && i < n; i++){
      if(boardState[currentRow][i] !== -1){
        faultyRow = false;
      }
    }
    if(faultyRow){
      if(!lastBoardStates.length){
          return solutions;
      }
      var revert = lastBoardStates.pop();
      revert[0][revert[1][0]][revert[1][1]] = -1;
      return buildAllBoards(revert[0], lastBoardStates, currentRow - 1);
    }

    return buildAllBoards(boardState, lastBoardStates, currentRow + 1);
  }

  buildAllBoards(initBoard(n));
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var getNQueensBoards = function(n) {
  var solutions = {};

  var initBoard = function(n){
    var board = [];
    
    for(var i = 0; i < n; i ++){
      var row = []
      for(var j = 0; j < n; j++){
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  var copyBoardState = function(from){
    var copy = [];
    for(var i = 0; i < from.length; i++){
      copy[i] = [];
      for(var j = 0; j < from[i].length; j++){
        copy[i][j] = from[i][j];
      }
    }
    return copy;
  }

  var replaceWithZeros = function(board){
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board[i].length; j++){
        if(board[i][j] === -1){
          board[i][j] = 0;
        }
      }
    }
    return board;  
  }

  var boardToKey = function(board){
    var key = "";
    if(board.length === 1){
      return key + 1;
    }
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board[i].length; j++){
        key += board[i][j];
      }
    }
    return key;
  }

  var buildAllBoards = function(boardState, lastBoardStates, currentRow){
    currentRow = currentRow || 0;
    lastBoardStates = lastBoardStates || [];
    if(currentRow >= n){
      solutions[boardToKey(replaceWithZeros(boardState))] = boardState;
      if(lastBoardStates.length){
        var revert = lastBoardStates.pop();
        revert[0][revert[1][0]][revert[1][1]] = -1;
        return buildAllBoards(revert[0], lastBoardStates, currentRow - 1);
      }
    }
    var currentColumn;

    var placed = false;
    for(var i = 0; i < n; i++){
      if(!placed && boardState[currentRow][i] === 0){
        currentColumn = i;
        boardState[currentRow][currentColumn] = 1;
        lastBoardStates.push([copyBoardState(boardState), [currentRow, i]]);
        placed = true;
      } else {
        boardState[currentRow][i] = -1;
      }
    }

    for(var i = currentRow + 1; i < n; i++){
      boardState[i][currentColumn] = -1;
    }

    for(var i = 1; (currentRow + i) < n; i++){
      if(currentColumn - i > -1){
        boardState[currentRow + i][currentColumn - i] = -1;
      }
      if(currentColumn + i < n){
        boardState[currentRow + i][currentColumn + i] = -1;
      }
    }

    var faultyRow = true;
    for(var i = 0; faultyRow && i < n; i++){
      if(boardState[currentRow][i] !== -1){
        faultyRow = false;
      }
    }
    if(faultyRow){
      if(!lastBoardStates.length){
          return solutions;
      }
      var revert = lastBoardStates.pop();
      revert[0][revert[1][0]][revert[1][1]] = -1;
      return buildAllBoards(revert[0], lastBoardStates, currentRow - 1);
    }

    return buildAllBoards(boardState, lastBoardStates, currentRow + 1);
  }

  buildAllBoards(initBoard(n));
  return solutions;
};