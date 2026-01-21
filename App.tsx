import React from 'react';
import Player from './src/app/Player';

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <Player />
    </div>
  );
};

export default App;