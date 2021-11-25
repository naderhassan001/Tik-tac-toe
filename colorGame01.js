const Square = ({ id, player, newState }) => {
  const [status, setStatus] = React.useState(null);
  const XorO = ["O","X"];
  const changeColor = () => {
      if (player === 1) {
        return 'green';
      } else if (player === 0) {
        return 'red';
      } 
  };
  
  React.useEffect(() => {
    console.log(`Render ${id}`)
    return () => console.log(`unmounting Square ${id}`);
  });

  return (
    <button 
      onClick={(e) => {
        let col = changeColor();
        e.target.style.background = col;
        let nextPlayer = newState(id);
        setStatus(nextPlayer);
      }}
    > 
      <h1>{XorO[status]}</h1> 
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));

  let status =  `Player ${player}`;
  let winner = checkWinner(state);
  if (winner != null) status = `Player ${winner} wins`

  const newState = idOfSquare => {
      let thePlayer = player;
      state[idOfSquare] = player;
      setState(state);
      let nextplayer = (player + 1) % 2;
      setPlayer(nextplayer);
      return thePlayer;
  };
  
  function checkWinner(state) {
      const win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 5, 6],
      ];
      for (let i = 0; i < win.length; i++) {
            const [a, b, c] = win[i];
            if (state[a] == state[b] && state[a] == state[c] && state[a])
                return state[a];
      }
      return null;
  };

  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>;
  };

  return (
    <div className="game-board">
      <div className="grid-row">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      </div>
      <div className="grid-row">
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      </div>
      <div className="grid-row">
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
