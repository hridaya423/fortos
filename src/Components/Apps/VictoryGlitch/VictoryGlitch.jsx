import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { RefreshCcw } from "lucide-react";
import "./VictoryGlitch.css";
import {
  handleRefresh,
  handleMinimize,
  handleClose,
  handleDragStop,
  handleMaximize,
} from "../../../scripts/index";

const VictoryGlitch = ({ isVisible, setIsVisible }) => {
  const [url, setURL] = useState("https://cyberpunkarcade.vercel.app/");
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const VictoryGlitchRef = useRef(null);
  const url1 = "https://cyberpunkarcade.vercel.app/";
  const url2 = "https://cyberpunkarcade.vercel.app/";
  useEffect(() => {
    if (isVisible) {
      handleRefresh(setURL, url1, url2);
    }
  }, [isVisible]);

  return (
    isVisible && (
      <Draggable
        handle=".VictoryGlitch-header"
        bounds="parent"
        position={position}
        onStop={(e, data) => handleDragStop(e, data, isMaximized, setPosition)}
        disabled={isMaximized}
      >
        <div
          ref={VictoryGlitchRef}
          className={`VictoryGlitch ${isMaximized ? "VictoryGlitch--maximized" : ""}`}
          style={{
            width: isMaximized ? "100%" : "800px",
            height: isMaximized ? "100%" : "600px",
          }}
        >
          <div className="VictoryGlitch-header">
            <div className="VictoryGlitch-window-controls">
              <button
                className="VictoryGlitch-control VictoryGlitch-control--close"
                onClick={() => handleClose(setIsVisible)}
              ></button>
              <button
                className="VictoryGlitch-control VictoryGlitch-control--minimize"
                onClick={() => handleMinimize(setIsVisible)}
              ></button>
              <button
                className="VictoryGlitch-control VictoryGlitch-control--maximize"
                onClick={() =>
                  handleMaximize(setIsMaximized, isMaximized, setPosition)
                }
              ></button>
            </div>
            <div className="VictoryGlitch-title">Victory Glitch</div>
            <button
              className="VictoryGlitch-refresh"
              onClick={() => handleRefresh(setURL, url1, url2)}
            >
              <RefreshCcw />
            </button>
          </div>
          <div className="VictoryGlitch-content">
            <iframe
              src={url}
              style={{
                width: "100%",
                height: "calc(100% - 50px)",
                border: "none",
              }}
              title="Victory Glitch"
            />
          </div>
        </div>
      </Draggable>
    )
  );
};

export default VictoryGlitch;
