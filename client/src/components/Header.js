import React from 'react';
import '../styles/Header.css';

const Header = ({ displayMode, setDisplayMode, setShowDataInput }) => {
  return (
    <header className="header">
      <div className="mode-buttons">
        <button 
          className={displayMode === 'text' ? 'active' : ''} 
          onClick={() => setDisplayMode('text')}
        >
          TEXT
        </button>
        <button 
          className={displayMode === 'visual' ? 'active' : ''} 
          onClick={() => setDisplayMode('visual')}
        >
          VISUAL
        </button>
      </div>
      
      <button 
        className="add-button"
        onClick={() => setShowDataInput(prev => !prev)}
      >
        +
      </button>
    </header>
  );
};

export default Header;