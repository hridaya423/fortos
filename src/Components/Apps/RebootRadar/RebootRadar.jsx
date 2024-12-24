import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { RefreshCcw } from "lucide-react";
import "./RebootRadar.css";
import {
  handleRefresh,
  handleMinimize,
  handleClose,
  handleDragStop,
} from "../../../scripts/index";

const RebootRadar = ({ isVisible, setIsVisible }) => {
  const [url, setURL] = useState("https://i-know-how-you-are-feeling.vercel.app/");
  const url1 = "https://i-know-how-you-are-feeling.vercel.app/";
  const url2 = "https://i-know-how-you-are-feeling.vercel.app/";
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const RebootRadarRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      handleRefresh(setURL, url1, url2);
    }
  }, [isVisible]);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setPosition({ x: 0, y: 0 });
    } else {
      setPosition({ x: 20, y: 20 });
    }
    handleRefresh(setURL, url1, url2);
  };

  return (
    isVisible && (
      <Draggable
        handle=".RebootRadar-header"
        bounds="parent"
        position={position}
        onStop={(e, data) => handleDragStop(e, data, isMaximized, setPosition)}
        disabled={isMaximized}
      >
        <div
          ref={RebootRadarRef}
          className={`RebootRadar ${isMaximized ? "RebootRadar--maximized" : ""}`}
          style={{
            width: isMaximized ? "100%" : "1100px",
            height: isMaximized ? "100%" : "650px",
          }}
        >
          <div className="RebootRadar-header">
            <div className="RebootRadar-window-controls">
              <button
                className="RebootRadar-control RebootRadar-control--close"
                onClick={() => handleClose(setIsVisible)}
              ></button>
              <button
                className="RebootRadar-control RebootRadar-control--minimize"
                onClick={() => handleMinimize(setIsVisible)}
              ></button>
              <button
                className="RebootRadar-control RebootRadar-control--maximize"
                onClick={handleMaximize}
              ></button>
            </div>
            <div className="RebootRadar-title">Reboot Radar</div>
            <button
              className="RebootRadar-refresh"
              onClick={() => handleRefresh(setURL, url1, url2)}
            >
              <RefreshCcw />
            </button>
          </div>
          <div className="RebootRadar-content">
            <iframe
              src={url}
              style={{
                width: "100%",
                height: "calc(100% - 50px)",
                border: "none",
              }}
              title="Reboot Radar"
            />
          </div>
        </div>
      </Draggable>
    )
  );
};

export default RebootRadar;
