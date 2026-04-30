import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  // fetch projects
  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // create project
  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post("/projects", form);
    setForm({ name: "", description: "" });
    fetchProjects();
  };

  return (
    <div>
      <h2>Projects</h2>

      {/* Create Project (Admin only ideally) */}
      <form onSubmit={handleCreate}>
        <input
          placeholder="Project Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button>Create</button>
      </form>

      {/* List Projects */}
      {projects.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <Link to={`/projects/${p._id}`}>View Tasks</Link>
        </div>
      ))}
    </div>
  );
}