import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.card}>
          <h1>Campus Connect</h1>
          <p>Student Skill Exchange Platform</p>
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
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};

export default Home;