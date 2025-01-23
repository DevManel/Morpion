import React, { useState } from 'react';
import { useGameContext } from '../context/gameContext';

function GameBoard() {
  const { state, dispatch } = useGameContext();
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');

  const handleClick = (index) => {
    if (state.grid[index] || state.winner) return;
    dispatch({ type: 'MAKE_MOVE', index });
  };

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART' });
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!playerXName || !playerOName) return;
    dispatch({
      type: 'SET_PLAYER_NAMES',
      playerX: playerXName || 'Player X',
      playerO: playerOName || 'Player O',
    });
  };

  return (
    <div>
      {!state.playerX || !state.playerO ? (
        <form onSubmit={handleNameSubmit}>
          <h2>Définissez les noms des joueurs</h2>
          <div>
            <input
              type="text"
              placeholder="Nom du Joueur X"
              value={playerXName}
              onChange={(e) => setPlayerXName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Nom du Joueur O"
              value={playerOName}
              onChange={(e) => setPlayerOName(e.target.value)}
            />
          </div>
          <button type="submit">Commencer le jeu</button>
        </form>
      ) : (
        <>
          <div className="grid">
            {state.grid.map((value, index) => (
              <button key={index} className="cell" onClick={() => handleClick(index)}>
                {value}
              </button>
            ))}
          </div>
          <div>
            <h3>Tour de {state.isXNext ? state.playerX : state.playerO}</h3>
          </div>
          <button onClick={handleUndo}>Annuler le dernier coup</button>
          <button onClick={handleRestart}>Recommencer la partie</button>
        </>
      )}
    </div>
  );
}

export default GameBoard;
