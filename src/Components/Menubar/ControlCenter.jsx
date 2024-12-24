import React, { useState } from "react";
import { LayoutGrid, Settings, SettingsIcon } from "lucide-react";
import BackgroundSettings from "./BackgroundSettings";
import MemeSettings from "./LoadingScreenSettings";
import LockScreenSettings from "./LockScreenSettings";

const ControlCenter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="menu-item control-center"
      onClick={() => setIsOpen(!isOpen)}
    >
      <SettingsIcon className="icon" />
      {isOpen && (
        <div className="dropdown">
          <BackgroundSettings />
          <MemeSettings />
          <LockScreenSettings />
        </div>
      )}
    </div>
  );
};

export default ControlCenter;
