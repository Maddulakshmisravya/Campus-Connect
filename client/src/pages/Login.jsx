import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setMessage("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "https://campus-connect-rype.onrender.com/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Login successful!");
      localStorage.setItem("token", res.data.token);

      setFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/complete-profile");
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.form}>
          <h2 style={styles.heading}>Login</h2>

          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}

          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "350px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  heading: {
    textAlign: "center",
    color: "#2c3e50",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
  },
  success: {
    color: "green",
    textAlign: "center",
    fontSize: "14px",
    margin: 0,
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: "14px",
    margin: 0,
  },
};

export default Login;