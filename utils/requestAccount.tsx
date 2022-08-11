
// import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
// import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from "@web3-react/injected-connector";

// // // https://metamask.io
// // // Requests access to the user's META MASK WALLET
// // export async function requestAccount(): Promise<string> {
// // 	// ❌ Check if Meta Mask Extension exists
// // 	if (window.ethereum) {
// // 		//detected
// // 		try {
// // 			//requesting address
// // 			const accounts = await window.ethereum.request({
// // 				method: "eth_requestAccounts",
// // 			});
// // 			return accounts[0];
// // 		} catch (error) {
// // 			// alert("Error connecting...");
// // 			return "0x0";
// // 		}
// // 	} else {
// // 		alert("download metamask");
// // 		return "0x0";
// // 	}
// // }

// export const metamaskConnector = new InjectedConnector({
// 	supportedChainIds: [1, 5],
// });

// // type CallbackFunction = (connector: InjectedConnector, callback: (err: any) => void) => void;

// const getErrorMessage = (error: any) => {
// 	if (error instanceof NoEthereumProviderError) {
// 		return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
// 	} else if (error instanceof UnsupportedChainIdError) {
// 		return `You're connected to an unsupported network. Please switch to Ethereum Mainnet`;
// 	} else if (error instanceof UserRejectedRequestError) {
// 		return "Please authorize this website to access your Ethereum account.";
// 	} else {
// 		console.error(error);
// 		return "An unknown error occurred. Check the console for more details.";
// 	}
// };

// export const connectWallet = async (activate: any) => {
// 	await activate(metamaskConnector, (err: any) => {
// 		alert(getErrorMessage(err));
// 	});
// };
