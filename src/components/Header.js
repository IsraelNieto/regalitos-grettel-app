import React from 'react';
import { FaKey, FaSignOutAlt } from "react-icons/fa"; 

function Header({ isAdmin, onShowLogin, onLogout }) {
  return (
    <header className="app-header">
      {/* Contenedor para el logo y el título */}
      <div className="logo-container">
        <img src="./Regalitos-Grettel.png" alt="Regalitos Grettel Logo" className="app-logo" />
        <h1 className="app-title">Regalitos Grettel</h1>
      </div>

      <div className="header-right">
        {/* El Carrito de Compras ya no está aquí */}
        {isAdmin ? (
          <button onClick={onLogout} className="admin-link" title="Cerrar Sesión">
            <FaSignOutAlt />
          </button>
        ) : (
          <button onClick={onShowLogin} className="admin-link" title="Admin Login">
            <FaKey />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;