import React from 'react';
import './BeatmapItem.css';  // Asegúrate de tener el archivo CSS adecuado

const BeatmapItem = ({ beatmap }) => {
  if (!beatmap) {
    return <div>Loading...</div>;  // O un mensaje adecuado si beatmap es undefined
  }
const imagePath = ``;

  return (
    <div className="beatmap-item-box">
      <div className="beatmap-item">
        <div className="bg-image" style={{ backgroundImage: `url(http://127.0.0.1:5000/assets/${beatmap.bg})` }}></div>
        
        <div className="card-content">
            <p className="artist-title-beatmap">
                <a href={`/beatmaps/${beatmap.id}`}>{beatmap.artist} - {beatmap.title}</a>
            </p>

            <p className="artist-title-beatmap">Mapped by <a href={`https://osu.ppy.sh/users/${beatmap.creator}`}>{beatmap.creator}</a></p>
          
          <div className="diff-container">
            {beatmap.difficulties.map((difficulty) => (
              <img 
                key={difficulty.id}
                src={getDifficultyImage(difficulty.star_rating)}
                title={`${difficulty.version} - ${difficulty.star_rating}★`} 
                alt={difficulty.version}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Función que devuelve la URL de la imagen según el rating
const getDifficultyImage = (starRating) => {
  if (starRating <= 1.99) return 'https://i.ppy.sh/e4046437c0d195a3f2bed4b4140a41d696bdf7f0/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f656173792d6f2e706e673f3230323131323135';
  if (starRating <= 2.69) return 'https://i.ppy.sh/20d7052354c61f8faf3a4828d9ff7751bb6776b1/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f6e6f726d616c2d6f2e706e673f3230323131323135';
  if (starRating <= 3.99) return 'https://i.ppy.sh/f6eabcfbacdfe85e520106702ec3a382a0430d40/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f696e73616e652d6f2e706e673f3230323131323135';
  if (starRating <= 5.29) return 'https://i.ppy.sh/f6eabcfbacdfe85e520106702ec3a382a0430d40/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f696e73616e652d6f2e706e673f3230323131323135';
  if (starRating <= 6.49) return 'https://i.ppy.sh/cd145e0f3cf7039d72cb7cfe58f3931585f8e7a7/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f6578706572742d6f2e706e673f3230323131323135';
  return 'https://i.ppy.sh/3b561ef8a73118940b59e79f3433bfa98c26cbf1/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f657870657274706c75732d6f2e706e673f3230323131323135';
};

export default BeatmapItem;
