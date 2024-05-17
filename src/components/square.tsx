import React, { useState, useEffect } from 'react';


function Square({ moveNumber, handleSquareClick, index, removeFromHistory } : { moveNumber : number, handleSquareClick : any, index : number, removeFromHistory : any}) {
    const [move, setMove] = useState(-1);
    const [value, setValue] = useState<string>("");

    const emptyValue = () => {
        if(moveNumber <= move) {
            removeFromHistory(index);
            setValue("");
        }
    }

    useEffect(() => {
        emptyValue();
    }, [moveNumber]);

    return (
        <div className="square" onClick={(e) => handleSquareClick(value, setValue, setMove, index, e)}>
            <div className="square-inner">{value}</div>
        </div>
    );
}

export default Square;