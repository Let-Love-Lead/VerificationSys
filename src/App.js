import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Verification from "./components/verification";
import Info from "./components/info";
import History from "./components/history";
import Signup from "./components/signup";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the protected route wrapper

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Accessible without login) */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (Require Authentication) */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/verification" element={<ProtectedRoute element={<Verification />} />} />
        <Route path="/info" element={<ProtectedRoute element={<Info />} />} />
        <Route path="/history" element={<ProtectedRoute element={<History />} />} />
      </Routes>
    </Router>
  );
};

export default App;
