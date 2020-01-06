// handles move for the AI character using minimax algorithm
// returns the row and column index for the optimal move
import { getWinner } from '../Logic/Board';

export default function handleAIMove(board, scope) {    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    let depth = {maxDepth: 0};

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] === null) {
          board[i][j] = 'o';
          let score = minimax(board, 0, false, depth);
          
          board[i][j] = null;

          console.log("pos: " + [i, j] + " score: " + depth.maxDepth);

          if (score > bestScore) {
            bestScore = score;
            move = [i, j];
          }
        }
      }
    }

    scope.provideDepth(depth.maxDepth);
    
    return move;
  }

let scores = {
    x: -10,
    o: 10,
    tie: 0,
}
  
function minimax(board, depth, isMaximizing, obj) {
    let result = getWinner(board);

    if (result) {
      return [scores[result], depth];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {

            board[i][j] = 'o';
            let score = minimax(board, depth + 1, false, obj)[0];
            obj.maxDepth = Math.max(obj.maxDepth, depth + 1)

            board[i][j] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
      }

      return [bestScore, depth];

    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {

                board[i][j] = 'x';
                let score = minimax(board, depth + 1, true, obj)[0];

                obj.maxDepth = Math.max(obj.maxDepth, depth + 1)

                board[i][j] = null;
                bestScore = Math.min(score, bestScore);

            }
        }
      }

      return [bestScore, depth + 1];
    }
}