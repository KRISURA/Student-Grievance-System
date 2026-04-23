import { useState } from "react";
import axios from "axios";

// ✅ backend URL
const API = "https://student-grievance-system-r0sc.onrender.com";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/api/register`, form);

      alert(res.data.msg);

      window.location.href = "/login";

    } catch (err) {
      alert(err.response?.data?.msg || "Error registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: "#fff", marginBottom: "5px" }}>
          Student Grievance Portal
        </h2>

        <p style={{ color: "#ddd", fontSize: "14px", marginBottom: "20px" }}>
          Create your account to submit and track complaints
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={form.name}
            style={inputStyle}
          />

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
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p style={{ color: "#fff", marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#ff7eb3" }}>
            Login
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
  background: "linear-gradient(135deg, #667eea, #764ba2)"
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
  background: "#ff7eb3",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Register;