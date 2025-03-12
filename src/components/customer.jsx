import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Customer = () => {
  const navigate = useNavigate();
    navigate("/dashboard");

    const handleSubmit =()=>{
        console.log("Id submited");
    }

  return (
    <div className="customer-container">
      <div className="input-section">
        <label className="GhCardLabel">Client Ghana Card Number
          <input 
            type="text" 
            placeholder="GHA-000000000-0"
          />
        </label>
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <a href="/dashboard" className="return-link">Return to Dashboard</a>
      </div>
    </div>
  );
};

export default Customer;
