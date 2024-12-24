import React, { useState } from "react";

import "./OS.css";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";
import LockScreen from "./../LockScreen/LockScreen";
import Desktop from "../Desktop/Desktop";
import Background from "./../Background/Background";
const OS = () => {
  const [loaded, setLoaded] = useState(false);
  const [lockscreenVisible, setlockscreenVisible] = useState(true);
  return (
    <div className="OS">
      <div className="preflight">
        {!loaded && <LoadingScreen setLoaded={setLoaded} />}
        {loaded && (
          <LockScreen
            isVisible={lockscreenVisible}
            setIsVisible={setlockscreenVisible}
          />
        )}
      </div>
      {!lockscreenVisible && (
        <main className="main">
          <Background />
          <Desktop />
        </main>
      )}
    </div>
  );
};

export default OS;
