import React, { useEffect, useState, useRef } from "react";
import TaskForm from "../components/TaskForm";
import BackToHomeButton from '../components/BackToHomeButton';
import '../components/TaskForm.css';
import API_BASE_URL from "../config/api";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDone, setEditedDone] = useState(false);

  // Referência para o formulário de edição
  const editFormRef = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`${API_BASE_URL}/tasks/`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Erro ao carregar tarefas:", error));
  };

  const deleteTask = (taskId) => {
    fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setTasks(tasks.filter((task) => task.id !== taskId));
        } else {
          console.error("Erro ao excluir tarefa");
        }
      })
      .catch((error) => console.error("Erro ao excluir tarefa:", error));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!taskToEdit) return;

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          done: editedDone,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar tarefa");
      }

      const updatedTask = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      // Limpa o estado do formulário de edição
      setTaskToEdit(null);
      setEditedTitle("");
      setEditedDescription("");
      setEditedDone(false);

    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar a tarefa");
    }
  };

  return (
    <div className="task-page">
      <BackToHomeButton />
      <h2>Página de Tarefas</h2>

      <TaskForm onTaskCreated={(newTask) => setTasks([...tasks, newTask])} />

      <h3>Lista de Tarefas</h3>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-content">
                <strong>{task.title}</strong> — {task.description || "Sem descrição"} — 
                <span className={`task-status ${task.done ? "done" : "pending"}`}>
                  {task.done ? "✅ Concluída" : "🕒 Pendente"}
                </span>
              </div>
              <div className="task-buttons">
                <button
                  className="edit-button"
                  onClick={() => {
                    setTaskToEdit(task);
                    setEditedTitle(task.title);
                    setEditedDescription(task.description || '');
                    setEditedDone(task.done);

                    // Scroll suave para o formulário de edição
                    setTimeout(() => {
                      editFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {taskToEdit && (
        <form ref={editFormRef} onSubmit={handleUpdate} className="edit-form">
          <h3>Editar Tarefa</h3>

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
            <label className="label-descr">Descrição:</label>
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
            <span className="checkbox-label">{editedDone ? "Feito" : "Pendente"}</span>
          </div>

          <button className="submit-button" type="submit">Salvar Alterações</button>
          <button className="cancel-button" type="button" onClick={() => setTaskToEdit(null)}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default TaskPage;
