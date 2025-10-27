import React from 'react';
import BeatmapItem from './BeatmapItem';
import './BeatmapList.css';  // Asegúrate de tener el archivo CSS adecuado
import { useBeatmaps } from '../context/BeatmapContext';

const BeatmapList = () => {
  const { beatmaps, isLoading, error } = useBeatmaps();

  if (isLoading) {
    return <div className="loading">Loading beatmaps...</div>;
  }

  if (error) {
    return <div className="error">Error loading beatmaps: {error}</div>;
  }

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
