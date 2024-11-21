'use client'

import { useEffect, useState } from 'react';
import { addTask, deleteTask, getTasks } from './actions/taskActions';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromDb = await getTasks();
      setTasks(tasksFromDb);
    };
    
    fetchTasks();
  }, []);

  const handleAddTask = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await addTask(formData);
    // Recarregar tarefas após adicionar uma nova
    const tasksFromDb = await getTasks();
    setTasks(tasksFromDb);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    // Recarregar tarefas após deletar
    const tasksFromDb = await getTasks();
    setTasks(tasksFromDb);
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={handleAddTask}>
        <input name="title" type="text" placeholder="Nova Tarefa" required />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} 
            <button onClick={() => handleDeleteTask(task.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;