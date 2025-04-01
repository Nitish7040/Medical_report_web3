// Import ethers.js
const { ethers } = require("ethers");
require("dotenv").config(); // Load environment variables

const goerliApiKey = process.env.GOERLI_API_KEY; // Fetch from .env file
if (!goerliApiKey) {
  console.error("Goerli API Key is missing or invalid");
  process.exit(1);
}

// Create a provider using ethers.js
const provider = new ethers.providers.JsonRpcProvider(goerliApiKey); // For ethers v5

// Get the current network
async function checkNetwork() {
  try {
    const network = await provider.getNetwork();
    console.log(`Connected to ${network.name} network`);
  } catch (error) {
    console.error("Error connecting to network:", error);
    process.exit(1);
  }
}

checkNetwork();
