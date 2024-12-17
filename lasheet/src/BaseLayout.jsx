import React from 'react';

const BaseLayout = ({ children }) => {
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
          <a href="/upload" className="btn btn-primary me-2">
            <i className="fas fa-upload"></i> Subir un mapa
          </a>
          <a href="#" className="btn btn-primary">
            <i className="fas fa-sign-in-alt"></i> Iniciar sesión
          </a>
        </div>
      </header>
      <div className="container mt-3">{children}</div>
    </>
  );
};

export default BaseLayout;
