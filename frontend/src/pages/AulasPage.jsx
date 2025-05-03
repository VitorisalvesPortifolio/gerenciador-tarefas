import React, { useEffect, useState } from 'react';
import AulasForm from '../components/AulasForm';
import '../components/AulasForm.css';
import BackToHomeButton from '../components/BackToHomeButton';
import API_BASE_URL from '../config/api';

function AulasPage() {
  const [aulas, setAulas] = useState([]);
  const [aulaToEdit, setAulaToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDone, setEditedDone] = useState(false);

  useEffect(() => {
    fetchAulas();
  }, []);

  const fetchAulas = () => {
    fetch(`${API_BASE_URL}/aulas/`)
      .then((res) => res.json())
      .then((data) => setAulas(data))
      .catch((error) => console.error("Erro ao carregar aulas:", error));
  };

  const deleteAula = (aulaId) => {
    fetch(`${API_BASE_URL}/aulas/${aulaId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setAulas(aulas.filter((aula) => aula.id !== aulaId));
        } else {
          console.error("Erro ao excluir aula");
        }
      })
      .catch((error) => console.error("Erro ao excluir aula:", error));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!aulaToEdit) return;

    try {
      const response = await fetch(`${API_BASE_URL}/aulas/${aulaToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          done: editedDone,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar aula");
      }

      const updatedAula = await response.json();

      setAulas((prev) =>
        prev.map((aula) => (aula.id === updatedAula.id ? updatedAula : aula))
      );

      setAulaToEdit(null);
      setEditedTitle('');
      setEditedDescription('');
      setEditedDone(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar a aula");
    }
  };

  return (
    <div className="aulas-page">
      <BackToHomeButton />
      <h1 className="text-3xl font-bold mb-6">Aulas</h1>
  
      <AulasForm onAulaCreated={(newAula) => setAulas([...aulas, newAula])} />
  
      <h3 className="text-xl font-semibold mt-6 mb-2">Lista de Aulas</h3>
      {aulas.length === 0 ? (
        <p>Nenhuma aula cadastrada.</p>
      ) : (
        <ul className="aulas-list">
          {aulas.map((aula) => (
            <li key={aula.id} className="aulas-item">
              <div className="aulas-content">
                {/* Corrigido para exibir 'nome' e 'descricao' */}
                <strong>{aula.nome}</strong> — {aula.descricao || 'Sem descrição'} — {aula.data_entrega}
              </div>
              <div className="aulas-buttons">
                <button
                  className="edit-button"
                  onClick={() => {
                    setAulaToEdit(aula);
                    setEditedTitle(aula.nome);  // Corrigido para 'nome'
                    setEditedDescription(aula.descricao || '');  // Corrigido para 'descricao'
                    setEditedDone(aula.done);  // Ajuste se necessário
                  }}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteAula(aula.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
  
      {aulaToEdit && (
        <form onSubmit={handleUpdate} className="edit-form">
          <h3>Editar Aula</h3>
  
          <div className="form-group">
            <label>Título:</label>
            <input
              className="form-input"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group">
            <label>Descrição:</label>
            <input
              className="form-input"
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </div>
  
          <div className="form-group checkbox-group">
            <label>Status:</label>
            <input
              type="checkbox"
              checked={editedDone}
              onChange={(e) => setEditedDone(e.target.checked)}
            />
            <span className="checkbox-label">{editedDone ? 'Realizada' : 'Pendente'}</span>
          </div>
  
          <button className="submit-button" type="submit">Salvar Alterações</button>
          <button className="cancel-button" type="button" onClick={() => setAulaToEdit(null)}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
  
}

export default AulasPage;
