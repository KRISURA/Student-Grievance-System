import { useState, useEffect } from "react";
import axios from "axios";

// ✅ backend URL (LIVE)
const API = "https://student-grievance-system-r0sc.onrender.com";

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic"
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/api/grievances`, {
        headers: { Authorization: token }
      });
      setGrievances(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API}/api/grievances`, form, {
        headers: { Authorization: token }
      });

      setForm({ title: "", description: "", category: "Academic" });
      fetchData();
    } catch (err) {
      alert("Error submitting grievance");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/api/grievances/${id}`, {
      headers: { Authorization: token }
    });
    fetchData();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleLogout} style={logoutStyle}>
        Logout
      </button>

      <h2 style={titleStyle}>Student Grievance Dashboard 🛠️</h2>

      <div style={cardStyle}>
        <h3>Submit Grievance</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>Academic</option>
            <option>Hostel</option>
            <option>Transport</option>
            <option>Other</option>
          </select>

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <div style={{ maxWidth: "800px", margin: "auto" }}>
        {grievances.length === 0 ? (
          <p style={{ color: "#fff", textAlign: "center" }}>
            No grievances found
          </p>
        ) : (
          grievances.map((g) => (
            <div key={g._id} style={listCard}>
              <h4>{g.title}</h4>
              <p>{g.description}</p>
              <p><b>Category:</b> {g.category}</p>
              <p><b>Status:</b> {g.status}</p>

              <button
                onClick={() => handleDelete(g._id)}
                style={deleteBtn}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// styles (same as before)
const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  padding: "20px"
};

const titleStyle = {
  color: "#fff",
  textAlign: "center"
};

const logoutStyle = {
  position: "absolute",
  top: "20px",
  right: "20px",
  padding: "8px 15px",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "400px",
  margin: "20px auto"
};

const inputStyle = {
  width: "100%",
  margin: "10px 0",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#667eea",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const listCard = {
  background: "#fff",
  margin: "10px 0",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
};

const deleteBtn = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Dashboard;