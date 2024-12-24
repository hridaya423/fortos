import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { RefreshCcw } from "lucide-react";
import "./StormForecast.css";
import {
  handleRefresh,
  handleMinimize,
  handleClose,
  handleDragStop,
  handleMaximize,
} from "../../../scripts/index";

const StormForecast = ({ isVisible, setIsVisible }) => {
  const [url, setURL] = useState("https://weatheristic.vercel.app/");
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const StormForecastRef = useRef(null);
  const url1 = "https://weatheristic.vercel.app/";
  const url2 = "https://weatheristic.vercel.app/";
  useEffect(() => {
    if (isVisible) {
      handleRefresh(setURL, url1, url2);
    }
  }, [isVisible]);

  return (
    isVisible && (
      <Draggable
        handle=".StormForecast-header"
        bounds="parent"
        position={position}
        onStop={(e, data) => handleDragStop(e, data, isMaximized, setPosition)}
        disabled={isMaximized}
      >
        <div
          ref={StormForecastRef}
          className={`StormForecast ${isMaximized ? "StormForecast--maximized" : ""}`}
          style={{
            width: isMaximized ? "100%" : "900px",
            height: isMaximized ? "100%" : "600px",
          }}
        >
          <div className="StormForecast-header">
            <div className="StormForecast-window-controls">
              <button
                className="StormForecast-control StormForecast-control--close"
                onClick={() => handleClose(setIsVisible)}
              ></button>
              <button
                className="StormForecast-control StormForecast-control--minimize"
                onClick={() => handleMinimize(setIsVisible)}
              ></button>
              <button
                className="StormForecast-control StormForecast-control--maximize"
                onClick={() =>
                  handleMaximize(setIsMaximized, isMaximized, setPosition)
                }
              ></button>
            </div>
            <div className="StormForecast-title">Storm Forecast</div>
            <button
              className="StormForecast-refresh"
              onClick={() => handleRefresh(setURL, url1, url2)}
            >
              <RefreshCcw />
            </button>
          </div>
          <div className="StormForecast-content">
            <iframe
              src={url}
              style={{
                width: "100%",
                height: "calc(100% - 50px)",
                border: "none",
              }}
              title="Storm Forecast"
            />
          </div>
        </div>
      </Draggable>
    )
  );
};

export default StormForecast;
