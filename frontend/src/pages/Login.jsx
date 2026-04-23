import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/login", form);

      // store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      // redirect
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: "#fff", marginBottom: "10px" }}>
          Welcome Back
        </h2>

        <p style={{ color: "#ddd", marginBottom: "20px" }}>
          Login to manage your grievances
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={form.email}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p style={{ color: "#fff", marginTop: "15px", fontSize: "14px" }}>
          New user?{" "}
          <a href="/" style={{ color: "#667eea" }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

// styles
const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #ff7eb3, #ff758c)"
};

const cardStyle = {
  backdropFilter: "blur(15px)",
  background: "rgba(255,255,255,0.1)",
  padding: "40px",
  borderRadius: "15px",
  width: "320px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  textAlign: "center"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "none",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "#667eea",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Login;