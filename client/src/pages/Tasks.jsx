import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Tasks.css";

export default function Tasks() {
  const { id } = useParams(); // projectId
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(`/tasks/${id}`);
      setTasks(data);
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return alert("Task title is required");
    }

    try {
      await API.post("/tasks", {
        ...form,
        projectId: id,
        assignedTo: user._id,
      });

      setForm({ title: "", description: "", dueDate: "" });
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Error creating task");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Error updating task");
    }
  };

  return (
    <div className="tasks-container">

      <div className="tasks-header">
        <h2>Tasks</h2>
        <button onClick={() => navigate("/projects")}>
          ← Back to Projects
        </button>
      </div>

      {user?.role === "admin" && (
        <form className="task-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              setForm({ ...form, dueDate: e.target.value })
            }
          />

          <button type="submit">Create Task</button>
        </form>
      )}

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="empty">No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <p className="status">
                Status: <strong>{task.status}</strong>
              </p>

              {task.dueDate && (
                <p className="due">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}

              <div className="task-actions">
                <button onClick={() => updateStatus(task._id, "todo")}>
                  Todo
                </button>

                <button
                  onClick={() =>
                    updateStatus(task._id, "in-progress")
                  }
                >
                  In Progress
                </button>

                <button onClick={() => updateStatus(task._id, "done")}>
                  Done
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}