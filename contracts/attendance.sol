// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attendance {
    struct Record {
        string fingerprintId;
        string timestamp;
        string status;
    }

    mapping(string => Record) public attendanceRecords;
    string[] public recordIds;

    event AttendanceMarked(string fingerprintId, string timestamp, string status);

    function markAttendance(string memory _fingerprintId, string memory _timestamp, string memory _status) public {
        attendanceRecords[_fingerprintId] = Record(_fingerprintId, _timestamp, _status);
        bool exists = false;
        for (uint i = 0; i < recordIds.length; i++) {
            if (keccak256(bytes(recordIds[i])) == keccak256(bytes(_fingerprintId))) {
                exists = true;
                break;
            }
        }
        
        if (!exists) {
            recordIds.push(_fingerprintId);
        }

        emit AttendanceMarked(_fingerprintId, _timestamp, _status);
    }

    function getAttendance(string memory _fingerprintId) public view returns (string memory, string memory, string memory) {
        Record memory record = attendanceRecords[_fingerprintId];
        return (record.fingerprintId, record.timestamp, record.status);
    }

    function getAllRecords() public view returns (string[] memory) {
        return recordIds;
    }

    function getAllAttendance() public view returns (Record[] memory) {
        Record[] memory records = new Record[](recordIds.length);
        for (uint i = 0; i < recordIds.length; i++) {
            records[i] = attendanceRecords[recordIds[i]];
        }
        return records;
    }
}
