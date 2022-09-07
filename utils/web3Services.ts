const Web3 = require("web3");

// const { ANKR_API_KEY, ANKR_RPC_ENDPOINT, ANKR_API_ENDPOINT } = process.env;
const ANKR_API_ENDPOINT = process.env.ANKR_API_ENDPOINT;
const url: string = `${ANKR_API_ENDPOINT}`; // url string

const web3 = new Web3(new Web3.providers.HttpProvider(url));
interface Props {
	data?: any;
}
const getPendingTransactions = async () => {
	try {
		const data = await web3.eth.getPendingTransactions();
		console.log("get mempool");
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
	web3,
	getPendingTransactions
}
