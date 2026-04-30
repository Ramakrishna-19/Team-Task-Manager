import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./MakeAdmin.css";

export default function MakeAdmin() {
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/register-admin-email", {
        email,
        secret,
      });

      alert("Now signup/login with this email to become admin");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="make-admin-container">
      <div className="make-admin-box">
        <h2>Enter your email here to become admin</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter secret key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}