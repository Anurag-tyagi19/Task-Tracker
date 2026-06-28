import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (taskData) => {
    try {
      if (taskData._id) {
        const response = await fetch(`${API_URL}/${taskData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
        
        if (!response.ok) throw new Error("Failed to update task");
        
        const updatedTask = await response.json();
        setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
        setTaskToEdit(null);
        
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
        
        if (!response.ok) throw new Error("Failed to create task");
        
        const newTask = await response.json();
        setTasks([newTask, ...tasks]);
      }
    } catch (err) {
      alert("Error saving task: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Failed to delete task");
      
      setTasks(tasks.filter(t => t._id !== id));
      
      if (taskToEdit && taskToEdit._id === id) {
        setTaskToEdit(null);
      }
    } catch (err) {
      alert("Error deleting task: " + err.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Task Tracker</h1>
        
      </header>

      {error && (
        <div className="card" style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}>
          <strong>Error: </strong> {error}
        </div>
      )}

      <TaskForm 
        onSubmit={handleFormSubmit} 
        initialData={taskToEdit}
        onCancel={() => setTaskToEdit(null)}
      />

      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Your Tasks</h2>
        
        {isLoading ? (
          <div className="text-center"><p>Loading tasks...</p></div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onEdit={setTaskToEdit} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
