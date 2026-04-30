import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("user", JSON.stringify(data));

      alert("Login successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit">Login</button>
        </form>

        <p className="switch-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}