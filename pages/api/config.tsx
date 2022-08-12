// require("dotenv").config();
// const ansi = require ('colors')
const { default: axios } = require("axios");
const Web3 = require("web3");
//import all from process.env
const { ALCHEMY_ACCESS_TOKEN, WALLET_PRIVATE_KEY } = process.env;
// https://eth-mainnet.g.alchemy.com/v2/9ypu7nYud-JjBWy9TdWMDJGX4ONqmYFW
// wss://eth-mainnet.g.alchemy.com/v2/9ypu7nYud-JjBWy9TdWMDJGX4ONqmYFW
const web3Mainnet = new Web3(new Web3.providers.HttpProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ACCESS_TOKEN}`));
const webSocketWeb3 = new Web3(new Web3.providers.WebsocketProvider(`wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ACCESS_TOKEN}`));
const web3Testnet = new Web3(new Web3.providers.HttpProvider(`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_ACCESS_TOKEN}`));

interface IConfigParams {
	contractAddress?: string;
	isMainnet?: boolean;
	amount?: number;
}

interface INotificationService {
	config(params: IConfigParams): Promise<any>;
}

const config = async (contractAddress = "", isMainnet = false, amount = 0) => {
	try {
		const contract = contractAddress ? contractAddress : "0x512fE96aa3cC9265b94Dc3017BF0d805AF0800F2";
		let putRinkeby = isMainnet ? "" : "-goerli";
		const { data } = await axios.get(`https://api${putRinkeby}.etherscan.io/api?module=contract&action=getabi&address=${contract}&apikey=${process.env.ETHERSCAN_API_TOKEN}`);
		//console.log("abi res",data)
        if (data.message === "NOTOK") {
            return {
                error: data.result,
            };
        }
        let abiResult;
        abiResult = JSON.parse(data.result);

		const {data: ethGasStationResponse} = await axios.get(`https://ethgasstation.info/json/ethgasAPI.json`);
        // console.log(ethGasStationResponse)

		return {
			abi: abiResult,
			contract,
			web3Testnet,
			web3Mainnet,
			web3Eth: isMainnet ? web3Mainnet.eth : web3Testnet.eth,
			axios,
			webSocketWeb3Eth: webSocketWeb3.eth,
			EthereumTx: require("ethereumjs-tx"),
			contractInstance: isMainnet
				? new web3Mainnet.eth.Contract(abiResult, contract)
				: new web3Testnet.eth.Contract(abiResult, contract),
			etherscanAPiToken: process.env.ETHERSCAN_API_TOKEN,
			transactionObject: {
				from: "",
				gas: 10000000000, // Something price like this
				gasPrice: ethGasStationResponse.fastest / 10, // Gas limit
				to: contract,
				value: 0,
				nonce: 0,
			},
		};
	} catch (error) {
		console.log(error);
		return {};
	}
};
export default config;
