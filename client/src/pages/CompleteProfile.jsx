import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function CompleteProfile() {
  const [formData, setFormData] = useState({
    college: "",
    branch: "",
    year: "",
    bio: "",
    skillsOffered: "",
    skillsWanted: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      college,
      branch,
      year,
      bio,
      skillsOffered,
      skillsWanted,
    } = formData;

    if (
      !college.trim() ||
      !branch.trim() ||
      !year.trim() ||
      !bio.trim() ||
      !skillsOffered.trim() ||
      !skillsWanted.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        skillsOffered: formData.skillsOffered
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
        skillsWanted: formData.skillsWanted
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      };

      const res = await axios.put(
        "https://campus-connect-rype.onrender.com/api/auth/complete-profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Error");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.heading}>Complete Profile</h2>

          <label style={styles.label}>College *</label>
          <input
            style={styles.input}
            type="text"
            name="college"
            placeholder="Enter your college"
            value={formData.college}
            onChange={handleChange}
          />

          <label style={styles.label}>Branch *</label>
          <input
            style={styles.input}
            type="text"
            name="branch"
            placeholder="Enter your branch"
            value={formData.branch}
            onChange={handleChange}
          />

          <label style={styles.label}>Year *</label>
          <input
            style={styles.input}
            type="text"
            name="year"
            placeholder="Enter your year"
            value={formData.year}
            onChange={handleChange}
          />

          <label style={styles.label}>Bio *</label>
          <textarea
            style={styles.textarea}
            name="bio"
            placeholder="Write a short bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <label style={styles.label}>Skills Offered *</label>
          <input
            style={styles.input}
            type="text"
            name="skillsOffered"
            placeholder="Skills Offered (comma separated)"
            value={formData.skillsOffered}
            onChange={handleChange}
          />

          <label style={styles.label}>Skills Wanted *</label>
          <input
            style={styles.input}
            type="text"
            name="skillsWanted"
            placeholder="Skills Wanted (comma separated)"
            value={formData.skillsWanted}
            onChange={handleChange}
          />

          <button style={styles.button} type="submit">
            Save Profile
          </button>
        </form>
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
    padding: "30px 0",
  },
  form: {
    width: "420px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  heading: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  label: {
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: "5px",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  textarea: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    minHeight: "90px",
    resize: "vertical",
  },
  button: {
    padding: "12px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default CompleteProfile;