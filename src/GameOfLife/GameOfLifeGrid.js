import React, {Component} from 'react'

class GameOfLifeGrid extends Component {
    constructor(props) {
        super(props);
    }

    handleCellClick = (row, col) => {
        // if not in edit mode, don't do anything
        if (!this.props.gameState.isEditing) {
            return;
        }

        let edit = this.props.gameState.edit.map(r => r.slice());
        edit[row][col] = !edit[row][col];
        this.props.update({
            edit: edit.slice(),
            grid: edit.slice()
        });
    }

    render() {

    	const rows = this.props.gameState.grid.map((row, i) => {
            const cells = row.map((status, j) => {
                const classnames = status ? ["alive"] : ["dead"];
                if (this.props.gameState.isEditing) {
                	classnames.push("editMode");
                }
                return (<td key={j} 
                    className={classnames.join(" ")} 
                    onClick={() => this.handleCellClick(i,j)}>
                        {i},{j}
                    </td> 
                )
            });
            return <tr key={i}>{cells}</tr>
        });

    	return (
    		<table>
                <tbody>
                    {rows}
                </tbody>
            </table>
    	)
    }
}

export default GameOfLifeGrid;