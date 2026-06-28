import { useState, useEffect } from "react";

function TaskForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");

    onSubmit({
      title,
      description,
      status,
      _id: initialData ? initialData._id : undefined
    });

    if (!initialData) {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: "1rem" }}>
        {initialData ? "Edit Task" : "Add New Task"}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
          />
          {error && <p className="error-text">{error}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" className="btn btn-primary">
            {initialData ? "Update Task" : "Save Task"}
          </button>
          
          {initialData && (
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={onCancel}
              style={{ width: "100%" }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
