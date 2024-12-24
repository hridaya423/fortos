import React, { useState, useEffect } from "react";
import { Power, User } from "lucide-react";
import startAudioFile from "../../assets/sound/entry.mp3";
import fortOSImage from "../../assets/logo.png";
import { lockscreenBackgrounds } from "../Menubar/LockScreenSettings";



const LockScreen = ({ setIsVisible }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [canInteract, setCanInteract] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(() => 
    localStorage.getItem('lockscreenBackground') || lockscreenBackgrounds[0].url
  );

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsReturningUser(true);
      setUsername(storedUsername);
    }
  
    const handleBackgroundChange = (event) => {
      if (event.detail?.backgroundUrl) {
        setBackgroundImage(event.detail.backgroundUrl);
      }
    };

    window.addEventListener('lockscreenBackgroundChanged', handleBackgroundChange);

    startLoading();

    return () => {
      window.removeEventListener('lockscreenBackgroundChanged', handleBackgroundChange);
    };
  }, []);

  const startLoading = () => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setCanInteract(true);
          setTimeout(() => setShowInput(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  };

  const handleUnlock = async () => {
    if (!username.trim()) return;
    
    setIsSubmitting(true);
    const startAudio = new Audio(startAudioFile);
    await startAudio.play();

    const requestFullScreen = 
      document.documentElement.requestFullscreen || 
      document.documentElement.mozRequestFullScreen || 
      document.documentElement.webkitRequestFullscreen || 
      document.documentElement.msRequestFullscreen;

    if (requestFullScreen) {
      requestFullScreen.call(document.documentElement);
    }

    localStorage.setItem('username', username);
    
    setTimeout(() => {
      localStorage.setItem('hasVisited', 'true');
    }, 3000);

    setIsExiting(true);
    
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center
        transition-transform duration-1000
        ${isExiting ? 'translate-y-full' : 'translate-y-0'}`}
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
      <div 
        className={`relative w-full max-w-md p-8 rounded-lg bg-gray-900 bg-opacity-80 backdrop-blur-sm
          transition-all duration-1000
          ${isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="flex flex-col items-center space-y-6">
          <img 
            src={fortOSImage} 
            alt="FortOS" 
            className={`w-32 h-32 object-contain transition-transform duration-1000
              ${isExiting ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}
          />
          
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>

          {showInput && (
            <div className={`w-full space-y-4 transition-all duration-1000
              ${isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              <div className="flex items-center space-x-2 text-gray-300">
                <User size={20} />
                <span>{loadingProgress}% SYSTEM INITIALIZED</span>
              </div>

              {isReturningUser ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Welcome back, {username}!
                    </h2>
                    <p className="text-blue-400">
                      Ready to drop back in?
                    </p>
                  </div>
                  <button 
                    onClick={handleUnlock}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-md text-white font-medium transition-all duration-300
                      ${!isSubmitting ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}
                  >
                    {isSubmitting ? "ACCESSING..." : "LOG IN"}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name to continue..."
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white 
                      placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    disabled={!canInteract || isSubmitting}
                  />

                  <button 
                    onClick={handleUnlock}
                    disabled={!canInteract || !username.trim() || isSubmitting}
                    className={`w-full px-4 py-2 rounded-md text-white font-medium transition-all duration-300
                      ${canInteract && username.trim() && !isSubmitting
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-700 cursor-not-allowed'}`}
                  >
                    {isSubmitting ? "ACCESSING..." : "UNLOCK"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LockScreen;  