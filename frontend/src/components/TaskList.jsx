/**
 * Componente principal da lista de tarefas.
 * Exibe a lista e o formulário para adicionar novas tarefas.
 */

import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import API_BASE_URL from "../config/api"; // Correção: usar variável de ambiente

const TaskList = () => {
  // Estado local que armazena as tarefas
  const [tasks, setTasks] = useState([]);

  // Carrega tarefas da API ao montar o componente
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Busca a lista de tarefas da API
   */
  const fetchTasks = () => {
    fetch(`${API_BASE_URL}/tasks/`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) =>
        console.error("Erro ao carregar tarefas:", error)
      );
  };

  /**
   * Adiciona uma nova tarefa à lista local após criação via API
   * @param {object} newTask - tarefa retornada da API
   */
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <h2>Lista de Tarefas</h2>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> —{" "}
              {task.description || "Sem descrição"} —{" "}
              {task.done ? "✅ Feito" : "🕒 Pendente"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
