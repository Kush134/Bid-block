require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "polygon",
  networks: {
    hardhat: {},
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/A9JXZnvPgniEZ3X0Cthf79rUCC6-FoDF",
      accounts: ["56104ab1d9533e8bcae9b51acd4d2cdc3a4c8669112136842829a7107ec8f5ef"],
    }
  },

};
