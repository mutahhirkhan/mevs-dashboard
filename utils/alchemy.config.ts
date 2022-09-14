const Web3 = require("web3");
const axios = require("axios");
// Setup: npm install alchemy-sdk
import { Alchemy, Network, TokenBalancesResponse } from "alchemy-sdk";
const { NEXT_PUBLIC_ALCHEMY_ACCESS_TOKEN } = process.env;

// const url: string = "https://eth-mainnet.g.alchemy.com/v2/9ypu7nYud-JjBWy9TdWMDJGX4ONqmYFW"; // url string
const url: string = `https://eth-mainnet.alchemyapi.io/v2/${NEXT_PUBLIC_ALCHEMY_ACCESS_TOKEN}`; // url string

const web3 = new Web3(new Web3.providers.HttpProvider(url));

// get all token balances of an address
const config = {
	apiKey: NEXT_PUBLIC_ALCHEMY_ACCESS_TOKEN,
	network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

//get top 100 token balance by volume
const getTokenBalances = async (address: string = "") => {
	try {
		console.log("USER ADDRESS", address);
		// Get token balances
		let balances: TokenBalancesResponse = await alchemy.core.getTokenBalances(address);

		// Remove tokens with zero balance
		const nonZeroBalances = balances.tokenBalances.filter((token) => +token?.tokenBalance !== 0);

		let metadata: any[] = [];
		let tokenBalanceResponse: object[] = [];

		// Loop through all tokens with non-zero balance
		nonZeroBalances.forEach((tok) => {
			let balance: any = tok.tokenBalance;
			metadata.push(alchemy.core.getTokenMetadata(tok.contractAddress));
		});

		metadata = await Promise.all(metadata);

		// Compute token balance in human-readable format
		metadata.forEach((token, index) => {
			let balance = +nonZeroBalances?.[index]?.tokenBalance;
			tokenBalanceResponse.push({
				tokenName: token.name,
				tokenSymbol: token.symbol,
				tokenBalance: balance / Math.pow(10, +token.decimals), //all the balances are in their wei notation, so converting to eth
				tokenDecimals: token.decimals,
				tokenAddress: nonZeroBalances[index].contractAddress,
			});
		});
		// console.log("tokenBalanceResponse", tokenBalanceResponse);
		return tokenBalanceResponse;
	} catch (error) {
		let message = "Unknown Error";
		if (error instanceof Error) message = error.message;
		console.log(message);
	}
};

const alchemyGetPendingTransaction = () => {
	//wss://eth-mainnet.g.alchemy.com/v2/9ypu7nYud-JjBWy9TdWMDJGX4ONqmYFW

	// // Get the latest block
	// const latestBlock = alchemy.core.getBlockNumber();
		
	// // Get all outbound transfers for a provided address
	// alchemy.core
	// 	.getTokenBalances('0x994b342dd87fc825f66e51ffa3ef71ad818b6893')
	// 	.then(console.log);

	// // Get all the NFTs owned by an address
	// const nfts = alchemy.nft.getNftsForOwner("0xshah.eth");
	console.log('alchemy quering for')
	//clear all previous listners, then initialized a new wss
	// alchemy.ws.removeAllListeners();

	// let txArray = ['1']

	// Listen to all new pending transactions
	//0x619c45eadff276a6520e16e4a0d7337b181e9979
	// alchemy.ws.on(
	// 	{ method: "alchemy_pendingTransactions",
	// 	fromAddress: "0x619c45eadff276a6520e16e4a0d7337b181e9979", toAddress: "0x619c45eadff276a6520e16e4a0d7337b181e9979"},
	// 	(res) => console.log(res)
	// );
	// console.log(txArray)
	return alchemy;

}

// runMain();

module.exports = {
	getTokenBalances,
	alchemyGetPendingTransaction,
};
