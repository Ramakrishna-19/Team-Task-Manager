import { useEffect, useState } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";

export default function Tasks() {
  const { id } = useParams(); // projectId
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    const { data } = await API.get(`/tasks/${id}`);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    await API.post("/tasks", {
      ...form,
      projectId: id,
    });

    setForm({ title: "", description: "" });
    fetchTasks();
  };

  const updateStatus = async (taskId, status) => {
    await API.put(`/tasks/${taskId}`, { status });
    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* Create Task */}
      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <button>Create Task</button>
      </form>

      {/* Task List */}
      {tasks.map((t) => (
        <div key={t._id}>
          <h3>{t.title}</h3>
          <p>{t.description}</p>
          <p>Status: {t.status}</p>

          <button onClick={() => updateStatus(t._id, "todo")}>Todo</button>
          <button onClick={() => updateStatus(t._id, "in-progress")}>
            In Progress
          </button>
          <button onClick={() => updateStatus(t._id, "done")}>Done</button>
        </div>
      ))}
    </div>
  );
}