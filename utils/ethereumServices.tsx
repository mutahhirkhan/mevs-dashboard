import axios from "axios";

export const getBalanceFromEtherscan = (isMainnet = false, walletAddress = "") =>
	axios.get(`https://api${isMainnet ? "" : "-goerli"}.etherscan.io/api?module=account&action=txlist
													&address=${walletAddress}
													&startblock=0
													&endblock=99999999
													&page=1
													&offset=10
													&sort=asc
													&apikey=${process.env.ETHERSCAN_API_TOKEN}`);

export const getNormalTxListOfAddress = (isMainnet = false, walletAddress = "") => 
    axios.get(`https://api${isMainnet ? "" : "-goerli"}.etherscan.io/api?module=account&action=txlist&address=${walletAddress}
													&startblock=0
													&endblock=99999999
													&page=1
													&offset=10
													&sort=asc
													&apikey=${process.env.ETHERSCAN_API_TOKEN}`);

                                                    // &contractaddress=${contractAddress}
export const getERC20TransferEventsByAddress = (isMainnet = false, contractAddress = "", walletAddress = "") =>
    axios.get(`https://api${isMainnet ? "" : "-goerli"}.etherscan.io/api?module=account&action=tokentx
                                                    &address=${walletAddress}
                                                    &startblock=0
                                                    &endblock=999999999999
                                                    &page=1
                                                    &offset=10
                                                    &sort=asc
                                                    &apikey=${process.env.ETHERSCAN_API_TOKEN}`);

export const getERC721TransferEventsByAddress = (isMainnet = false, contractAddress = "", walletAddress = "") =>
    axios.get(`https://api${isMainnet ? "" : "-goerli"}.etherscan.io/api?module=account&action=tokentx
                                                    &address=${walletAddress}
                                                    &contractaddress=${contractAddress}
                                                    &page=1
                                                    &offset=100
                                                    &startblock=0
                                                    &endblock=27025780
                                                    &sort=asc
                                                    &apikey=${process.env.ETHERSCAN_API_TOKEN}`);

export const getERC1155TransferEventsByAddress = (isMainnet = false, contractAddress = "", walletAddress = "") =>
    axios.get(`https://api${isMainnet ? "" : "-goerli"}.etherscan.io/api?module=account&action=tokentx
                                                    &address=${walletAddress}
                                                    &contractaddress=${contractAddress}
                                                    &page=1
                                                    &offset=100
                                                    &startblock=0
                                                    &endblock=99999999
                                                    &sort=asc
                                                    &apikey=${process.env.ETHERSCAN_API_TOKEN}`);