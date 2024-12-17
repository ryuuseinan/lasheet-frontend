import React, { useState } from 'react';
import './Upload.css';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [progress, setProgress] = useState(0); // Para la barra de progreso
  const [uploadSpeed, setUploadSpeed] = useState(0); // Para la velocidad de subida en MBps
  const [startTime, setStartTime] = useState(null); // Para calcular la velocidad

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (!file) {
      setUploadMessage('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/api/upload', true);

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

    xhr.onloadstart = () => {
      setStartTime(Date.now()); // Empezar a contar el tiempo cuando la subida comienza
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        setUploadMessage('File uploaded and processed successfully!');
      } else {
        setUploadMessage('Error uploading file.');
      }
    };

    xhr.onerror = () => {
      setUploadMessage('Error uploading file.');
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
          />
        </div>
        <button type="submit">
          <i className="fa fa-upload" aria-hidden="true"></i> Upload
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
