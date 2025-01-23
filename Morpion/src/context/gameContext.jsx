// src/context/GameContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { gameReducer, initialState } from '../reducer/gameReducer';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Sauvegarde de l'historique dans localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('gameHistory'));
    if (savedHistory) {
      dispatch({ type: 'LOAD_HISTORY', history: savedHistory });
    }
  }, []);

  useEffect(() => {
    if (state.history.length > 0) {
      localStorage.setItem('gameHistory', JSON.stringify(state.history));
    }
  }, [state.history]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
