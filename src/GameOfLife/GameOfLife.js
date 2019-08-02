import React, { Component } from 'react';
import './GameOfLife.css';

import GameOfLifeGrid from "./GameOfLifeGrid";
import GameControls from "./GameControls";

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
            ]; // default size and start

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
            isEditing: false
        };
    }

    updateState = (s) => {
        this.setState(s);
    }

    render() {
        return (
            <div className="GameOfLife">
                <h2>Game of Life</h2>
                <main>
                    <section>
                        <GameControls 
                            gameState={this.state} 
                            update={this.updateState}
                        />
                    </section>
                    <section >
                        <GameOfLifeGrid 
                            gameState={this.state}
                            update={this.updateState}
                        />
                    </section>
                </main>
            </div>
        );
    }
}

export default GameOfLife;