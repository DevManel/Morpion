import React from 'react';
import { useGameContext } from '../context/gameContext';

const Header = () => {
  const { state } = useGameContext();
  return (
    <header>
      <h1>Jeu du Morpion</h1>
      <h2>{state.winner ? `Gagnant: ${state.winner}` : `Joueur actif: ${state.isXNext ? state.playerX : state.playerO}`}</h2>
    </header>
  );
};

export default Header;
