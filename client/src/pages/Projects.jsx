import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Error fetching projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return alert("Project name is required");
    }

    try {
      await API.post("/projects", form);
      setForm({ name: "", description: "" });
      fetchProjects();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Error creating project");
    }
  };

  return (
    <div className="projects-container">

      <div className="projects-header">
        <h2>Projects</h2>

        <div className="top-actions">
          <button onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {user?.role === "admin" && (
        <form className="project-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
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

          <button type="submit">Create Project</button>
        </form>
      )}

      <div className="projects-list">
        {projects.length === 0 ? (
          <p className="empty">No projects found</p>
        ) : (
          projects.map((project) => (
            <div className="project-card" key={project._id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>

              <button
                onClick={() => navigate(`/projects/${project._id}`)}
              >
                View Tasks →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}