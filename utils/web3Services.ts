const Web3 = require("web3");

// const { ANKR_API_KEY, ANKR_RPC_ENDPOINT, ANKR_API_ENDPOINT } = process.env;
const ANKR_API_ENDPOINT = process.env.ANKR_API_ENDPOINT;
const NEXT_PUBLIC_ALCHEMY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_ALCHEMY_ACCESS_TOKEN;
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
const initializeSocketForPendingTransactions = () => {
	//wss://eth-mainnet.g.alchemy.com/v2/${NEXT_PUBLIC_ALCHEMY_ACCESS_TOKEN}
	// const web = new Web3();
	const web3 = new Web3(`wss://eth-mainnet.g.alchemy.com/v2/${NEXT_PUBLIC_ALCHEMY_ACCESS_TOKEN}`);

	// const message = fs.createWriteStream("./../pendingPool.txt");

	// message.write("tx-hash" + " " + "Arrival" + "\n");


	var subscription = web3.eth
		.subscribe("pendingTransactions", function (error: any, result: any) {
			if (error) console.log(error);
		})
		.on("data", function (result: any) {
			// message.write(result + " " + Date.now() + "\n");
			console.log(result,"\n====================")
		});
};

module.exports = {
	web3,
	getPendingTransactions,
	initializeSocketForPendingTransactions,
};
