require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1;
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;
const E_API = process.env.Etherscan_API;
const P_API = process.env.Polygon_API;
const POLYGON_URL = process.env.POLYGON_RPC_URL;


module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    goerli:{
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY_1],
    },
    polygon:{
      url: POLYGON_URL,
      accounts: [PRIVATE_KEY_2],
    }
  },
  etherscan:{
    apiKey: {
      polygonMumbai:P_API,
      goerli:E_API
  }},
  solidity: "0.8.17",
};
