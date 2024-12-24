import React, { useState, useRef, useEffect } from "react";
import "./Finder.css";
import Draggable from "react-draggable";
import FileList from "./Tools/FileList";
import Toolbar from "./Tools/Toolbar";
import Preview from "./Tools/Preview";

const Finder = ({ isVisible, setIsVisible, parentRef }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const finderRef = useRef(null);

  const [files, setFiles] = useState([
    {
      name: "storm_alert.txt",
      type: "text",
      content: `
<h2>Storm Alert</h2>
<ul>
  <li><b>Tilted Towers:</b> Evacuate immediately, storm approaching!</li>
  <li><b>Loot Lake:</b> Circle closing in fast, gather resources now.</li>
  <li><b>Shattered Slabs:</b> Final fight expected here.</li>
</ul>
<p style="color: red;"><em>Prepare your squad for the final battle!</em></p>


`,
    },
 
    {
      name: "dailyquests.txt",
      type: "text",
      content: `
  <h2>Tasks to Complete</h2>
<ol>
  <li>Gather materials at Slappy Shores.</li>
  <li>Deploy the shield bubble in Mega City.</li>
  <li>Activate the Rift Gate near Shattered Slabs.</li>
  <li>Eliminate the boss at Brutal Bastion.</li>
  <li>Claim victory at the final circle!</li>
</ol>
<p style="color: green;"><strong>Complete tasks to get that wonderful XP!</strong></p>

`,
    },
  
    {
      name: "squad_tasks.txt",
      type: "text",
      content: `
<h2>Squad Objectives</h2>
<ol>
  <li>Secure weapons at Mega City.</li>
  <li>Use the Rift Gate to rotate to the next zone.</li>
  <li>Build cover during the final circle.</li>
  <li>Eliminate the boss at Brutal Bastion.</li>
  <li>Claim Victory Royale!</li>
</ol>
<p style="color: green;"><strong>Teamwork is the key to success!</strong></p>

`,
    },
    
    {
      name: "stormreport.txt",
      type: "text",
      content: `
<h2>Storm Events</h2>
<p><strong>Storm Surge:</strong> Activated twice this match.</p>
<p><strong>Circle Shrinking:</strong> Final phase active.</p>
<p><strong>Warning:</strong> Loot fast, or risk elimination!</p>
<p style="color: orange;"><em>Tip:</em> Stay ahead of the storm and plan rotations wisely.</p>

`,
    },
    {
      name: "map.json",
      type: "text",
      content: `
{
  "location": "Tilted Towers",
  "tasks": ["Harvest materials", "Engage nearby squads"],
  "status": "Zone Safe"
}

`,
    },
  
    {
      name: "chat.txt",
      type: "text",
      content: `
<h2>Squad Communications</h2>
<blockquote>
  <p>"Rotate to the circle now!" - Lynx</p>
  <p>"Watch out for snipers!" - Drift</p>
  <p>"Grab the loot and run!" - Peely</p>
</blockquote>
<p><strong>Last Action:</strong> Built cover near Loot Lake.</p>
`,
    },
   
    {
      name: "riftstatus.txt",
      type: "text",
      content: `
<h2>Rift Gate Report</h2>
<p><strong>Status:</strong> <span style="color: red;">Under Heavy Use</span></p>
<p><strong>Last Location:</strong> Near Mega City</p>
<p><strong>Warning:</strong> Anomalies detected. Rift usage may destabilize the match.</p>  
`,
    },
    {
      name: "match_summary.txt",
      type: "text",
      content: `
<h2>Victory Royale</h2>
<p>Your squad eliminated the last enemy team!</p>
<p style="color: gold;"><strong>GG! Celebrate with your best dance emote!</strong></p>
`,
    },
   
    {
      name: "lootguide.txt",
      type: "text",
      content: `
<h2>Loot Guide</h2>
<ul>
  <li><strong>Legendary Assault Rifle:</strong> Found at Tilted Towers.</li>
  <li><strong>Shield Potion:</strong> Available in Loot Lake chests.</li>
  <li><strong>Launch Pad:</strong> Acquired near Brutal Bastion.</li>
</ul>
<p style="color: green;">Gear up for the fight of your life!</p>

`,
    },
 
    {
      name: "storm_map.json",
      type: "text",
      content: `
{
  "zone": "Final Circle",
  "locations": ["Tilted Towers", "Loot Lake"],
  "status": "Danger"
}

  `,
    },
   
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "f" && selectedFile) {
        e.preventDefault();
        setShowPreview(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === "f") {
        setShowPreview(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedFile]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleMinimize = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setPosition({ x: 0, y: 0 });
    } else {
      setPosition({ x: 20, y: 20 });
    }
  };

  const handleDragStop = (e, data) => {
    if (!isMaximized) {
      setPosition({ x: data.x, y: data.y });
    }
  };

  return (
    isVisible && (
      <Draggable
        handle=".finder__header"
        bounds="parent"
        position={position}
        onStop={handleDragStop}
        disabled={isMaximized}
      >
        <div
          ref={finderRef}
          className={`finder ${isMaximized ? "finder--maximized" : ""}`}
          style={{
            width: isMaximized ? "100%" : "800px",
            height: isMaximized ? "100%" : "600px",
          }}
        >
          <div className="finder__header">
            <div className="finder__window-controls">
              <button
                className="finder__control finder__control--close"
                onClick={handleClose}
              ></button>
              <button
                className="finder__control finder__control--minimize"
                onClick={handleMinimize}
              ></button>
              <button
                className="finder__control finder__control--maximize"
                onClick={handleMaximize}
              ></button>
            </div>
            <div className="finder__title">BattleFinder</div>
          </div>
          <Toolbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="tip">Hold f to preview.</div>
          <div className="finder__content">
            <FileList
              files={files}
              searchTerm={searchTerm}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </div>
          {showPreview && selectedFile && <Preview file={selectedFile} />}
        </div>
      </Draggable>
    )
  );
};

export default Finder;
