import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const microsoftLogo = "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";

const Login = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Microsoft Login Handler
// ✅ Fix: Move storeUserEmail function above handleMicrosoftLogin
const storeUserEmail = async (email, provider) => {
  try {
    await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, provider }),
    });
  } catch (error) {
    console.error("Error storing user email:", error);
  }
};

// ✅ Now, handleMicrosoftLogin can correctly use storeUserEmail
const handleMicrosoftLogin = async () => {
  try {
    const response = await instance.loginPopup(loginRequest);
    console.log("Microsoft Login Success:", response);
    storeUserEmail(response.account.username, "Microsoft");
    localStorage.setItem("authToken", response.account.username); // ✅ Store token for protected routes
    navigate("/dashboard");
  } catch (error) {
    console.error("Microsoft Login Failed:", error);
  }
};


  // Email/Password Login Handler
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.token); // Store authentication token
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="logo">
          <img src="https://th.bing.com/th/id/R.32dc992f2f4306cec8a621cdb7f8d177?rik=jaYNk7CbWIgJtw&riu=http%3a%2f%2fwww.ghasalc.com%2fAdehyeman_logo.jpg&ehk=byVYmkmExKBtIp98QLFs%2bnn73IIyU4dPyWkt1RyGfvU%3d&risl=&pid=ImgRaw&r=0" 
            alt="Logo" />
        </div>

        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="log_button">Login</button>
        </form>

        <button className="log_button microsoft-btn" onClick={handleMicrosoftLogin}>
          <img src={microsoftLogo} alt="Microsoft Logo" className="login-logo" />
          Sign in with Microsoft
        </button>

        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
      <footer className="footer">dev by ASL-IT dept</footer>
    </div>
  );
};

export default Login;
