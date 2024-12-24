/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import ninjameme from "../../assets/videos/ninja-meme.mp4";
import backgroundAudio from "../../assets/sound/lowtaperfade.m4a";
import backgroundMap from "../../assets/images/background.png";
import "./LoadingScreen.css";

const LoadingScreen = ({ setLoaded }) => {
  const [statements, setStatements] = useState([]);
  const [showNinjaMeme, setShowNinjaMeme] = useState(false);
  const [showMassiveCutscene, setShowMassiveCutscene] = useState(false);
  const [isMemeDisabled, setIsMemeDisabled] = useState(
    localStorage.getItem('disableMeme') === 'true'
  );
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const setup = [
    "Dropping from Battle Bus...",
    "Equipping Mythics...",
    "Checking Storm Circles...",
    "Spawning Supply Drops...",
    "Configuring Victory Royale...",
    "Initializing Battle Royale Mode...",
    "Loading this MASSIVE OS"
  ];

  useEffect(() => {
    const handleMemeSettingChange = (event) => {
      setIsMemeDisabled(event.detail.disableMeme);
    };

    window.addEventListener('memeSettingChanged', handleMemeSettingChange);

    return () => {
      window.removeEventListener('memeSettingChanged', handleMemeSettingChange);
    };
  }, []);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < setup.length) {
        setStatements((prevStatements) => [...prevStatements, setup[index]]);

        if (index === setup.length - 1) {
          setTimeout(() => {
            if (isMemeDisabled) {
              setLoaded(true);
              clearInterval(interval);
              return;
            }

            setShowMassiveCutscene(true);
            setTimeout(() => {
              setShowMassiveCutscene(false);
              setShowNinjaMeme(true);

              if (audioRef.current) {
                audioRef.current.play().catch(error => {
                  console.log("Audio autoplay was prevented", error);
                });
              }
            }, 2000);
          }, 1000);
        }

        index++;
      } else {
        clearInterval(interval);
      }
    }, 550);

    return () => clearInterval(interval);
  }, [isMemeDisabled]);

  const handleNinjaVideoEnd = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setLoaded(true);
  };

  if (isMemeDisabled) {
    return (
      <div className="loading-screen">
        <div 
          className="background-map"
          style={{
            backgroundImage: `url(${backgroundMap})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.3,
            zIndex: 0
          }}
        />

<div className="background-elements">
        <img 
          src="src/assets/images/battlebus.png" 
          alt="Battle Bus" 
          className="battle-bus-gif"
        />
        <div className="storm-circle"></div>
        <div className="fortnite-grid"></div>
      </div>

        <div className="animated-loader">
          {statements.map((statement, index) => (
            <div
              key={index}
              className="loading-statement"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {statement}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="loading-screen">
      <div 
        className="background-map"
        style={{
          backgroundImage: `url(${backgroundMap})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.3,
          zIndex: 0
        }}
      />

      <audio
        ref={audioRef}
        loop
        src={backgroundAudio}
      />

      <div className="background-elements">
        <img 
          src="src/assets/images/battlebus.png" 
          alt="Battle Bus" 
          className="battle-bus-gif"
        />
        <div className="storm-circle"></div>
        <div className="fortnite-grid"></div>
      </div>

      {showMassiveCutscene && (
        <div className="massive-cutscene">
          <div className="massive-text">DO YOU KNOW WHAT ELSE IS MASSIVE?</div>
        </div>
      )}

      {showNinjaMeme ? (
        <div className="ninja-meme">
          <div className="low-taper-fade-text"></div>
          <video
            ref={videoRef}
            src={ninjameme}
            autoPlay
            muted
            className="ninja-video"
            onEnded={handleNinjaVideoEnd}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="animated-loader">
          {statements.map((statement, index) => (
            <div
              key={index}
              className="loading-statement"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {statement}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default LoadingScreen;