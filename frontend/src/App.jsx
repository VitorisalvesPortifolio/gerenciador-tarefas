// src/App.jsx

// Importa os módulos necessários
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importa as páginas
import AulasPage from './pages/AulasPage';
import TasksPage from './pages/TasksPage';
import MenuPage from './pages/MenuPage';

// Página principal com links


// Componente principal da aplicação com rotas definidas
function App() {
  return (
    <Router>
      {/* Define as rotas da aplicação */}
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/tarefas" element={<TasksPage />} />
        <Route path="/aulas" element={<AulasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
