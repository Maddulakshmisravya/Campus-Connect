import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CompleteProfile from "./pages/CompleteProfile";
import BrowseUsers from "./pages/BrowseUsers";
import RequestsPage from "./pages/RequestsPage";
import ConnectionsPage from "./pages/ConnectionsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/browse-users" element={<BrowseUsers />} />
      <Route path="/requests" element={<RequestsPage />} />
      <Route path="/connections" element={<ConnectionsPage />} />
    </Routes>
  );
}

export default App;