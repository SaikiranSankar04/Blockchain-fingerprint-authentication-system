import { ethers } from "ethers";

export const CONTRACT_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

export const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "fingerprintId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "timestamp",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "status",
        "type": "string"
      }
    ],
    "name": "AttendanceMarked",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "attendanceRecords",
    "outputs": [
      {
        "internalType": "string",
        "name": "fingerprintId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "timestamp",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "status",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllRecords",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_fingerprintId",
        "type": "string"
      }
    ],
    "name": "getAttendance",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_fingerprintId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_timestamp",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_status",
        "type": "string"
      }
    ],
    "name": "markAttendance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "recordIds",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const getContract = (providerOrSigner) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
};
