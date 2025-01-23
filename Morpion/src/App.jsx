import React from 'react';
import { GameProvider } from './context/gameContext';
import GameBoard from './components/gameBoard';
import Header from './components/Header';
import History from './components/History';
import './App.css';

const App = () => {
  return (
    <GameProvider>
      <Header />
      <GameBoard />
      <History />
    </GameProvider>
  );
};

export default App;
