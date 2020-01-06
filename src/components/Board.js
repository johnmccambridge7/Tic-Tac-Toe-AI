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
            permutations: 0,
            winRatio: 0,
            lossRatio: 0,
            gamesPlayed: 1,
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
            treeDepth: 0,
            permutations: 0,
            winRatio: 0,
            lossRatio: 0,
            gamesPlayed: 1,
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
    
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

    provideDepth(treeDepth) {
        this.setState({ treeDepth });
    }

    providePermutations(permutations) {
        this.setState({ permutations });
    }

    provideStats(winRatio, lossRatio, gamesPlayed) {
        this.setState({ winRatio, lossRatio, gamesPlayed });
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
                <div id="row1">
                    <div id="column1">
                        <div className="ai">
                        { (this.state.treeDepth > 0) ? <h4 style={{ opacity: 0.3 }}>AI previously enumerated minimax tree of depth <b style={{ fontWeight: 'bold' }}>{ this.state.treeDepth }</b></h4> : '' }
                        { (this.state.permutations > 0) ? <h4 style={{ opacity: 0.3 }}><b>{ this.numberWithCommas(this.state.permutations) }</b> possible game configurations considered.</h4> : '' }
                        </div>
                    </div>
                    <div id="column2">
                        <div className="confidence">
                            <h4>Chances AI will lose: <b>{ Math.floor((this.state.winRatio / this.state.gamesPlayed) * 100) }%</b></h4>
                            <h4>Chances AI will win: <b>{ Math.floor((this.state.lossRatio / this.state.gamesPlayed) * 100) }%</b></h4>
                        </div>
                    </div>
                </div>
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