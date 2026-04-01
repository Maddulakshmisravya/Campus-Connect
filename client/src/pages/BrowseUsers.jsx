import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function BrowseUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
  `https://campus-connect-rype.onrender.com/api/auth/users?skill=${search}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setUsers(res.data);
    } catch (error) {
      console.log("Browse users error:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Error fetching users"
      );
    }
  };

  const handleSendRequest = async (receiverId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
  "https://campus-connect-rype.onrender.com/api/requests/send",
        {
          receiverId,
          message: "Hi, let's connect!",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Error sending request"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>Browse Students</h2>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by skill (e.g. React, Java, DSA)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchButton} onClick={fetchUsers}>
            Search
          </button>
        </div>

        <div style={styles.grid}>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} style={styles.card}>
                <h3 style={styles.name}>{user.name}</h3>
                <p><strong>College:</strong> {user.college || "Not added"}</p>
                <p><strong>Branch:</strong> {user.branch || "Not added"}</p>
                <p><strong>Year:</strong> {user.year || "Not added"}</p>
                <p><strong>Bio:</strong> {user.bio || "No bio yet"}</p>
                <p>
                  <strong>Skills Offered:</strong>{" "}
                  {user.skillsOffered.length > 0
                    ? user.skillsOffered.join(", ")
                    : "Not added"}
                </p>
                <p>
                  <strong>Skills Wanted:</strong>{" "}
                  {user.skillsWanted.length > 0
                    ? user.skillsWanted.join(", ")
                    : "Not added"}
                </p>

                <button
                  style={styles.button}
                  onClick={() => handleSendRequest(user._id)}
                >
                  Send Request
                </button>
              </div>
            ))
          ) : (
            <p>No users found</p>
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
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  searchInput: {
    padding: "12px",
    width: "320px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  searchButton: {
    padding: "12px 20px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
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
  button: {
    marginTop: "12px",
    padding: "10px 14px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default BrowseUsers;