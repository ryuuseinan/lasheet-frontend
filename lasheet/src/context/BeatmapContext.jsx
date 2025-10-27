import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const BeatmapContext = createContext();

export const useBeatmaps = () => {
  const context = useContext(BeatmapContext);
  if (!context) {
    throw new Error('useBeatmaps must be used within a BeatmapProvider');
  }
  return context;
};

export const BeatmapProvider = ({ children }) => {
  const [beatmaps, setBeatmaps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBeatmaps = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/beatmaps`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBeatmaps(data);
    } catch (error) {
      console.error("Error fetching beatmaps:", error);
      setError(error.message);
      setBeatmaps([]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBeatmaps = async () => {
    await fetchBeatmaps();
  };

  useEffect(() => {
    fetchBeatmaps();
  }, []);

  const value = {
    beatmaps,
    isLoading,
    error,
    refreshBeatmaps,
    fetchBeatmaps
  };

  return (
    <BeatmapContext.Provider value={value}>
      {children}
    </BeatmapContext.Provider>
  );
};