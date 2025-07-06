
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center p-4 mb-4">
      <h1 className="text-5xl md:text-6xl text-fuchsia-400 tracking-wider animate-pulse">
        Pixel Art Generator
      </h1>
      <p className="text-lg text-cyan-400 mt-2">Powered by Imagen 3</p>
    </header>
  );
};

export default Header;
