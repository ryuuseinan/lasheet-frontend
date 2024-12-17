import React, { useState } from 'react';
import Upload from './Upload'; // Asegúrate de importar el componente Upload
import './BaseLayout.css'; // Asegúrate de tener el archivo CSS adecuado

const BaseLayout = ({ children }) => {
  const [showUploadForm, setShowUploadForm] = useState(false); // Estado para mostrar/ocultar el modal

  const handleUploadButtonClick = () => {
    setShowUploadForm(!showUploadForm); // Cambiar el estado para mostrar/ocultar el formulario
  };

  const handleCloseModal = () => {
    setShowUploadForm(false); // Cerrar el modal
  };

  return (
    <>
      <header className="header-container">
        <h1>LA SHEET</h1>
        <form className="d-flex ms-3" role="search">
          <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
          <button className="btn btn-primary" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <div className="ms-auto">
          {/* Botón para mostrar/ocultar el modal */}
          <button onClick={handleUploadButtonClick} className="btn btn-primary me-2">
            <i className="fas fa-upload"></i> Subir un mapa
          </button>
          <a href="#" className="btn btn-primary">
            <i className="fas fa-sign-in-alt"></i> Iniciar sesión
          </a>
        </div>
      </header>

      <div className="beatmaps-container">
        {/* Si el estado showUploadForm es true, mostrar el modal */}
        {showUploadForm && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <Upload />
              <button onClick={handleCloseModal} className="close-button">Cerrar</button>
            </div>
          </div>
        )}
        {/* Si no, mostrar los beatmaps */}
        {children}
      </div>
    </>
  );
};

export default BaseLayout;
