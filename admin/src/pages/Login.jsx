import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";

export default function Login() {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  /* REDIRECT IF ALREADY LOGGED IN */
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");

    if (loggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const submit = async () => {

    try {

      const res = await api.post("/admin/login", { id, password });

      if (res.data.success) {

        /* SAVE LOGIN STATE */
        localStorage.setItem("adminLoggedIn", "true");

        navigate("/dashboard", { replace: true });

      }

    } catch {

      alert("Invalid credentials");

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h2>Admin Login</h2>

        <input
          className="login-input"
          placeholder="Admin ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <div className="password-field">

          <input
            className="login-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

        </div>

        <button
          className="login-btn"
          onClick={submit}
        >
          Login
        </button>

      </div>

    </div>
  );
}