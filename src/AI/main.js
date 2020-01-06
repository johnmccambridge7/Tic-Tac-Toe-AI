// handles move for the AI character using minimax algorithm
// returns the row and column index for the optimal move
import { getWinner } from '../Logic/Board';

export default function handleAIMove(board, scope) {    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    let data = {
        maxDepth: 0,
        permutations: 0,
        winRatio: 0,
        lossRatio: 0,
        gamesPlayed: 0
    };

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          board[i][j] = 'o';
          let score = minimax(board, 0, false, data);
          
          board[i][j] = null;

          console.log("pos: " + [i, j] + " score: " + data.maxDepth + " permutations: " + data.permutations + " win: " + (data.winRatio / data.gamesPlayed) + " loss: " + (data.lossRatio / data.gamesPlayed));

          if (score > bestScore) {
            bestScore = score;
            move = [i, j];
          }
        }
      }
    }

    scope.provideDepth(data.maxDepth);
    scope.providePermutations(data.permutations);
    scope.provideStats(data.winRatio, data.lossRatio, data.gamesPlayed);
    
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

      obj.winRatio += (result === 'x') ? 1 : 0
      obj.lossRatio += (result === 'o') ? 1 : 0
      obj.gamesPlayed += 1

      return scores[result];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {

            board[i][j] = 'o';
            let score = minimax(board, depth + 1, false, obj);

            obj.maxDepth = Math.max(obj.maxDepth, depth + 1)
            obj.permutations = obj.permutations + 1

            board[i][j] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
      }

      return bestScore;

    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {

                board[i][j] = 'x';
                let score = minimax(board, depth + 1, true, obj);

                obj.maxDepth = Math.max(obj.maxDepth, depth + 1)
                obj.permutations = obj.permutations + 1

                board[i][j] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
      }

      return bestScore;
    }
}