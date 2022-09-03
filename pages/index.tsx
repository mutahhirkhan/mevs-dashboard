import { FormEvent, useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Header from "../component/Heading/Heading";
import Input from "../component/Input/Input";
import NextHead from "../component/NextHead/NextHead";
import { fetchResponse } from "../utils/httpRequest";
import Avatar from "../component/Avatar/Avatar";
import Toggle from "../component/Toggle/Toggle";
// import { connectWallet } from "../utils/requestAccount";
import { UnsupportedChainIdError, useWeb3React, Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { provider } from "web3-core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { getPendingTransactions } from "../utils/web3Services";

interface Props {
	name: string;
}

const getLibrary = (provider: provider) => {
	return new Web3(provider);
};

const Home: NextPage<Props> = ({ name }) => {
	// console.log("name", name);
	const { activate, account, active, deactivate, chainId, library } = useWeb3React();
  const [userTokenBalances, setUserTokenBalances] = useState([]);

	useEffect(() => {
		(async () => {
			await activate(metamaskConnector, (err: any) => {
				alert(getErrorMessage(err));
			});
		})();
	}, []);


	useEffect(() => {
		// console.log(active, account, chainId);
		
    (async () => {
      try {
        
        const {tokenHoldings, ...rest} = await fetchResponse("hello", "0xAfA13aa8F1b1d89454369c28b0CE1811961A7907");
        console.log("unipilot holdings:", tokenHoldings);
        setUserTokenBalances(tokenHoldings.assets)
        const {data, error} = await fetchResponse("pending");

      } catch (error) {
        console.log(error)
      }
	})();

	}, [account, chainId]);

  

	const metamaskConnector = new InjectedConnector({
		supportedChainIds: [1, 5, 137],
	});
	const getUser = async () => {};

	const getErrorMessage = (error: any) => {
		if (error instanceof NoEthereumProviderError) {
			return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
		} else if (error instanceof UnsupportedChainIdError) {
			return `You're connected to an unsupported network. Please switch to Ethereum Mainnet or Goerli`;
		} else if (error instanceof UserRejectedRequestError) {
			return "Please authorize this website to access your Ethereum account.";
		} else {
			console.error(error);
			return "An unknown error occurred. Check the console for more details.";
		}
	};

	return (
		<div className={styles.container}>
			<NextHead />

			<main className={styles.main}>
				<Header> hello dashboard </Header>
				<Input onSearch={getUser} />
				<Avatar />
				<Toggle chainId={chainId ? chainId : 1} />
				<Header> {account} </Header>
			</main>
		</div>
	);
};

const HomeWrapper: NextPage<Props> = ({ name }) => {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Home name={name} />
		</Web3ReactProvider>
	);
};

HomeWrapper.getInitialProps = async () => {
	try {
		const response = await fetchResponse("hello");
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default HomeWrapper;
