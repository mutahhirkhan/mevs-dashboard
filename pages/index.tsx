import {FormEvent} from 'react'
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Header from "../component/Heading/Heading";
import Input from "../component/Input/Input";
import NextHead from "../component/NextHead/NextHead";
import { fetchResponse } from "../utils/httpRequest";
import Avatar from '../component/Avatar/Avatar';
import Toggle from '../component/Toggle/Toggle';

interface Props {
    name: string,
}

const Home: NextPage<Props> = ({name}) => {
  
  const getUser = async (e: FormEvent<HTMLInputElement>) => {
    try {
      console.log(e)
    } catch (error) {
      console.log(error);
    }
  }
  const switchNetwork = async (isEthereum: FormEvent<HTMLInputElement>) => {
    if(isEthereum) console.log(isEthereum);

  }
  
	return (
		<div className={styles.container}>
			<NextHead/>

			<main className={styles.main}>
				<Header > hello dashboard </Header>
				<Input onSearch={getUser}/>
				<Avatar/>
        <Toggle onChange={switchNetwork}/>
			</main>

		</div>
	);
};

Home.getInitialProps = async (context) => {
  try {
    const response = await fetchResponse('hello');
    return response 
    
  } catch (error) {
    console.log(error);
  }
}

export default Home;
