import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { RefreshCcw } from "lucide-react";
import "./SniperSolver.css";
import {
  handleRefresh,
  handleMinimize,
  handleClose,
  handleDragStop,
  handleMaximize,
} from "../../../scripts/index";


const SniperSolver = ({ isVisible, setIsVisible }) => {
  const [url, setURL] = useState("https://sudokusolver-navy.vercel.app/");
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const url1 = "https://sudokusolver-navy.vercel.app/";
  const url2 = "https://sudokusolver-navy.vercel.app/";
  const SniperSolverRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      handleRefresh(setURL, url1, url2);
    }
  }, [isVisible]);

  return (
    isVisible && (
      <Draggable
        handle=".SniperSolver-header"
        bounds="parent"
        position={position}
        onStop={(e, data) => handleDragStop(e, data, isMaximized, setPosition)}
        disabled={isMaximized}
      >
        <div
          ref={SniperSolverRef}
          className={`SniperSolver ${
            isMaximized ? "SniperSolver--maximized" : ""
          }`}
          style={{
            width: isMaximized ? "100%" : "900px",
            height: isMaximized ? "100%" : "600px",
          }}
        >
          <div className="SniperSolver-header">
            <div className="SniperSolver-window-controls">
              <button
                className="SniperSolver-control SniperSolver-control--close"
                onClick={() => handleClose(setIsVisible)}
              ></button>
              <button
                className="SniperSolver-control SniperSolver-control--minimize"
                onClick={() => handleMinimize(setIsVisible)}
              ></button>
              <button
                className="SniperSolver-control SniperSolver-control--maximize"
                onClick={() =>
                  handleMaximize(setIsMaximized, isMaximized, setPosition)
                }
              ></button>
            </div>
            <div className="SniperSolver-title">Sniper Solver</div>
            <button
              className="SniperSolver-refresh"
              onClick={() => handleRefresh(setURL, url1, url2)}
            >
              <RefreshCcw />
            </button>
          </div>
          <div className="SniperSolver-content">
            <iframe
              src={url}
              style={{
                width: "100%",
                height: "calc(100% - 50px)",
                border: "none",
              }}
              title="Sniper Solver"
            />
          </div>
        </div>
      </Draggable>
    )
  );
};

export default SniperSolver;
