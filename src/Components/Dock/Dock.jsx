import React, { useState } from "react";
import "./Dock.css";
import AppIcon from "./AppIcon/AppIcon";
import fortniteIcon from "../../assets/images/logo.webp";
import battlefinder from "../../assets/images/appicons/battlefinder.jpg";
import linkllama from "../../assets/images/appicons/linkllama.jpg";
import lootlakelinks from "../../assets/images/appicons/lootlakelinks.jpg";
import rebootradar from "../../assets/images/appicons/rebootradar.jpg";
import riftcode from "../../assets/images/appicons/riftcode.jpg";
import snipersolver from "../../assets/images/appicons/snipersolver.jpg";
import stormforecast from "../../assets/images/appicons/stormforecast.jpg";
import victoryglitch from "../../assets/images/appicons/victoryglitch.jpg";
import battleshell from "../../assets/images/appicons/battleshell.jpg";
import Finder from "../Apps/Finder/Finder";
import RiftCode from "../Apps/RiftCode/RiftCode";
import VictoryGlitch from "../Apps/VictoryGlitch/VictoryGlitch";
import BattleShell from "../Apps/BattleShell/BattleShell";
import RebootRadar from "../Apps/RebootRadar/RebootRadar";
import SniperSolver from "../Apps/SniperSolver/SniperSolver";
import LinkLlama from "../Apps/LinkLlama/LinkLlama";
import StormForecast from "../Apps/StormForecast/StormForecast";
import LootLakeLinks from "../Apps/LootLakeLinks/LootLakeLinks";
const Dock = () => {
  const [finderVisible, setFinderVisible] = useState(false);
  const [RiftCodeVisible, setRiftCodeVisible] = useState(false);
  const [BattleShellVisible, setBattleShellVisible] = useState(false);
  const [VictoryGlitchVisible, setVictoryGlitchVisible] = useState(false);
  const [RebootRadarVisible, setRebootRadarVisible] = useState(false);
  const [SniperSolverVisible, setSniperSolverVisible] = useState(false);
  const [LinkLlamaVisible, setLinkLlamaVisible] = useState(false);
  const [StormForecastVisible, setStormForecastVisible] = useState(false);
  const [LootLakeLinksVisible, setLootLakeLinksVisible] = useState(false);

  const [dockIcons, setDockIcons] = useState([
    {
      name: "Loot Lake Links",
      icon: lootlakelinks,
      onClick: () => setLootLakeLinksVisible((prev) => !prev),
    },
    {
      name: "BattleFinder",
      icon: battlefinder,
      onClick: () => setFinderVisible((prev) => !prev),
    },
    {
      name: "Victory Glitch",
      icon: victoryglitch,
      onClick: () => setVictoryGlitchVisible((prev) => !prev),
    },
    {
      name: "Storm Forecast",
      icon: stormforecast,
      onClick: () => setStormForecastVisible((prev) => !prev),
    },
    {
      name: "BattleShell",
      icon: battleshell,
      onClick: () => setBattleShellVisible((prev) => !prev),
    },
    {
      name: "Sniper Solver",
      icon: snipersolver,
      onClick: () => setSniperSolverVisible((prev) => !prev),
    },
    {
      name: "Reboot Radar",
      icon: rebootradar,
      onClick: () => setRebootRadarVisible((prev) => !prev),
    },
    {
      name: "Link Llama",
      icon: linkllama,
      onClick: () => setLinkLlamaVisible((prev) => !prev),
    },
    {
      name: "Rift Code",
      icon: riftcode,
      onClick: () => setRiftCodeVisible((prev) => !prev),
    },
  ]);

  return (
    <>
      <div className="dock">
        {dockIcons.map((dockIcon, index) => {
          return (
            <AppIcon
              key={index}
              name={dockIcon.name}
              icon={dockIcon.icon}
              handleClick={dockIcon.onClick}
            />
          );
        })}
      </div>
      <VictoryGlitch
        isVisible={VictoryGlitchVisible}
        setIsVisible={setVictoryGlitchVisible}
      />
      <Finder isVisible={finderVisible} setIsVisible={setFinderVisible} />
      <SniperSolver
        isVisible={SniperSolverVisible}
        setIsVisible={setSniperSolverVisible}
      />
      <RebootRadar isVisible={RebootRadarVisible} setIsVisible={setRebootRadarVisible} />
      <LinkLlama isVisible={LinkLlamaVisible} setIsVisible={setLinkLlamaVisible} />
      <RiftCode isVisible={RiftCodeVisible} setIsVisible={setRiftCodeVisible} />
      <StormForecast
        isVisible={StormForecastVisible}
        setIsVisible={setStormForecastVisible}
      />
      <LootLakeLinks
        isVisible={LootLakeLinksVisible}
        setIsVisible={setLootLakeLinksVisible}
      />
      <BattleShell isVisible={BattleShellVisible} setIsVisible={setBattleShellVisible} />
    </>
  );
};

export default Dock;
