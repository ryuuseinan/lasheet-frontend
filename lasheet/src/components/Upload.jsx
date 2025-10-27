import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Upload.css';
import { API_BASE_URL } from '../config';
import { useBeatmaps } from '../context/BeatmapContext';
import { useToast } from '../context/ToastContext';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [progress, setProgress] = useState(0); // Para la barra de progreso
  const [uploadSpeed, setUploadSpeed] = useState(0); // Para la velocidad de subida en MBps
  const [startTime, setStartTime] = useState(null); // Para calcular la velocidad
  const [isUploading, setIsUploading] = useState(false); // Bloquea botón y muestra animación
  
  const { refreshBeatmaps } = useBeatmaps();
  const navigate = useNavigate();
  const { showSuccess, showError, showInfo } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setUploadMessage(''); // Clear any previous messages
    if (selectedFile) {
      showInfo(`File selected: ${selectedFile.name}`, 2000);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (!file) {
      const errorMsg = 'Please select a .osz file before uploading.';
      setUploadMessage(errorMsg);
      showError(errorMsg);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

  const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE_URL}/api/upload`, true);

    // Calcular la velocidad de subida
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(percentComplete);

        // Calcular velocidad en MBps
        if (startTime) {
          const elapsedTime = (Date.now() - startTime) / 1000; // En segundos
          const bytesPerSecond = event.loaded / elapsedTime;
          const mbps = (bytesPerSecond / (1024 * 1024)).toFixed(2);
          setUploadSpeed(mbps);
        }
      }
    };

    // Cuando la subida empieza
    xhr.onloadstart = () => {
      setStartTime(Date.now()); // Empezar a contar el tiempo cuando la subida comienza
      setIsUploading(true);
      setUploadMessage('');
      setProgress(0);
      setUploadSpeed(0);
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        setUploadMessage('File uploaded and processed successfully! Redirecting...');
        // Mostrar notificación de éxito
        showSuccess('Beatmap uploaded successfully! Updating list...', 3000);
        // Refrescar la lista de beatmaps después de una subida exitosa
        await refreshBeatmaps();
        // Redirigir a la página principal después de 1.5 segundos
        setTimeout(() => {
          navigate('/');
          showSuccess('Welcome back! Your new beatmap is now available.', 4000);
        }, 1500);
      } else {
        const errorMsg = 'Error uploading file. Please try again.';
        setUploadMessage(errorMsg);
        showError(errorMsg);
      }
    };

    xhr.onerror = () => {
      const errorMsg = 'Network error occurred during upload.';
      setUploadMessage(errorMsg);
      showError(errorMsg);
    };

    // Siempre que termine (success o error) quitamos el bloqueo
    xhr.onloadend = () => {
      setIsUploading(false);
      setStartTime(null);
    };

    xhr.send(formData);
  };

  return (
    <div className="upload-container">
      <h1>Upload Beatmap</h1>
      <form onSubmit={handleUpload}>
        <div>
          <label htmlFor="file">Choose a .osz file to upload:</label>
          <input
            type="file"
            id="file"
            accept=".osz"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
        <button type="submit" disabled={isUploading} aria-busy={isUploading}>
          {isUploading ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              Uploading...
            </>
          ) : (
            <>
              <i className="fa fa-upload" aria-hidden="true"></i> Upload
            </>
          )}
        </button>
      </form>

      {uploadMessage && <p>{uploadMessage}</p>}

      {/* Barra de Progreso */}
      {progress > 0 && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {/* Velocidad de subida en MBps */}
      {uploadSpeed > 0 && (
        <p className="upload-speed">
          Upload Speed: {uploadSpeed} MBps
        </p>
      )}
    </div>
  );
};

export default Upload;
