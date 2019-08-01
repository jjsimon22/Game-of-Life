import React, {Component} from 'react'

class GameControls extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            playInterval: null
        }
    }

    getLiveNeighbors = (row, col) => {
        let neighbors = 0;
        [row-1, row, row+1].forEach((r) => {
            if ((r >= 0) && (r < this.props.gameState.rows)) {
                [col-1, col, col+1].forEach((c) => {
                    if ((c >= 0) && 
                        (c < this.props.gameState.cols) &&
                        !(r === row && c === col)) {
                        if (this.props.gameState.grid[r][c]) {
                            neighbors++;
                        }
                    }
                }); 
            }
        });
        return neighbors;
    }

    nextGen = () => {
        let next = this.props.gameState.grid.map(r => r.slice());

        for (let r=0; r<this.props.gameState.rows; r++) {
            for (let c=0; c<this.props.gameState.cols; c++) {
                const aliveNeighbors = this.getLiveNeighbors(r,c);
                if (this.props.gameState.grid[r][c]) {
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
        this.props.update({grid: next});
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
        this.props.update({
            grid: this.props.gameState.start.map(r => r.slice()),
            isEditing: false
        });
    }

    editStart = () => {
        let reset = this.props.gameState.grid.map(r => r.slice()).map(r => {
            return r.map(v => false);
        });
        this.props.update({
            grid: reset.slice(),
            edit: reset.slice(),
            isEditing: true
        });
    }

    setStart = () => {
        let edit = this.props.gameState.edit.map(r => r.slice());

        this.props.update({
            grid: edit.slice(),
            edit: edit.slice(),
            start: edit.slice(),
            isEditing: false
        })
    }

    render() {
    	return (
            <div className="controls">
                <div>
                    <button onClick={this.playGame}>
                        { this.state.isPlaying ? "Stop" : "Play" }
                    </button>
                </div>
                <button onClick={this.resetGame}>Reset</button>
                
                {
                    this.props.gameState.isEditing ?
                    <button onClick={this.setStart}>Set Start</button> :
                    <button onClick={this.editStart}>Edit Start</button>
                }
                
            </div>
    	)
    }
}

export default GameControls;