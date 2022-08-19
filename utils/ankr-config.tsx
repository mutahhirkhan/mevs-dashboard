const Web3 = require("web3");
const axios = require("axios");

const url: string =
	"https://mev-dashboard:eb19103027@apis-sj.ankr.com/4fab80e33b224c1f84939e6167776402/78877b7f66d180e836a23fcaefd11cd4/eth/fast/main"; // url string

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
const endpoint = `https://rpc.ankr.com/multichain`

const getTokenBalances = async (address: string = "") => {
    try {
        reqBody.params.walletAddress = address;

        let response = await axios.post(endpoint, JSON.stringify(reqBody));
        // console.log(response.data);
        return response?.data?.result;
    } catch (error) {
        let message = "unknown error";
        if (error instanceof Error) message = error.message;
        console.log(message);
    }
}

module.exports = {
    getTokenBalances,
};
