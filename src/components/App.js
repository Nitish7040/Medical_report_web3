import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import "../App.css";

import Home from "./Home/Home";
import Data from "./Data/Data";
import Form from "./Form/Form";
import Navbar from "./Navbar/Navbar";
import Option from "./Option/Option";
import Alert from "./Alert/Alert";
import { useDispatch } from "react-redux";
import {
  loadAccount,
  loadAllData,
  loadMedical,
  loadNetwork,
  loadProvider,
  subscribeToEvents,
} from "../store/interactions";
import config from "../config.json";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);
    const chainIdStr = String(chainId); // ✅ Convert to string

    const medical_config = config[chainIdStr]?.medical;

    if (!medical_config) {
      console.error(`❌ No config found for chainId: ${chainIdStr}`);
      return;
    }

    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, dispatch);
    });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    const medical = loadMedical(provider, medical_config.address, dispatch);
    loadAllData(provider, medical, dispatch);
    subscribeToEvents(medical, dispatch);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []); // ✅ Only run once on mount

  return (
    <div className="App">
      <Routes>
        {/* Home path - No navbar and other elements */}
        <Route path="/" element={<Home />} />

        {/* Form path - Render Navbar and Option with Form */}
        <Route path="/Form" element={<><Navbar /><Option /><Form /></>} />

        {/* Data path */}
        <Route path="/Data" element={<Data />} />
      </Routes>

      <Alert />
    </div>
  );
}

export default App;
