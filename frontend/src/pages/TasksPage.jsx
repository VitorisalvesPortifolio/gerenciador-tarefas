import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import '../components/TaskForm.css';
import BackToHomeButton from '../components/BackToHomeButton';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  // Carrega tarefas ao iniciar
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://127.0.0.1:8000/tasks/")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Erro ao carregar tarefas:", error));
  };

  return (
    <div className="task-page">
      <BackToHomeButton />
      <h2>Página de Tarefas</h2>
      <TaskForm onTaskCreated={(newTask) => setTasks([...tasks, newTask])} />
    </div>
  );
};
export default TaskPage;
