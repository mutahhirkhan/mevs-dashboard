const Web3 = require("web3");
const axios = require("axios");
import WebSocket, { WebSocketServer } from 'ws';


const { ANKR_API_KEY, ANKR_RPC_ENDPOINT, ANKR_API_ENDPOINT, ANKR_WSS_ENDPOINT } = process.env;
const url: string = `${ANKR_API_ENDPOINT}`; // url string

const web3 = new Web3(new Web3.providers.HttpProvider(url));

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
		
		// if RPC returned error then send it back
		if(response.data.error) {
			throw new Error(response.data.error.message)
		} 
		
		//if all went good
		return { data: response?.data?.result || {} };
	} catch (error) {
		console.log("errorrrrrrrrr");
		// let message = "unknown error";
		// if (error instanceof Error) message = error.message;
		// console.log(message);
		return {
			error,
		};
	}
};

const ankrGetPendingTransactions =  () => {
	try {
		console.log("calling pending transactions")

		const request = '{"id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}';  

		const ws = new WebSocket(ANKR_WSS_ENDPOINT);

		ws.on('open', function open() {
			ws.send(request);
		});
		ws.on('message', function incoming(data:any) {
			let res = JSON.parse(data)
			console.log('RES==',res)
			// if (res.result != null) {
			// 	console.log(`Subscription: ${res.result}`);
			// } else if (res.params != null && res.params["result"] != null) {
			// 	console.log(`New pending transaction: ${res.params['result']}`);
			// } else {
			// 	console.log(`Unexpected: ${data}`);
			// }
		});
	}
	catch(error) {
		console.log(error)
	}
}


module.exports = {
	ankrGetTokenBalances,
	ankrGetPendingTransactions
};

export {};
