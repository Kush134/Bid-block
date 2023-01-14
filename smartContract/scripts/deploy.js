const hre = require("hardhat");

async function main() {
     const Auction = await hre.ethers.getContractFactory("auction");
     const auction = await Auction.deploy();
     await auction.deployed();
     console.log("Auction deployed to:", auction.address);
}

main().catch((error) => {
     console.error(error);
     process.exitCode = 1;
});