require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Ensure private keys are correctly configured and fall back if not
const privateKeys = process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(",") : [];

// Get the API keys for Goerli and Mumbai from .env
const goerliApiKey = process.env.GOERLI_API_KEY;
const mumbaiApiKey = process.env.MUMBAI_API_KEY;

// Check if the API keys are present
if (!goerliApiKey || !mumbaiApiKey) {
  console.error("Missing Goerli or Mumbai API keys in .env file");
  process.exit(1); // Exit if keys are missing
}

module.exports = {
  solidity: "0.8.18", // Solidity version used in the smart contract
  networks: {
    localhost: {}, // Localhost network (if using Hardhat's in-built node)
    goerli: {
      url: goerliApiKey, // Goerli network API key
      accounts: privateKeys, // Private keys for account(s) used for deployment
    },
    mumbai: {
      url: mumbaiApiKey, // Mumbai network API key
      accounts: privateKeys, // Private keys for account(s)
    },
  },
};
