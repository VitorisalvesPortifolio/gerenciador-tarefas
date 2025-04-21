import React, { useState } from "react";
import API_BASE_URL from "../config/api"; // Correção: import default
import './TaskForm.css';

/**
 * Componente de formulário para criação de novas tarefas.
 * Envia dados para a API FastAPI e dispara um callback para atualizar a lista no componente pai.
 */

/**
 * Props:
 * - onTaskCreated: função callback chamada após a criação da tarefa.
 */
const TaskForm = ({ onTaskCreated }) => {
  // Estado para os campos do formulário
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para carregamento
  const [responseMessage, setResponseMessage] = useState(""); // Mensagem de resposta após o envio

  /**
   * Envia o formulário para a API FastAPI.
   * Após o sucesso, chama o callback e limpa os campos.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      done: false,
    };

    setIsLoading(true); // Ativar o carregamento

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const createdTask = await response.json();
        onTaskCreated(createdTask); // Atualiza a lista no componente pai
        setResponseMessage("Tarefa criada com sucesso!"); // Mensagem de sucesso
        setTitle("");
        setDescription("");
      } else {
        setResponseMessage("Erro ao criar tarefa.");
        console.error("Erro ao criar tarefa:", await response.text());
      }
    } catch (error) {
      setResponseMessage("Erro de rede. Tente novamente.");
      console.error("Erro de rede:", error);
    } finally {
      setIsLoading(false); // Desativar o carregamento
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Nova Tarefa</h3>
      <div className="form-group">
        <label>Título:</label>
        <input
          placeholder="Tarefa a Realizar."
          className="form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="label-descr">Descrição:</label>
        <input
          placeholder="Descrição da Tarefa."
          className="form-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="submit-button" type="submit" disabled={isLoading}>
        {isLoading ? "Criando..." : "Adicionar"}
      </button>

      {/* Mensagem de resposta sem a parte de "pendente" */}
      {responseMessage && (
        <p className="response-message">{responseMessage}</p>
      )}
    </form>
  );
};
export default TaskForm;
