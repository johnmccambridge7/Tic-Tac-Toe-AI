import React, { Component } from 'react';
import { determineBoardState, boardFull, getWinner } from '../Logic/Board';
import handleAIMove from '../AI/main.js';
import Naught from './Naught';
import Cross from './Cross';

// full game functionality completed in 2hrs 41mins

export default class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            computersTurn: false,
            character: 'cross',
            gameOver: false,
            winner: null,
            board: [[null, null, null],
                    [null, null, null],
                    [null, null, null]],
        }
    }

    createNewGame() {
        this.setState({
            computersTurn: false,
            character: 'cross',
            gameOver: false,
            winner: null,
            board: [[null, null, null],
                    [null, null, null],
                    [null, null, null]],
        });
    }

    initiateAI() {
        if(this.state.computersTurn) {
            let nextMoves = handleAIMove(this.state.board);
            if(nextMoves) {
                this.handleTurn(nextMoves[0], nextMoves[1]);
            }
        }
    }

    handleTurn(rowIndex, columnIndex) {

        const oldBoard = this.state.board;

        console.log("current winner: " + getWinner(this.state.board))

        if(!oldBoard[rowIndex][columnIndex] && !this.state.gameOver) {

            const character = (this.state.character === 'cross') ? [<Cross />, "cross"] : [<Naught/>, "naught"];

            oldBoard[rowIndex][columnIndex] = character;

            const gameOver = determineBoardState(oldBoard, rowIndex, columnIndex, character[1]);
            const full = boardFull(oldBoard);

            this.setState({
                computersTurn: !this.state.computersTurn,
                character: (this.state.character === 'cross') ? 'naught' : 'cross',
                board: oldBoard,
                gameOver: (gameOver || full),
                winner: (gameOver) ? character[1] : null
            });
        }
    }

    render() {
        this.initiateAI();

        return (
            <div className="board">
                { (!this.state.gameOver) ?
                <h3>{ (!this.computersTurn) ? 'It\'s your turn' : 'The computer is deciding...' }</h3> :
                <h3 className="winning">{ 
                    (this.state.winner === null) ? 'The game is a tie.' : (
                        (this.state.winner === 'cross') ? 'You\'ve won the game!' : 'Computer Wins.'
                    )
                }</h3>}
                <table>
                    <tbody>
                        {this.state.board.map((row, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    { row.map((cell, columnIndex) => {
                                        return (
                                            <td key={columnIndex} onClick={() => {
                                                if(!this.state.computersTurn) {
                                                    this.handleTurn(rowIndex, columnIndex);
                                                }
                                            }}>
                                                { (cell) ? cell[0] : '' }
                                            </td>
                                        );
                                    }) }    
                                </tr>
                            );
                        })}
                    </tbody>
                </table><br />
                <button className="newGame" onClick={() => this.createNewGame() }>New Game!</button>
            </div>
        );
    }
}