import React, { useEffect, useState } from "react";
import "./navbar.css";
import healthReport from "../../assets/health-report.png";
import { loadAccount } from "../../store/interactions";
import { useDispatch, useSelector } from "react-redux";
import Blockies from "react-blockies";
import config from "../../config.json";
import { ethers } from "ethers";

const Navbar = () => {
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.connection);  // Should be initialized with ethers provider
  const account = useSelector((state) => state.provider.account);
  const balance = useSelector((state) => state.provider.balance);
  const chainId = useSelector((state) => state.provider.chainId);

  const [isConnecting, setIsConnecting] = useState(false); // Prevent multiple connect clicks

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        loadAccount(window.ethereum, dispatch);
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, [dispatch]);

  // Fix: Correctly set up the provider in connectHandler
  const connectHandler = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected! Please install MetaMask.");
      return;
    }

    if (isConnecting) {
      alert("Already connecting. Please wait.");
      return;
    }

    setIsConnecting(true);

    try {
      // Request accounts from MetaMask
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        // Ensure provider is set up with the correct network (Goerli, Mumbai, etc.)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        const balance = await provider.getBalance(account);
        const balanceInEth = ethers.utils.formatEther(balance);

        // Dispatch account and balance to the Redux store
        dispatch({
          type: "SET_ACCOUNT",
          payload: { account, balance: balanceInEth },
        });

        // Call loadAccount if needed
        await loadAccount(window.ethereum, dispatch);
      } else {
        alert("No accounts found. Please check your wallet.");
      }
    } catch (error) {
      if (error.code === -32002) {
        alert("Connection request already pending. Please check MetaMask.");
      } else {
        console.error("Connection failed:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Network switching handler
  const networkHandler = async (e) => {
    const selectedChainId = e.target.value;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: selectedChainId }],
      });
    } catch (error) {
      if (error.code === 4902) {
        alert("This network is not available in MetaMask. Please add it manually.");
      } else {
        console.error("Failed to switch network:", error);
        alert("Error switching network.");
      }
    }
  };

  return (
    <div className="Navbar">
      <div className="nav__name">
        <img src={healthReport} alt="Logo" width="40" height="40" />
        <h2>Medical Record</h2>
      </div>

      <div className="nav__networkSelector">
        <select
          name="network"
          id="network"
          onChange={networkHandler}
          value={config[chainId] ? `0x${chainId.toString(16)}` : `0`}
        >
          <option value="0" disabled>Select Network</option>
          <option value="0x5">Goerli</option>
          <option value="0x13881">Mumbai</option>
          <option value="31337">Localhost</option>
        </select>
      </div>

      <div className="nav__balance">
        {balance ? (
          <p className="nav__myBalance">
            <small>My Balance: </small> {Number(balance).toFixed(4)} ETH
          </p>
        ) : (
          <p className="nav__myBalance">
            <small>My Balance: </small> 0 ETH
          </p>
        )}

        {account ? (
          <a className="nav__myAccount" href="#">
            {account.slice(0, 5) + "...." + account.slice(38, 42)}
            <Blockies
              seed={account}
              size={10}
              scale={3}
              color="#2187D0"
              bgColor="#F1F2F9"
              spotColor="#767F92"
              className="identicon"
            />
          </a>
        ) : (
          <button className="nav__balance-box" onClick={connectHandler} disabled={isConnecting}>
            {isConnecting ? "Connecting..." : "Connect"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
