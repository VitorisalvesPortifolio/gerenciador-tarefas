/**
 * Componente de atualização de tarefa.
 * Permite editar os detalhes da tarefa selecionada.
 */

import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config/api";  // Correção: variável de ambiente para a URL da API

const TaskUpdate = ({ task, onTaskUpdated }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    setUpdatedTask(task);  // Atualiza o estado com os dados da tarefa quando o componente for montado
  }, [task]);

  /**
   * Atualiza os dados da tarefa na API e na lista local
   * @param {object} e - Evento de submissão do formulário
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => onTaskUpdated(data))
      .catch((error) => console.error("Erro ao atualizar tarefa:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar Tarefa</h3>
      <input
        type="text"
        value={updatedTask.title}
        onChange={(e) =>
          setUpdatedTask({ ...updatedTask, title: e.target.value })
        }
        placeholder="Título"
      />
      <input
        type="text"
        value={updatedTask.description}
        onChange={(e) =>
          setUpdatedTask({ ...updatedTask, description: e.target.value })
        }
        placeholder="Descrição"
      />
      <label>
        Concluída:
        <input
          type="checkbox"
          checked={updatedTask.done}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, done: e.target.checked })
          }
        />
      </label>
      <button type="submit">Atualizar</button>
    </form>
  );
};

export default TaskUpdate;
