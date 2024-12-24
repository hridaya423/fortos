import React, { useState } from 'react';

export const lockscreenBackgrounds = [
  {
    id: 'lock1',
    name: 'Dark Fortnite',
    url: 'https://wallpapers.com/images/hd/cool-fortnite-kitted-drift-background-habsg6w8yyjcme2p.jpg'
  },
  {
    id: 'lock2',
    name: 'Battle Pass',
    url: 'https://wallpapers.com/images/hd/fortnite-pc-fi78hssufr8rfrgp.jpg'
  },
  {
    id: 'lock3',
    name: 'Chapter 2',
    url: 'https://wallpapers.com/images/hd/fortnite-laptop-ohmh2iotjrp07zzt.jpg'
  },

];

const LockscreenBackgroundSettings = () => {
  const [currentBackground, setCurrentBackground] = useState(() => {
    return localStorage.getItem('lockscreenBackground') || lockscreenBackgrounds[0].url;
  });

  const handleBackgroundChange = (imageUrl) => {
    setCurrentBackground(imageUrl);
    localStorage.setItem('lockscreenBackground', imageUrl);
    window.dispatchEvent(new CustomEvent('lockscreenBackgroundChanged', { 
      detail: { backgroundUrl: imageUrl } 
    }));
  };

  return (
    <div className="background-settings p-4 bg-gray-100 rounded-lg mt-8">
      <h2 className="text-xl font-bold mb-4">Lockscreen Background</h2>
      <div className="grid grid-cols-3 gap-4">
        {lockscreenBackgrounds.map((image) => (
          <div 
            key={image.id} 
            className={`cursor-pointer p-2 rounded-lg transition-all 
              ${currentBackground === image.url 
                ? 'border-4 border-blue-500 opacity-100' 
                : 'opacity-70 hover:opacity-100'}`}
            onClick={() => handleBackgroundChange(image.url)}
          >
            <img 
              src={image.url} 
              alt={image.name}
              className="w-full h-24 object-cover rounded-md"
            />
            <p className="text-center mt-2 text-sm">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LockscreenBackgroundSettings;