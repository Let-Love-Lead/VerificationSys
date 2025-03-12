import React, {useEffect, useState}from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/info.css"; // Import external CSS

const Info = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  //const fullName = queryParams.get("fullName") || "N/A";
  //const shortId = queryParams.get("shortId") || "N/A";
  // const userID = queryParams.get("userID");

  const [verificationData, setVerificationData] = useState(null);

  useEffect(() => {
    const fetchVerificationData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/verification`);
        const data = await response.json();
        if (data.length > 0) {
          setVerificationData(data[0]); // Get the latest record
        }
      } catch (error) {
        console.error("Error fetching verification data:", error);
      }
    };

    fetchVerificationData();
  });

  return (
    <div className="info-body">
      <div className="info-container">
        <h1>Verification Results</h1>
        {verificationData ? (
          <>
            <p><strong>Full Name:</strong> {verificationData.verifiedName}</p>
            <p><strong>Short ID:</strong> {verificationData.shortId}</p>
          </>
        ) : (
          <p>Loading verification details...</p>
        )}
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default Info;
