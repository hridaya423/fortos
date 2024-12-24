import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { RefreshCcw } from "lucide-react";
import "./RiftCode.css";
import {
  handleRefresh,
  handleMinimize,
  handleClose,
  handleDragStop,
  handleMaximize,
} from "../../../scripts/index";

const RiftCode = ({ isVisible, setIsVisible }) => {
  const [url, setURL] = useState("https://qrcodegenerator-kappa.vercel.app/");
  const url1 = "https://qrcodegenerator-kappa.vercel.app/";
  const url2 = "https://qrcodegenerator-kappa.vercel.app/";
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const RiftCodeRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      handleRefresh(setURL, url1, url2);
    }
  }, [isVisible]);

  return (
    isVisible && (
      <Draggable
        handle=".RiftCode-header"
        bounds="parent"
        position={position}
        onStop={(e, data) => handleDragStop(e, data, isMaximized, setPosition)}
        disabled={isMaximized}
      >
        <div
          ref={RiftCodeRef}
          className={`RiftCode ${isMaximized ? "RiftCode--maximized" : ""}`}
          style={{
            width: isMaximized ? "100%" : "800px",
            height: isMaximized ? "100%" : "600px",
          }}
        >
          <div className="RiftCode-header">
            <div className="RiftCode-window-controls">
              <button
                className="RiftCode-control RiftCode-control--close"
                onClick={() => handleClose(setIsVisible)}
              ></button>
              <button
                className="RiftCode-control RiftCode-control--minimize"
                onClick={() => handleMinimize(setIsVisible)}
              ></button>
              <button
                className="RiftCode-control RiftCode-control--maximize"
                onClick={() =>
                  handleMaximize(setIsMaximized, isMaximized, setPosition)
                }
              ></button>
            </div>
            <div className="RiftCode-title">Rift Code</div>
            <button
              className="RiftCode-refresh"
              onClick={() => handleRefresh(setURL, url1, url2)}
            >
              <RefreshCcw />
            </button>
          </div>
          <div className="RiftCode-content">
            <iframe
              src={url}
              style={{
                width: "100%",
                height: "calc(100% - 50px)",
                border: "none",
              }}
              title="Rift Code"
            />
          </div>
        </div>
      </Draggable>
    )
  );
};

export default RiftCode;
