import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ConnectionsPage() {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://campus-connect-rype.onrender.com/api/requests/connections",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setConnections(res.data);
      } catch (error) {
        alert(
          error.response?.data?.message ||
            error.message ||
            "Error fetching connections"
        );
      }
    };

    fetchConnections();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>My Connections</h2>

        <div style={styles.grid}>
          {connections.length > 0 ? (
            connections.map((user, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.name}>{user.name}</h3>
                <p><strong>College:</strong> {user.college || "Not added"}</p>
                <p><strong>Branch:</strong> {user.branch || "Not added"}</p>
                <p><strong>Year:</strong> {user.year || "Not added"}</p>
                <p><strong>Bio:</strong> {user.bio || "No bio yet"}</p>
                <p>
                  <strong>Skills Offered:</strong>{" "}
                  {user.skillsOffered?.length > 0
                    ? user.skillsOffered.join(", ")
                    : "Not added"}
                </p>
                <p>
                  <strong>Skills Wanted:</strong>{" "}
                  {user.skillsWanted?.length > 0
                    ? user.skillsWanted.join(", ")
                    : "Not added"}
                </p>
              </div>
            ))
          ) : (
            <p>No connections yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#2c3e50",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    lineHeight: "1.8",
  },
  name: {
    color: "#2c3e50",
    marginBottom: "10px",
  },
};

export default ConnectionsPage;