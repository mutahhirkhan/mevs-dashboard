const Web3 = require("web3");
const axios = require("axios");
// Setup: npm install alchemy-sdk
import { Alchemy, Network, TokenBalancesResponse } from "alchemy-sdk";

// const url: string = "https://eth-mainnet.g.alchemy.com/v2/9ypu7nYud-JjBWy9TdWMDJGX4ONqmYFW"; // url string
const url: string = "https://eth-mainnet.alchemyapi.io/v2/9ypu7nYud-JjBWy9TdWMDJGX4ONqmYFW"; // url string

const web3 = new Web3(new Web3.providers.HttpProvider(url));

// get all token balances of an address
const config = {
	apiKey: "9ypu7nYud-JjBWy9TdWMDJGX4ONqmYFW",
	network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

//get top 100 token balance by volume
const getTokenBalances = async (address: string = "") => {
	try {
		console.log('USER ADDRESS',address)
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

// runMain();

module.exports = {
	getTokenBalances,
};
