import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { getContract } from "./utils/contract";
import { BrowserProvider } from "ethers";

function App() {
  const [attendance, setAttendance] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [walletConnected, setWalletConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState("");


  const requestPermissions = async () => {
    try {
      const permissions = await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      console.log("✅ Permissions granted:", permissions);
    } catch (error) {
      console.error("❌ Error requesting permissions:", error);
    }
  };

  const switchToHardhat = async () => {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x7A69" }], 
        });
        console.log("✅ Switched to Hardhat Localhost");
    } catch (switchError) {
        if (switchError.code === 4902) {
            console.error("❌ Hardhat network not added. \nAdd it manually in MetaMask.");
        } else {
            console.error("❌ Error switching network:", switchError);
        }
    }
};

const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            alert("MetaMask is required to connect!");
            return;
        }

        
        await switchToHardhat();

        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);

        if (accounts.length === 0) {
            alert("No accounts found! Please unlock MetaMask.");
            return;
        }

        const requiredAccount = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"; 
        if (accounts[0].toLowerCase() !== requiredAccount.toLowerCase()) {
            alert("Please switch to Account 2 in MetaMask!");
            return;
        }

        console.log("✅ Using Account:", accounts[0]);

        const signer = await provider.getSigner();
        const contractInstance = getContract(signer);

        setContract(contractInstance);
        setWalletConnected(true);
        setSelectedAccount(accounts[0]); 

        
        window.ethereum.on("accountsChanged", (newAccounts) => {
            console.log("🔄 Account changed:", newAccounts[0]);
            if (newAccounts[0].toLowerCase() !== requiredAccount.toLowerCase()) {
                alert("Switched to an incorrect account! Please select Account 2.");
                setWalletConnected(false);
            } else {
                setSelectedAccount(newAccounts[0]);
                setWalletConnected(true);
            }
        });

    } catch (error) {
        console.error("❌ Error connecting wallet:", error);
    }
};

  
  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:5000/attendance");
      const data = response.data;

      if (Array.isArray(data)) {
        setAttendance(data);
        filterAttendance(data, "all");
      } else {
        console.error("❌ Received data is not an array:", data);
      }
    } catch (error) {
      console.error("❌ Error fetching backend attendance:", error);
    }
  };

  
  const markAttendance = async (fingerprintId, timestamp, status) => {
    try {
        console.log(`📌 Sending transaction to blockchain for Fingerprint ID: ${fingerprintId}...`);
        const tx = await contract.markAttendance(fingerprintId.toString(), timestamp, status);
        console.log("🕐 Waiting for transaction confirmation...");
        await tx.wait();
        console.log("✅ User authenticated on blockchain!");
        alert(`User authenticated, Fingerprint ID: ${fingerprintId}`);
    } catch (error) {
        console.error("❌ Transaction failed:", error);
        alert("Transaction failed! Check the console for details.");
    }
};

  useEffect(() => {
    const checkForNewAttendance = async () => {
      try {
        const response = await axios.get("http://localhost:5000/attendance");
        const data = response.data;

        if (Array.isArray(data) && data.length > attendance.length) {
          console.log("📌 New attendance detected, sending to blockchain...");
          markAttendance(data[data.length - 1].fingerprint_id.toString(), data[data.length - 1].timestamp, "Present");
        }

        setAttendance(data);
        filterAttendance(data, "all");
      } catch (error) {
        console.error("❌ Error fetching attendance:", error);
      }
    };

    const interval = setInterval(checkForNewAttendance, 5000);
    return () => clearInterval(interval);
  }, [attendance]); 

  const filterAttendance = (data, type) => {
    const today = new Date().toISOString().split("T")[0];
    let filtered = [];

    if (type === "present") {
      filtered = data.filter((item) => item.timestamp.startsWith(today));
    } else if (type === "absent") {
      filtered = [];
    } else {
      filtered = data;
    }

    setFilteredData(filtered);
    setFilterType(type);
  };
  return (
    <div className="container">
      <h1>🔒 Smart Door Lock System</h1>
  
      {!walletConnected ? (
        <>
          <button className="connect-wallet" onClick={connectWallet}>
            Connect Wallet
          </button>
          <button className="request-permissions" onClick={requestPermissions}>
            Request Permissions
          </button>
        </>
      ) : (
        <div>
          <h3>Connected to Wallet: {selectedAccount}</h3>
  
  
          <div className="filter-buttons">
            <button onClick={() => filterAttendance(attendance, "all")} className={filterType === "all" ? "active" : ""}>
              Access Logs
            </button>
            <button onClick={() => filterAttendance(attendance, "present")} className={filterType === "present" ? "active" : ""}>
              Recent Unlocks
            </button>
 
          </div>
  
          <table>
            <thead>
              <tr>
                <th>Fingerprint ID</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.fingerprint_id}</td>
                    <td>{item.timestamp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="no-data">No access logs available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
      

}

export default App;
