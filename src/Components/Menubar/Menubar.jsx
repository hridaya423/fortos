import React from "react";

import "./Menubar.css";
import FortniteAppleLogo from "./FortniteAppleLogo";
import WifiMenu from "./WifiMenu";
import ControlCenter from "./ControlCenter";
import Clock from "./Clock";

export default function MenuBar() {
  return (
    <div className="menubar">
      <FortniteAppleLogo />
      <div className="menubar-right">
        <WifiMenu />
        <Clock />
        <ControlCenter />
      </div>
    </div>
  );
}
