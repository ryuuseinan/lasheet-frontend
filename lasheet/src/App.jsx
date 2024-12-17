import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BeatmapList from './components/BeatmapList';
import BaseLayout from './components/BaseLayout';
import BeatmapPage from './components/BeatmapPage'; // Nueva página para mostrar un beatmap

const App = () => {
  const [beatmaps, setBeatmaps] = useState([]);

  useEffect(() => {
    const fetchBeatmaps = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/beatmaps"); // Reemplaza con la URL de tu API
        const data = await response.json();
        setBeatmaps(data); // Establece los datos obtenidos en el estado
      } catch (error) {
        console.error("Error fetching beatmaps:", error);
        setBeatmaps([]); // Establece un array vacío si ocurre un error
      }
    };

    fetchBeatmaps();
  }, []);

  return (
    <Router>
      <BaseLayout>
        <Routes>
          {/* Ruta principal: lista de beatmaps */}
          <Route path="/" element={<BeatmapList beatmaps={beatmaps} />} />
          {/* Ruta dinámica: página de un beatmap específico */}
          <Route path="/beatmaps/:id" element={<BeatmapPage />} />
        </Routes>
      </BaseLayout>
    </Router>
  );
};

export default App;
