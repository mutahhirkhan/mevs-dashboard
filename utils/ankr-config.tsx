const Web3 = require("web3");
const axios = require("axios");

const { ANKR_API_KEY, ANKR_RPC_ENDPOINT, ANKR_API_ENDPOINT } = process.env;
const url: string = `${ANKR_API_ENDPOINT}`; // url string

const web3 = new Web3(new Web3.providers.HttpProvider(url));

// web3.eth.getBlockNumber((error: any, blockNumber: any) => {
// 	if (!error) {
// 		console.log(blockNumber);
// 	} else {
// 		console.log(error);
// 	}
// });
//22e282df02e47a6dc906c48db9830304e93e9f12bb74a179152c747c01d4e7b7

let reqBody = {
	jsonrpc: "2.0",
	method: "ankr_getAccountBalance",
	params: {
		blockchain: "eth",
		walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
	},
	id: 1,
};
const endpoint = `${ANKR_RPC_ENDPOINT}`;

const ankrGetTokenBalances = async (address: string = "") => {
	try {
		reqBody.params.walletAddress = address;
		// console.log('calling to',reqBody);
		let response = await axios.post(endpoint, JSON.stringify(reqBody));
		console.log("response.data", response.data);
		return { data: response?.data?.result || {} };
	} catch (error) {
		console.log("errorrrrrrrrr");
		let message = "unknown error";
		if (error instanceof Error) message = error.message;
		console.log(message);
		return {
			error: message,
		};
	}
};

module.exports = {
	ankrGetTokenBalances,
};

export {};
