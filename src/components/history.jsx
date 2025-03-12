import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/history.css";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/verification"); // Adjust API URL if hosted
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  // Filtered Data based on Search Query
  const filteredHistory = historyData.filter((record) =>
    record.verifiedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.shortId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.ghanaCardNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="history-body">
      <div className="history-container">
        <h1>Verification History</h1>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by Name, Short ID, or Ghana Card Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-box"
        />

        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Verified Name</th>
              <th>Short ID</th>
              <th>GhanaCard</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((record, index) => (
                <tr key={index}>
                  <td>{record.dateTime}</td>
                  <td>{record.verifiedName}</td>
                  <td>{record.shortId}</td>
                  <td>{record.ghanaCardNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No matching records found</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default History;
