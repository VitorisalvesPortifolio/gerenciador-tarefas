import React, { useEffect, useState, useRef } from "react";
import AulasForm from "../components/AulasForm";
import BackToHomeButton from "../components/BackToHomeButton";
import "../components/AulasForm.css";
import API_BASE_URL from "../config/api"; // Certifique-se de que está usando a variável de ambiente

const AulasPage = () => {
  const [aulas, setAulas] = useState([]);
  const [aulaToEdit, setAulaToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDone, setEditedDone] = useState(false);
  const [editedDate, setEditedDate] = useState("");

  // Referência para o formulário de edição
  const editFormRef = useRef(null);

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
      method: "DELETE",
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: editedTitle,
          descricao: editedDescription,
          data_entrega: editedDate,
          done: editedDone,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar aula");
      }

      const updatedAula = await response.json();

      setAulas((prevAulas) =>
        prevAulas.map((aula) =>
          aula.id === updatedAula.id ? updatedAula : aula
        )
      );

      // Limpa o estado do formulário de edição
      setAulaToEdit(null);
      setEditedTitle("");
      setEditedDescription("");
      setEditedDone(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar a aula");
    }
  };

  return (
    <div className="aulas-page">
      <BackToHomeButton />

      <AulasForm onAulaCreated={(newAula) => setAulas([...aulas, newAula])} />

      <h3 className="text-xl font-semibold mt-6 mb-2">Lista de Aulas</h3>
      {aulas.length === 0 ? (
        <p>Nenhuma aula cadastrada.</p>
      ) : (
        <ul className="aulas-list">
          {aulas.map((aula) => (
            <li key={aula.id} className="aulas-item">
              <div className="aulas-content">
                <strong>{aula.nome}</strong> —{" "}
                {aula.descricao || "Sem descrição"} —{" "}
                {aula.data_entrega && (
                  <span>
                    📅 {new Date(aula.data_entrega).toLocaleDateString()}
                  </span>
                )}{" "}
                —
                <span
                  className={`aula-status ${aula.done ? "done" : "pending"}`}
                >
                  {aula.done ? "✅ Concluída" : "🕒 Pendente"}
                </span>
              </div>
              <div className="aulas-buttons">
                <button
                  className="edit-button"
                  onClick={() => {
                    setAulaToEdit(aula);
                    setEditedTitle(aula.nome);
                    setEditedDescription(aula.descricao || "");
                    setEditedDone(aula.done);
                    setEditedDate(aula.data_entrega); // já está sendo configurado corretamente
                    setEditedDone(aula.done !== undefined ? aula.done : false);

                    // Scroll suave para o formulário de edição
                    setTimeout(() => {
                      editFormRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 100);
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
        <form ref={editFormRef} onSubmit={handleUpdate} className="edit-form">
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

          <div className="form-group">
            <label>Data de Entrega:</label>
            <input
              className="form-input"
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>Status:</label>
            <input
              type="checkbox"
              checked={editedDone || false}
              onChange={(e) => setEditedDone(e.target.checked)}
            />
            <span className="checkbox-label">
              {editedDone ? "Concluída" : "Pendente"}
            </span>
          </div>

          <button className="submit-button" type="submit">
            Salvar Alterações
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={() => setAulaToEdit(null)}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default AulasPage;
