import React from 'react';
import { useGameContext } from '../context/gameContext';

const History = () => {
  const { state, dispatch } = useGameContext();

  const handleReplay = (step) => {
    dispatch({ type: 'REPLAY', step });
  };

  return (
    <div>
      <h2>Historique des parties</h2>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>
            <button onClick={() => handleReplay({ index, grid: entry.grid })}>
              Partie du {new Date(entry.date).toLocaleString()} - {entry.winner}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
