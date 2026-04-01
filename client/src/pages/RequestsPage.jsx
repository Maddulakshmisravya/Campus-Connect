import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function RequestsPage() {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const receivedRes = await axios.get(
        "https://campus-connect-rype.onrender.com/api/requests/received",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const sentRes = await axios.get(
        "https://campus-connect-rype.onrender.com/api/requests/sent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReceivedRequests(receivedRes.data);
      setSentRequests(sentRes.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Error fetching requests"
      );
    }
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://campus-connect-rype.onrender.com/api/requests/update/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      fetchRequests();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Error updating request"
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>My Requests</h2>

        <div style={styles.section}>
          <h3 style={styles.subHeading}>Received Requests</h3>
          {receivedRequests.length > 0 ? (
            receivedRequests.map((req) => (
              <div key={req._id} style={styles.card}>
                <p><strong>From:</strong> {req.sender?.name}</p>
                <p><strong>College:</strong> {req.sender?.college || "Not added"}</p>
                <p><strong>Branch:</strong> {req.sender?.branch || "Not added"}</p>
                <p>
                  <strong>Skills Offered:</strong>{" "}
                  {req.sender?.skillsOffered?.length > 0
                    ? req.sender.skillsOffered.join(", ")
                    : "Not added"}
                </p>
                <p><strong>Message:</strong> {req.message || "No message"}</p>
                <p><strong>Status:</strong> {req.status}</p>

                {req.status === "pending" && (
                  <div style={styles.buttonGroup}>
                    <button
                      style={styles.acceptButton}
                      onClick={() => handleUpdateStatus(req._id, "accepted")}
                    >
                      Accept
                    </button>

                    <button
                      style={styles.rejectButton}
                      onClick={() => handleUpdateStatus(req._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No received requests</p>
          )}
        </div>

        <div style={styles.section}>
          <h3 style={styles.subHeading}>Sent Requests</h3>
          {sentRequests.length > 0 ? (
            sentRequests.map((req) => (
              <div key={req._id} style={styles.card}>
                <p><strong>To:</strong> {req.receiver?.name}</p>
                <p><strong>College:</strong> {req.receiver?.college || "Not added"}</p>
                <p><strong>Branch:</strong> {req.receiver?.branch || "Not added"}</p>
                <p>
                  <strong>Skills Offered:</strong>{" "}
                  {req.receiver?.skillsOffered?.length > 0
                    ? req.receiver.skillsOffered.join(", ")
                    : "Not added"}
                </p>
                <p><strong>Message:</strong> {req.message || "No message"}</p>
                <p><strong>Status:</strong> {req.status}</p>
              </div>
            ))
          ) : (
            <p>No sent requests</p>
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
  section: {
    marginBottom: "40px",
  },
  subHeading: {
    marginBottom: "15px",
    color: "#34495e",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "15px",
    lineHeight: "1.8",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  },
  acceptButton: {
    padding: "10px 14px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  rejectButton: {
    padding: "10px 14px",
    backgroundColor: "crimson",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default RequestsPage;