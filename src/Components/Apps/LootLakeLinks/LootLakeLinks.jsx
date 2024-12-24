import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { RefreshCw, Search, ExternalLink } from "lucide-react";
import {
  handleClose,
  handleMinimize,
  handleDragStop,
  handleMaximize,
} from "../../../scripts/index";
import "./FortniteBrowser.css";

const FortniteBrowser = ({ isVisible, setIsVisible }) => {
  const [url, setUrl] = useState("https://www.epicgames.com/fortnite/en-US/home");
  const [inputUrl, setInputUrl] = useState(
    "https://www.epicgames.com/fortnite/en-US/home"
  );
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

  const handleRefresh = () => {
    setError(null);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError(null);

    let searchUrl;
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i;

    if (inputUrl.match(urlPattern)) {
      searchUrl = inputUrl.startsWith("http")
        ? inputUrl
        : `https://${inputUrl}`;
    } else {
      searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        inputUrl
      )}`;
    }

    setUrl(searchUrl);
    setInputUrl(searchUrl);
  };

  const handleIframeError = () => {
    setError(
      "Victory Royale Loading Error! Click below to open in a new tab."
    );
  };

  const openInNewTab = () => {
    window.open(url, "_blank");
  };

  const handleIframeLoad = () => {
    setInputUrl(url);
  };

  return (
    isVisible && (
      <Draggable
        handle=".browser-header"
        bounds="parent"
        position={position}
        onStop={(e, data) => handleDragStop(e, data, isMaximized, setPosition)}
        disabled={isMaximized}
      >
        <div
          className={`fortnite-browser ${isMaximized ? "fortnite-browser--maximized" : ""}`}
          style={{
            width: isMaximized ? "100%" : "900px",
            height: isMaximized ? "100%" : "500px",
          }}
        >
          <div className="browser-header">
            <div className="browser-window-controls">
              <button
                className="browser-control browser-control--close"
                onClick={() => handleClose(setIsVisible)}
              ></button>
              <button
                className="browser-control browser-control--minimize"
                onClick={() => handleMinimize(setIsVisible)}
              ></button>
              <button
                className="browser-control browser-control--maximize"
                onClick={() =>
                  handleMaximize(setIsMaximized, isMaximized, setPosition)
                }
              ></button>
            </div>
            <div className="browser-title">Loot Lake Links</div>
            <div></div>
          </div>
          <div className="browser-toolbar">
            <form onSubmit={handleSearch} className="browser-search">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Drop into a search... or enter URL"
                className="browser-search-input"
              />
              <button type="submit" className="browser-search-button">
                <Search size={16} />
              </button>
            </form>
            <button className="browser-refresh" onClick={handleRefresh}>
              <RefreshCw size={16} />
            </button>
          </div>
          <div className="browser-content">
            {error ? (
              <div className="browser-error">
                <p>{error}</p>
                <button onClick={openInNewTab} className="browser-error-button">
                  Redeploy to New Tab <ExternalLink size={16} />
                </button>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={url}
                onError={handleIframeError}
                onLoad={handleIframeLoad}
                title="Loot Lake Links"
              />
            )}
          </div>
        </div>
      </Draggable>
    )
  );
};

export default FortniteBrowser;