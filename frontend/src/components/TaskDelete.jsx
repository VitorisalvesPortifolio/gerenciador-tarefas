/**
 * Componente de exclusão de tarefa.
 * Permite excluir a tarefa selecionada.
 */

import React from "react";
import API_BASE_URL from "../config/api";  // Correção: variável de ambiente para a URL da API

const TaskDelete = ({ taskId, onTaskDeleted }) => {
  /**
   * Exclui uma tarefa da API e da lista local
   * @param {number} taskId - ID da tarefa a ser excluída
   */
  const handleDelete = () => {
    fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then(() => onTaskDeleted(taskId))
      .catch((error) => console.error("Erro ao excluir tarefa:", error));
  };

  return <button onClick={handleDelete}>Excluir</button>;
};

export default TaskDelete;
