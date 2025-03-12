export const msalConfig = {
    auth: {
      clientId: "ef758a4b-258d-4109-9e1a-3faea82b2d0c", // Replace with Azure AD App Client ID
      authority: "https://login.microsoftonline.com/498a1598-2c45-4ec2-9750-8cf70db9f7fe", // Replace with your Tenant ID
      redirectUri: "http://localhost:3000", // Change this based on your deployment
    }
  };
  
  export const loginRequest = {
    scopes: ["User.Read"], // Request permission to read user profile
  };
  