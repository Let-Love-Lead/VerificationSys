import React from "react";
import { Navigate } from "react-router-dom";

// Function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken"); // Check if token exists
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
