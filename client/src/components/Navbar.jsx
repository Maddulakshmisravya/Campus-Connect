import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>Campus Connect</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {token ? (
          <>
            <Link to="/browse-users" style={styles.link}>
              Browse
            </Link>

             <Link to="/connections" style={styles.link}>
              Connections
             </Link>

            <Link to="/requests" style={styles.link}>
              Requests
            </Link>

            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  logo: {
    color: "#2c3e50",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#2c3e50",
    fontWeight: "500",
  },
  logoutBtn: {
    padding: "8px 14px",
    backgroundColor: "crimson",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Navbar;