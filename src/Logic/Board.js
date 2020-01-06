/**
 * determines the current board state for a specific move
 * i.e. for a specific move, the board state might change to
 * winning from previous null.
 * @determineBoardState
 */

export function determineBoardState(board, rowIndex, columnIndex, character) {
    let verticle = true
    let horizontal = true
    let leftDiagonal = true
    let rightDiagonal = true

    let j = 0
    let k = 0 

    for(let i = 0; i < 3; i++) {
        if(!board[i][columnIndex]) {
            verticle = false
        } else {
            if(board[i][columnIndex] !== character) {
                verticle = false
            }
        }
    }

    for(let i = 0; i < 3; i++) {
        if(!board[rowIndex][i]) {
            horizontal = false
        } else {
            if(board[rowIndex][i] !== character) {
                horizontal = false
            }
        }
    }

    for(let i = 0; i < 3; i++) {
        if(!board[i][j]) {
            leftDiagonal = false
        } else {
            if(board[i][j] !== character) {
                leftDiagonal = false
            }
        }

        j += 1
    }

    for(let i = 2; i >= 0; i--) {
        if(!board[i][k]) {
            rightDiagonal = false
        } else {
            if(board[i][k] !== character) {
                rightDiagonal = false
            }
        }

        k += 1
    }
    
    return verticle || horizontal || leftDiagonal || rightDiagonal
}

export function boardFull(board) {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(!board[i][j]) {
                return false; 
            }
        }
    }

    return true;
}

export function getWinner(board) {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            let crossState = determineBoardState(board, i, j, "x")
            let naughtState = determineBoardState(board, i, j, "o");

            if(crossState) {
                //console.log(board)
                //console.log("cross win")
                return "x"
            }

            if(naughtState) {
                //console.log(board)
                //console.log("naught win")
                return "o"
            }
        }
    }

    if(boardFull(board)) {
        //console.log(board)
        //console.log("was a tie")
        return "tie"
    }

    //console.log(board)
    //console.log("game still in play")

    return null;
}