import React from 'react'

function GameOfLifeGrid(props) {
	const rows = props.grid.map((row, i) => {
        const cells = row.map((status, j) => {
            const classnames = status ? ["alive"] : ["dead"];
            if (props.isEditing) {
            	classnames.push("editMode");
            }
            return (<td key={j} 
                className={classnames.join(" ")} 
                onClick={() => props.handleCellClick(i,j)}>
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

export default GameOfLifeGrid;