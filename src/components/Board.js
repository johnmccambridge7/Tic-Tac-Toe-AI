import React, { Component } from 'react';
import { determineBoardState, boardFull } from '../Logic/Board';
import handleAIMove from '../AI/main.js';
import Naught from './Naught';
import Cross from './Cross';

// full game functionality completed in 2hrs 41mins
// full AI functionality completed in 5hrs 15mins

export default class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            computersTurn: true,
            character: 'o',
            gameOver: false,
            winner: null,
            board: [[null, null, null],
                    [null, null, null],
                    [null, null, null]],
            treeDepth: 0,
        }
    }

    createNewGame() {
        this.setState({
            computersTurn: true,
            character: 'o',
            gameOver: false,
            winner: null,
            board: [[null, null, null],
                    [null, null, null],
                    [null, null, null]],
            treeDepth: 0
        });
    }

    initiateAI() {
        setTimeout(() => {
            if(this.state.computersTurn) {
                let nextMoves = handleAIMove(this.state.board, this);
                if(nextMoves) {
                    this.handleTurn(nextMoves[0], nextMoves[1]);
                }
            }
        }, 3000);
    }

    handleTurn(rowIndex, columnIndex) {

        const oldBoard = this.state.board;

        if(!oldBoard[rowIndex][columnIndex] && !this.state.gameOver) {
            oldBoard[rowIndex][columnIndex] = this.state.character;

            const gameOver = determineBoardState(oldBoard, rowIndex, columnIndex, this.state.character);
            const full = boardFull(oldBoard);

            this.setState({
                computersTurn: !this.state.computersTurn,
                character: (this.state.character === 'x') ? 'o' : 'x',
                board: oldBoard,
                gameOver: (gameOver || full),
                winner: (gameOver) ? this.state.character : null,
            });
        }
    }

    provideDepth(d) {
        console.log('depth; ' + d);
        this.setState({ treeDepth: d });
    }

    render() {
        this.initiateAI();

        return (
            <div className="board">
                { (!this.state.gameOver) ?
                <h3 className={(this.state.computersTurn) ? 'thinking' : 'user'}>{ (!this.state.computersTurn) ? 'It\'s your turn' : 'The computer is thinking...' }</h3> :
                <h3 className="winning">{ 
                    (this.state.winner === null) ? 'The game is a tie.' : (
                        (this.state.winner === 'x') ? 'You\'ve won the game!' : 'Computer Wins.'
                    )
                }</h3>}
                { (this.state.treeDepth > 0) ? <h4 style={{ opacity: 0.3 }}>AI previously enumerated minimax tree of depth { this.state.treeDepth }.</h4> : '' }
                <table>
                    <tbody style={{
                        opacity: (this.state.computersTurn) ? 0.5 : 1
                    }}>
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
                                                { (cell) ? ((cell === 'x') ? <Cross /> : <Naught />) : '' }
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