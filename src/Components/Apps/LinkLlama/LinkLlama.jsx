import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { RefreshCcw } from "lucide-react";
import "./linkllama.css";
import {
  handleRefresh,
  handleMinimize,
  handleClose,
  handleMaximize,
  handleDragStop,
} from "../../../scripts/index";
// f
const LinkLlama = ({ isVisible, setIsVisible }) => {
  const [url, setURL] = useState("https://urlshortener-wine.vercel.app/");
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const url1 = "https://urlshortener-wine.vercel.app/";
  const url2 = "https://urlshortener-wine.vercel.app/";
  const LinkLlamaRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      handleRefresh(setURL, url1, url2);
    }
  }, [isVisible]);

  return (
    isVisible && (
      <Draggable
        handle=".LinkLlama-header"
        bounds="parent"
        position={position}
        onStop={(e, data) => handleDragStop(e, data, isMaximized, setPosition)}
        disabled={isMaximized}
      >
        <div
          ref={LinkLlamaRef}
          className={`LinkLlama ${isMaximized ? "LinkLlama--maximized" : ""}`}
          style={{
            width: isMaximized ? "100%" : "800px",
            height: isMaximized ? "100%" : "600px",
          }}
        >
          <div className="LinkLlama-header">
            <div className="LinkLlama-window-controls">
              <button
                className="LinkLlama-control LinkLlama-control--close"
                onClick={() => handleClose(setIsVisible)}
              ></button>
              <button
                className="LinkLlama-control LinkLlama-control--minimize"
                onClick={() => handleMinimize(setIsVisible)}
              ></button>
              <button
                className="LinkLlama-control LinkLlama-control--maximize"
                onClick={() =>
                  handleMaximize(setIsMaximized, isMaximized, setPosition)
                }
              ></button>
            </div>
            <div className="LinkLlama-title">Link Llama</div>
            <button
              className="LinkLlama-refresh"
              onClick={() => handleRefresh(setURL, url1, url2)}
            >
              <RefreshCcw />
            </button>
          </div>
          <div className="LinkLlama-content">
            <iframe
              src={url}
              style={{
                width: "100%",
                height: "calc(100% - 50px)",
                border: "none",
              }}
              title="URL Shortener"
            />
          </div>
        </div>
      </Draggable>
    )
  );
};

export default LinkLlama;
