import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err.response?.data);
        alert(err.response?.data?.message || "Error loading dashboard");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!data) return <p className="loading">Loading...</p>;

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Dashboard</h1>

        <div className="user-info">
          <span>{user?.name}</span>
          <span className="role">{user?.role}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="nav-buttons">
        <button onClick={() => navigate("/projects")}>
          Manage Projects
        </button>

        <button onClick={() => navigate("/dashboard")}>
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="card">
          <h3>Total Projects</h3>
          <p>{data.totalProjects}</p>
        </div>

        <div className="card">
          <h3>Total Tasks</h3>
          <p>{data.totalTasks}</p>
        </div>

        <div className="card">
          <h3>Todo</h3>
          <p>{data.status.todo}</p>
        </div>

        <div className="card">
          <h3>In Progress</h3>
          <p>{data.status.inProgress}</p>
        </div>

        <div className="card">
          <h3>Done</h3>
          <p>{data.status.done}</p>
        </div>

        <div className="card overdue">
          <h3>Overdue Tasks</h3>
          <p>{data.overdueTasks}</p>
        </div>
      </div>
    </div>
  );
}