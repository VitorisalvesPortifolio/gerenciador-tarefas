/**
 * Componente principal da lista de tarefas.
 * Exibe a lista de tarefas, permite adicionar novas tarefas,
 * editar e excluir tarefas existentes.
 */

import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";  // Componente para adicionar nova tarefa
import TaskUpdate from "./TaskUpdate";  // Componente para editar tarefa
import TaskDelete from "./TaskDelete";  // Componente para excluir tarefa

import API_BASE_URL from "../config/api";  // Correção: variável de ambiente para a URL da API

const TaskList = () => {
  // Estado local que armazena as tarefas
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);  // Armazena a tarefa selecionada para editar

  // Carrega as tarefas da API ao montar o componente
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
   * @param {object} newTask - Tarefa retornada da API
   */
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  /**
   * Atualiza uma tarefa na lista local após atualização via API
   * @param {object} updatedTask - Tarefa atualizada retornada da API
   */
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setTaskToEdit(null);  // Limpa a tarefa selecionada para editar
  };

  /**
   * Remove uma tarefa da lista local após exclusão via API
   * @param {number} taskId - ID da tarefa que será removida
   */
  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
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
              <div>
                <button onClick={() => setTaskToEdit(task)}>
                  Editar
                </button>
                <button onClick={() => handleTaskDeleted(task.id)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Formulário de edição de tarefa, aparece quando uma tarefa é selecionada */}
      {taskToEdit && (
        <TaskUpdate
          task={taskToEdit}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default TaskList;
