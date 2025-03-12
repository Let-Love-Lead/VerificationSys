import React from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // Import external CSS

const Dashboard = () => {
  const { instance } = useMsal(); // Microsoft Auth Instance
  const navigate = useNavigate();

  // Navigate to Verification Page
  const navigateToVerification = () => {
    navigate("/verification");
  };

  //Navigate to Customer Page
  const naviagteToCustomer = () => {
    navigate("/customer");
  };

  // Placeholder for History Feature
  const viewHistory = () => {
    navigate("/history");
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from local storage
    navigate("/"); // Redirect to login page
  };
  

  return (
    <div className="dashboard-body">
      <div className="container">
        <div className="box" onClick={navigateToVerification}>
          Take Verification
        </div>
        <div className="box" onClick={viewHistory}>
          History
        </div>
        {/* <div className="box" onClick={naviagteToCustomer}>
          Customer
        </div> */}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
