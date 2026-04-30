import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err.response?.data);
        alert(err.response?.data?.message || "Error in dashboard");
      });
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Total Projects: {data.totalProjects}</p>
      <p>Total Tasks: {data.totalTasks}</p>

      <p>Todo: {data.status.todo}</p>
      <p>In Progress: {data.status.inProgress}</p>
      <p>Done: {data.status.done}</p>

      <p>Overdue Tasks: {data.overdueTasks}</p>
    </div>
  );
}