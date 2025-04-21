import React from 'react';
import { Link } from 'react-router-dom';
import './MenuPage.css';
const MenuPage = () => {
  return (
    <div className="menu-page">
      <h1 className="menu-title">Menu Principal</h1>
      <div className="menu-buttons">
        <Link to="/tarefas">
          <button className="menu-button">Ir para Tarefas</button>
        </Link>
        <Link to="/aulas">
          <button className="menu-button">Ir para Aulas</button>
        </Link>
      </div>
    </div>
  );
};

export default MenuPage;
