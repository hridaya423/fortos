import React, { useState} from 'react';

const backgroundImages = [
  {
    id: 'fortnite1',
    name: 'Fortnite Landscape',
    url: 'https://wallpapers.com/images/hd/cool-fortnite-missile-barrage-gvvhgse1rhfczzzb.jpg'
  },
  {
    id: 'fortnite2',
    name: 'Fortnite Players',
    url: 'https://wallpapers.com/images/hd/fortnite-1920x1080-hd-cvavgntkwzkn72rg.jpg'
  },
  {
    id: 'fortnite3',
    name: 'Season 6 Fortnite',
    url: 'https://wallpapercave.com/wp/wp13448467.jpg'
  },
  {
    id: 'fortnite4',
    name: 'Season 6 Fortnite',
    url: 'https://images.alphacoders.com/132/1326064.jpeg'
  },
  {
    id: 'fortnite5',
    name: 'Season 6 Fortnite',
    url: 'https://wallpapers.com/images/hd/fortnite-cool-pictures-1500-x-1000-awswvhfgn4nezmut.jpg'
  },
  {
    id: 'fortnite6',
    name: 'Fortnite loading screen',
    url: 'https://wallpapercat.com/w/full/2/0/8/1143-3840x2160-desktop-4k-fortnite-background-photo.jpg'
  },
];

const BackgroundSettings = () => {
  const [currentBackground, setCurrentBackground] = useState(() => {
    return localStorage.getItem('backgroundImage') || backgroundImages[4].url;
  });

  const handleBackgroundChange = (imageUrl) => {
    setCurrentBackground(imageUrl);
    localStorage.setItem('backgroundImage', imageUrl);
    window.dispatchEvent(new CustomEvent('backgroundChanged', { 
      detail: { backgroundUrl: imageUrl } 
    }));
  };

  return (
    <div className="background-settings p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Background Settings</h2>
      <div className="grid grid-cols-3 gap-4">
        {backgroundImages.map((image) => (
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

export default BackgroundSettings