import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BeatmapList from './components/BeatmapList';
import BaseLayout from './components/BaseLayout';
import BeatmapPage from './components/BeatmapPage'; // Nueva página para mostrar un beatmap
import Upload from './components/Upload';
import Alert from './components/Alert';
import ToastContainer from './components/ToastContainer';
import { BeatmapProvider } from './context/BeatmapContext';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  return (
    <ToastProvider>
      <BeatmapProvider>
        <Router>
          <BaseLayout>
            <Alert />
            <ToastContainer />
            <Routes>
              {/* Ruta principal: lista de beatmaps */}
              <Route path="/" element={<BeatmapList />} />
              {/* Ruta de upload */}
              <Route path="/upload" element={<Upload />} />
              {/* Ruta dinámica: página de un beatmap específico */}
              <Route path="/beatmaps/:id" element={<BeatmapPage />} />
            </Routes>
          </BaseLayout>
        </Router>
      </BeatmapProvider>
    </ToastProvider>
  );
};

export default App;
