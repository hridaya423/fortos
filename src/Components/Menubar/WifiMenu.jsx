import React, { useState } from "react";
import { Wifi } from "lucide-react";

const FortniteWifiMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative cursor-pointer p-1 bg-opacity-70 rounded-lg transition-colors duration-300"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Wifi className="text-yellow-400 w-6 h-6" />
      {isOpen && (
        <div className="absolute z-10 right-0 top-full mt-2 w-64 bg-gray-800 bg-opacity-90 border-2 border-yellow-500 rounded-lg shadow-lg">
          <div className="p-4 text-white">
            <div className="font-bold text-lg text-yellow-400">
              Victory Royale Network
            </div>
            <div className="text-sm mt-2">
              Connected to: TILTED_TOWERS_5G
            </div>
            <div className="text-xs text-yellow-400 mt-1">
              Signal Strength: Uncommon 😭
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Ping: 20ms (Battle Ready!)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FortniteWifiMenu;