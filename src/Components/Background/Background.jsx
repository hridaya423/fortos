import React, { useState, useEffect } from 'react';

const backgroundImages = [
  {
    id: 'fortnite4',
    name: 'Fortnite Landscape',
    url: 'https://images.alphacoders.com/132/1326064.jpeg'
  },

];


const Background = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    localStorage.getItem('backgroundImage') || backgroundImages[0].url
  );
  const [audioContext, setAudioContext] = useState(null);
  const [audioSource, setAudioSource] = useState(null);
  const [username, setUsername] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {

    const storedUsername = localStorage.getItem('username');
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (storedUsername) {
      setUsername(storedUsername);
      setIsFirstVisit(!hasVisited);
      setTimeout(() => setShowWelcome(true), 500);
    }
    
    const handleBackgroundChange = (event) => {
      const newBackground = event.detail?.backgroundUrl ||
                          localStorage.getItem('backgroundImage') ||
                          backgroundImages[0].url;
      setBackgroundImage(newBackground);
    };

    window.addEventListener('backgroundChanged', handleBackgroundChange);
    window.addEventListener('storage', handleBackgroundChange);

    const initializeAudio = () => {
      if (window.AudioContext || window.webkitAudioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();

        fetch('/assets/sound/background.mp3')
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
          .then(audioBuffer => {
            const source = context.createBufferSource();
            source.buffer = audioBuffer;

            const gainNode = context.createGain();
            gainNode.gain.setValueAtTime(0.3, context.currentTime);

            source.connect(gainNode);
            gainNode.connect(context.destination);

            source.loop = true;
            source.start();

            setAudioContext(context);
            setAudioSource(source);
          })
          .catch(error => {
            console.warn("Audio loading failed:", error);
          });
      }
    };

    const audioTimeout = setTimeout(initializeAudio, 2000);
    const hideTimeout = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => {
      clearTimeout(audioTimeout);
      clearTimeout(hideTimeout);
      window.removeEventListener('backgroundChanged', handleBackgroundChange);
      window.removeEventListener('storage', handleBackgroundChange);

      if (audioSource) {
        audioSource.stop();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 transition-all duration-500"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          filter: 'brightness(0.8)',
          backgroundSize: 'cover'
        }}
      />
      {username && (
        <div className={`fixed top-0 left-0 w-full p-8 transition-all duration-1000 
          ${showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30 shadow-2xl">
              <h1 className="text-6xl font-bold text-white mb-2 tracking-wider">
                {isFirstVisit ? 'WELCOME' : 'WELCOME BACK'}
              </h1>
              <div className="relative">
                <h2 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 
                  animate-pulse tracking-tight">
                  {username.toUpperCase()}
                </h2>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur"></div>
              </div>
              <p className="text-blue-300 text-xl mt-4">
                {isFirstVisit ? 'Get ready for your first drop!' : 'Ready to drop in? Your battle bus awaits.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Background;