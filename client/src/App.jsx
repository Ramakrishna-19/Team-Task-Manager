import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import MakeAdmin from "./pages/MakeAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Tasks />} />
        <Route path="/make-admin" element={<MakeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;