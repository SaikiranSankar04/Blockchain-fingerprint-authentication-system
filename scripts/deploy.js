const hre = require("hardhat");

async function main() {
    const Attendance = await hre.ethers.getContractFactory("Attendance");
    const attendance = await Attendance.deploy();  // ✅ No `.deployed()`
    
    console.log("Contract deployed to:", attendance.target);  // ✅ Use `.target` instead of `.address`
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
