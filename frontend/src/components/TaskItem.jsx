function TaskItem({ task, onEdit, onDelete }) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="card task-item">
      <div style={{ flex: 1 }}>
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className={`badge badge-${task.status}`}>
            {task.status.replace("-", " ")}
          </span>
        </div>
        
        {task.description && (
          <p className="task-desc mt-2">{task.description}</p>
        )}
        
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          Added: {formattedDate}
        </p>
      </div>

      <div className="task-actions">
        <button 
          className="btn btn-small btn-outline" 
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button 
          className="btn btn-small btn-danger" 
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
