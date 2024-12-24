import React, { useState, useEffect, useRef } from "react";
import { handleClose, handleDragStop, handleMaximize, handleMinimize } from "../../../scripts/index";
import Draggable from "react-draggable";
import victoryRoyale from "../../../assets/sound/victory-royale.mp3";

const FortniteShell = ({ isVisible, setIsVisible }) => {
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const inputRef = useRef();
  const shellRef = useRef();
  const shellContentRef = useRef();
  const [files] = useState([
    "battle-pass.txt", "Victory_Royale.log", "skins.json", "map.json",
    "weapons.txt", "emotes.bin", "battle-bus.png", "llama.gif",
    "drop-location.txt", "storm-circle.txt"
  ]);

  useEffect(() => {
    if (shellContentRef.current) {
      shellContentRef.current.scrollTop = shellContentRef.current.scrollHeight;
    }
  }, [output]);

  const commands = {
    help: `🏆Battle Shell Commands 🎮\n
    Available commands:
    help - Show this menu
    ls - List files
    clear - Clear screen
    exit - Close terminal
    echo - Print text
    battle-pass - Check Battle Pass status
    drop - Choose landing spot
    inventory - Check inventory
    victory - Play Victory Royale sound
    emote - Random dance
    storm - Check storm circle
    stats - View player stats`,
    
    ls: () => files.join("\n"),
    clear: () => {
      setOutput([]);
      return "Screen cleared like a fresh map!";
    },
    exit: () => {
      setTimeout(() => {
        setIsVisible(false);
        setOutput([]);
      }, 400);
      return "Dropping out of the terminal...";
    },
    echo: (args) => args.join(" ") || "Usage: echo [message]",
    "battle-pass": () => {
      const levels = ["Basic", "Battle", "Legendary"];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      return `Battle Pass Status: Tier ${Math.floor(Math.random() * 100)} - ${randomLevel} Level Unlocked! 🌟`;
    },
    drop: (args) => {
      const locations = ["Tilted Towers", "Pleasant Park", "Retail Row", "Salty Springs", "Lazy Lake"];
      const spot = args[0] || locations[Math.floor(Math.random() * locations.length)];
      return `Dropping into ${spot}! Get ready to eliminate! 💥`;
    },
    inventory: () => {
      const weapons = ["Pump Shotgun", "Assault Rifle", "Legendary Sniper", "Dual Pistols", "Rocket Launcher"];
      return `🎒 Inventory:\n${weapons.map(w => `• ${w}`).join("\n")}\n\nReady to secure that Victory Royale! 🏆`;
    },
    victory: () => {
      const victoryAudio = new Audio(victoryRoyale);
      victoryAudio.play();
      return "VICTORY ROYALE! 🎉🏆";
    },
    emote: () => {
      const emotes = ["Flossing 💃", "Take the L 🕺", "Default Dancing 🤪", "Ride the Pony 🐎"];
      return `Performing: ${emotes[Math.floor(Math.random() * emotes.length)]}`;
    },
    storm: () => {
      const circles = ["First Circle: 1 DPS", "Second Circle: 2 DPS", "Final Circle: 5 DPS"];
      return "🌪️ Storm Circle Incoming:\n" + circles.join("\n");
    },
    stats: () => ({
      eliminations: Math.floor(Math.random() * 20),
      wins: Math.floor(Math.random() * 10),
      topTen: Math.floor(Math.random() * 50),
      message: "Keep grinding for that Victory Royale! 🏆"
    })
  };

  const handleCommand = (command) => {
    const [cmd, ...args] = command.split(" ");
    if (cmd === "clear") {
      setOutput([]);
      return;
    }

    if (commands[cmd]) {
      const response = typeof commands[cmd] === "function" ? commands[cmd](args) : commands[cmd];
      setOutput((prev) => [
        ...prev,
        `<span class="text-emerald-400 font-mono">fortnite@battleroyale:~$ </span>${command}`,
        typeof response === 'object' ? JSON.stringify(response, null, 2) : response
      ]);
      if (cmd === "exit") {
        setTimeout(() => setIsVisible(false), 1000);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        `<span class="text-emerald-400 font-mono">fortnite@battleroyale:~$ </span>${command}`,
        "Error: Command not found. Type `help` for available commands! 🎮",
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.length === 0) return;
      handleCommand(input.trim());
      setInput("");
    }
  };

  return isVisible ? (
    <Draggable
      handle=".shell-header"
      bounds="parent"
      position={position}
      onStop={(e, data) => handleDragStop(e, data, isMaximized, setPosition)}
      disabled={isMaximized}
    >
      <div
        ref={shellRef}
        className={`relative ${
          isMaximized ? "w-full h-full" : "w-[680px] h-[490px]"
        } bg-gradient-to-r from-blue-500 to-emerald-500 border-4 border-yellow-400 rounded-lg overflow-hidden shadow-2xl`}
      >
        <div 
          className="h-full flex flex-col"
          onClick={() => inputRef.current.focus()}
        >
          <div className="shell-header flex items-center justify-between px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 shadow-md">
            <div className="flex gap-2">
              <button
                onClick={() => handleClose(setIsVisible)}
                className="w-3 h-3 rounded-full border-2 border-black/30 bg-red-500 hover:scale-110 transition-transform"
              />
              <button
                onClick={() => handleMinimize(setIsVisible)}
                className="w-3 h-3 rounded-full border-2 border-black/30 bg-yellow-400 hover:scale-110 transition-transform"
              />
              <button
                onClick={() => handleMaximize(setIsMaximized, isMaximized, setPosition)}
                className="w-3 h-3 rounded-full border-2 border-black/30 bg-emerald-500 hover:scale-110 transition-transform"
              />
            </div>
            <div className="font-bold text-black text-shadow text-lg">
              🎮 BattleShell 🏆
            </div>
          </div>

          <div
            ref={shellContentRef}
            className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-black/70 border-t-2 border-yellow-400"
          >
            {output.map((line, index) => (
              <pre
                key={index}
                className="text-emerald-400 max-w-[80%] break-all whitespace-pre-wrap mb-1"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
            <div className="flex items-center mt-2 border-t border-emerald-400 pt-2">
              <span className="text-emerald-400">fortnite@battleroyale:~$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-emerald-400 outline-none ml-2 font-mono"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  ) : null;
};

export default FortniteShell;