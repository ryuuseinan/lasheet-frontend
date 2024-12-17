import React from 'react';
import BeatmapItem from './BeatmapItem';
import './BeatmapList.css';  // Asegúrate de tener el archivo CSS adecuado
const BeatmapList = ({ beatmaps }) => {
  if (!beatmaps || beatmaps.length === 0) {
    return <div>No beatmaps available.</div>; // Muestra un mensaje si no hay datos
  }

  return (
    <div className="beatmap-list">
      {beatmaps.map((beatmap) => (
        <BeatmapItem key={beatmap.id} beatmap={beatmap} />
      ))}
    </div>
  );
};

export default BeatmapList;
