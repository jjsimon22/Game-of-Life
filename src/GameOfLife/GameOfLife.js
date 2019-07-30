import React, { Component } from 'react';
import './GameOfLife.css';

import GameOfLifeGrid from "./GameOfLifeGrid";

class GameOfLife extends Component {
    constructor(props){
        super(props);

        const defaultRows = 10;
        const defaultCols = 10;
        const startingGrid = [
                [false,false,false,false,false,false,false,false,false,false],
                [false,false,false,true,true,false,false,false,false,false],
                [false,false,false,false,true,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false],
                [false,false,false,true,true,false,false,false,false,false],
                [false,false,true,true,false,false,false,false,false,false],
                [false,false,false,false,false,true,false,false,false,false],
                [false,false,false,false,true,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false],
            ];

        const editingGrid = [];
        for (let i=0; i<defaultRows; i++) {
            const row = [];
            for (let c=0; c<defaultCols; c++) {
                row.push(false);
            }
            editingGrid.push(row);
        }

        this.state = {
            rows: defaultRows,
            cols: defaultCols,
            start: startingGrid,
            grid: startingGrid,
            edit: editingGrid,
            isEditing: false,
            isPlaying: false,
            playInterval: null
        };
    }

    getLiveNeighbors = (row, col) => {
        let neighbors = 0;
        [row-1, row, row+1].forEach((r) => {
            if ((r >= 0) && (r < this.state.rows)) {
                [col-1, col, col+1].forEach((c) => {
                    if ((c >= 0) && 
                        (c < this.state.cols) &&
                        !(r === row && c === col)) {
                        if (this.state.grid[r][c]) {
                            neighbors++;
                        }
                    }
                }); 
            }
        });
        return neighbors;
    }

    nextGen = () => {
        let next = this.state.grid.map(r => r.slice());

        for (let r=0; r<this.state.rows; r++) {
            for (let c=0; c<this.state.cols; c++) {
                const aliveNeighbors = this.getLiveNeighbors(r,c);
                if (this.state.grid[r][c]) {
                    if (aliveNeighbors < 2) {
                        next[r][c] = false;
                    } else if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                        next[r][c] = true;
                    } else {
                        next[r][c] = false;
                    }
                } else if (aliveNeighbors === 3) {
                    next[r][c] = true;
                }
            }
        }
        this.setState({grid: next});
    }

    playGame = () => {
        let interval = null;
        if (this.state.isPlaying) {
            clearInterval(this.state.playInterval);
        } else {
            interval = setInterval(() => this.nextGen(), 1000);
        }
        this.setState(prev => { 
            return { 
                isPlaying: !prev.isPlaying,
                playInterval: interval
            }
        });
    }

    resetGame = () => {
        this.setState({
            grid: this.state.start.map(r => r.slice()),
            isEditing: false
        });
    }

    handleCellClick = (row, col) => {
        // if not in edit mode, don't do anything
        if (!this.state.isEditing) {
            return;
        }

        let edit = this.state.edit.map(r => r.slice());
        edit[row][col] = !edit[row][col];
        this.setState({
            edit: edit.slice(),
            grid: edit.slice()
        });
    }

    editStart = () => {
        let reset = this.state.grid.map(r => r.slice()).map(r => {
            return r.map(v => false);
        });
        this.setState({
            grid: reset.slice(),
            edit: reset.slice(),
            isEditing: true
        });
    }

    setStart = () => {
        let edit = this.state.edit.map(r => r.slice());
        this.setState({
            grid: edit.slice(),
            edit: edit.slice(),
            start: edit.slice(),
            isEditing: false
        });
    }

    render() {
        return (
            <div className="GameOfLife">
                <h2>Game of Life</h2>
                <main>
                    <section className="controls">
                        <div>
                            <button onClick={this.playGame}>
                                { this.state.isPlaying ? "Stop" : "Play" }
                            </button>
                        </div>
                        <button onClick={this.resetGame}>Reset</button>
                        
                        {
                            this.state.isEditing ?
                            <button onClick={this.setStart}>Set Start</button> :
                            <button onClick={this.editStart}>Edit Start</button>
                        }
                        
                    </section>
                    <section >
                        <GameOfLifeGrid 
                            grid={this.state.grid}
                            handleCellClick={this.handleCellClick}
                            isEditing={this.state.isEditing}
                        />
                    </section>
                </main>
            </div>
        );
    }
}

export default GameOfLife;