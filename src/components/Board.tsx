import { useEffect, useState } from 'react';
import Square from './square';

function Board() {
    const [isWon, setIsWon] = useState<any>(null);
    const [moveNumber, setMoveNumber] = useState<number>(0);
    const [history, setHistory] = useState(Array(9).fill(null));

    const removeFromHistory = async (index : number) => {
        const tempHistory = [...history];
        tempHistory[index] = null;
        setHistory(() => tempHistory);
    }

    const handleSquareClick = (value : string, setValue : any, setMove : any, index : number, e : any) => {
        e.preventDefault();
        if(value == "" && isWon == null) {
            setMoveNumber(() => moveNumber + 1);
            setMove(() => moveNumber);
            setValue(() => moveNumber%2==0 ? "X" : "O");

            const tempHistory = [...history];
            tempHistory[index] = moveNumber%2==0 ? "X" : "O";
            setHistory(() => tempHistory);
            console.log(tempHistory);
        }
    }

    const calculateWinner = (squares : any) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }

    const goToGameStart = (e : any) => {
        e.preventDefault();
        setHistory(Array(9).fill(null));
        setMoveNumber(0);
    }

    const getGoMoveNumber = () => {
        let goToMoveNumberButton=[];
        for(let i=1;i<moveNumber;i++) {
            goToMoveNumberButton.push(<button key={i} onClick={() => setMoveNumber(i)}> Go to move #{i}</button>)
        }
        return goToMoveNumberButton;
    }

    useEffect(() => {
        setIsWon(() => calculateWinner(history));
        console.log("winner", isWon);
    }, [moveNumber, history]);

    return (
    <div  className="main">
        <div>
            <div className="player">Next Player : {moveNumber%2==0 ? "X" : "O"}</div>
            <div className="square-horizontal">
                <Square removeFromHistory={removeFromHistory} index={0} moveNumber={moveNumber} handleSquareClick={handleSquareClick} />
                <Square removeFromHistory={removeFromHistory} index={1} moveNumber={moveNumber} handleSquareClick={handleSquareClick} />
                <Square removeFromHistory={removeFromHistory} index={2} moveNumber={moveNumber} handleSquareClick={handleSquareClick} />
            </div>
            <div className="square-horizontal">
                <Square removeFromHistory={removeFromHistory} index={3} moveNumber={moveNumber} handleSquareClick={handleSquareClick} />
                <Square removeFromHistory={removeFromHistory} index={4} moveNumber={moveNumber} handleSquareClick={handleSquareClick} />
                <Square removeFromHistory={removeFromHistory} index={5} moveNumber={moveNumber} handleSquareClick={handleSquareClick} />
            </div>
            <div className="square-horizontal">
                <Square removeFromHistory={removeFromHistory} index={6} moveNumber={moveNumber} handleSquareClick={handleSquareClick} />
                <Square removeFromHistory={removeFromHistory} index={7} moveNumber={moveNumber} handleSquareClick={handleSquareClick} />
                <Square removeFromHistory={removeFromHistory} index={8} moveNumber={moveNumber} handleSquareClick={handleSquareClick} />
            </div>
            <div className="winner">
                {isWon ? "The Winner is " + isWon : ""}
            </div>
        </div>
        <div className="buttons">
            <button onClick={goToGameStart}>Go to game start</button>
            {getGoMoveNumber()}
        </div>
    </div>
    )
}

export default Board;