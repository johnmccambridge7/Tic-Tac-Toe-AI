// handles move for the AI character using minimax algorithm
// returns the row and column index for the optimal move
import { getWinner, boardFull } from '../Logic/Board';

export default function handleAIMove(board) {
    let move;
    let bestScore = -Infinity;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(!board[i][j]) {
                let score = minimax(board, 0, false)

                console.log("pos: " + [i, j] + " score: " + score);

                if(score > bestScore) {
                    bestScore = score
                    move = [i, j]
                }
            }
        }
    }

    return move;
}

let scores = {
    cross: 10,
    naught: -10,
    tie: 0,
}

function minimax(board, depth, maximizingPlayer) {
    let result = getWinner(board)

    if(result) {
        return scores[result];
    }

    if (maximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {
              board[i][j] = [null, 'cross'];
              let score = minimax(board, false);
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
              board[i][j] = [null, 'naught'];
              let score = minimax(board, true);
              board[i][j] = null;
              bestScore = Math.min(score, bestScore);
            }
          }
        }
        return bestScore;
    }
}

