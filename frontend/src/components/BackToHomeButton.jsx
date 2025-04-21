// src/components/BackToHomeButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')} className="back-button">
      Voltar para Página Principal
    </button>
  );
};

export default BackToHomeButton;
