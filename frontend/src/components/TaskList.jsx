import TaskItem from "./TaskItem";

function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="card text-center" style={{ padding: "3rem 1rem", color: "var(--text-muted)" }}>
        <p>No tasks found. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}

export default TaskList;
