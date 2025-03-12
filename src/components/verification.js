import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/verification.css";

const Verification = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [ghanacard, setGhanacard] = useState("");
  const navigate = useNavigate();
  let stream = null;

  // Function to start the camera
  const startCamera = useCallback(async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Please allow camera access to capture the image.");
    }
  }, []);

  // Function to stop the camera
  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  }, []);

  // Start the camera when the component mounts
  useEffect(() => {
    startCamera();
    return () => stopCamera(); // Stop camera when component unmounts
  }, [startCamera, stopCamera]);

  // Capture image and stop camera
  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/jpeg"));
      stopCamera(); // Stop camera after capturing
    }
  };

  // Retake: Clear image and restart camera
  const handleRetake = () => {
    setCapturedImage(null);
    startCamera(); // Restart the camera
  };

  // Submit for verification
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!capturedImage || !ghanacard) {
      alert("Please capture an image and enter your Ghana Card number.");
      return;
    }

    const data = {
      center: "BRANCHLESS",
      dataType: "PNG",
      image: capturedImage.split(",")[1],
      pinNumber: ghanacard,
      userID: "admin@adehyeman.com",
      merchantKey: "5716153e-c47b-4d55-963c-0b5cc6f6b294",
    };

    try {
      const response = await fetch(
        "https", //required link removed
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (responseData.success && responseData.code === "00") {
        await fetch("http", { //requred link removed
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(responseData),
        });

        const fullName = `${responseData.data.person.surname} ${responseData.data.person.forenames}`;
        const shortId = responseData.data.shortGuid;
        const dateTime = new Date().toLocaleString();

      // Store verification data in MongoDB
      await fetch("http", { //required link removed
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ghanaCardNumber: ghanacard,
          capturedImage,
          verifiedName: fullName,
          shortId,
          userID: data.userID,
          dateTime,
        }),
      });

      navigate(`/info?userID=${encodeURIComponent(data.userID)}`);
    } else {
      alert("Verification failed: " + responseData.msg);
      startCamera(); // Restart camera if verification fails
    }
  } catch (error) {
    console.error("Error submitting data:", error);
    alert("An error occurred during submission. Please try again.");
  }
  };

  return (
    <div className="verification-body">
      <form onSubmit={handleSubmit} className="verification-form">
        <label htmlFor="ghanacard">Ghanacard:</label>
        <input
          type="text"
          id="ghanacard"
          placeholder="GHA-0000000-0"
          value={ghanacard}
          onChange={(e) => setGhanacard(e.target.value)}
          required
        />

        <div className="canvas-container">
          {capturedImage ? (
            <img src={capturedImage} alt="Captured Preview" />
          ) : (
            <video ref={videoRef} autoPlay />
          )}
          <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }}></canvas>
        </div>

        <div className="button-container">
          {!capturedImage ? (
            <button type="button" onClick={handleCapture}>
              Capture
            </button>
          ) : (
            <>
              <button type="button" onClick={handleRetake}>
                Retake
              </button>
              <button type="submit">Submit</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Verification;
