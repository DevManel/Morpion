const initialState = {
    grid: Array(9).fill(null),
    isXNext: true,
    winner: null,
    history: [],
    movesHistory: [],
    currentStep: 0,
    playerX: 'Player X',
    playerO: 'Player O'
  };
  
  function gameReducer(state, action) {
    switch (action.type) {
      case 'MAKE_MOVE':
        const newGrid = [...state.grid];
        newGrid[action.index] = state.isXNext ? 'X' : 'O';
        const nextIsX = !state.isXNext;
        const newMovesHistory = [...state.movesHistory, { index: action.index, player: state.isXNext ? 'X' : 'O' }];
        const winner = calculateWinner(newGrid);
        if (winner || newGrid.every(cell => cell !== null)) {
          const newHistory = [
            ...state.history,
            {
              grid: newGrid,
              winner: winner || 'Draw',
              date: new Date().toISOString(),
              moves: newMovesHistory
            }
          ];
          return {
            ...state,
            grid: newGrid,
            isXNext: nextIsX,
            winner,
            history: newHistory,
            movesHistory: newMovesHistory,
            currentStep: newHistory.length
          };
        }
  
        return {
          ...state,
          grid: newGrid,
          isXNext: nextIsX,
          winner: null,
          movesHistory: newMovesHistory
        };
  
      case 'RESTART':
        return {
          ...state,
          grid: Array(9).fill(null),
          isXNext: true,
          winner: null,
          movesHistory: [],
          currentStep: 0
        };
  
      case 'REPLAY':
        return {
          ...state,
          grid: action.step.grid,
          currentStep: action.step.index
        };
  
      case 'UNDO':
        if (state.movesHistory.length === 0) return state;
        const lastMove = state.movesHistory[state.movesHistory.length - 1];
        const gridCopy = [...state.grid];
        gridCopy[lastMove.index] = null;
        return {
          ...state,
          grid: gridCopy,
          isXNext: lastMove.player === 'X',
          movesHistory: state.movesHistory.slice(0, -1),
          winner: null
        };
  
      case 'SET_PLAYER_NAMES':
        return {
          ...state,
          playerX: action.playerX,
          playerO: action.playerO
        };
  
      default:
        return state;
    }
  }
  
  function calculateWinner(grid) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let [a, b, c] of lines) {
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a];
      }
    }
    return null;
  }
  
  export { initialState, gameReducer };
  