import React, { useState, useEffect } from 'react';
const MemeSettings = () => {
  const [disableMeme, setDisableMeme] = useState(() => 
    localStorage.getItem('disableMeme') === 'true'
  );

  const toggleMemeVisibility = () => {
    setDisableMeme(prevState => {
      const newState = !prevState;
      localStorage.setItem('disableMeme', newState.toString());
      window.dispatchEvent(new CustomEvent('memeSettingChanged', {
        detail: { disableMeme: newState }
      }));
      
      return newState;
    });
  };

  return (
    <div className="meme-settings-container p-4">
      <div className="meme-settings-wrapper">
        <div className="meme-settings-label flex items-center justify-between">
          <span className="meme-settings-text text-lg font-medium">
            Disable Meme Cutscene
          </span>
          <button
            className={`toggle-switch w-14 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out ${
              disableMeme ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onClick={toggleMemeVisibility}
            aria-pressed={disableMeme}
            type="button"
          >
            <span
              className={`toggle-slider block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                disableMeme ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <p className="meme-settings-description text-sm text-gray-600 mt-2">
          Skip the meme in startup
        </p>
      </div>
    </div>
  );
};

export default MemeSettings;