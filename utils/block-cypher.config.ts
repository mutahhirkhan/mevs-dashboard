const axios = require("axios");
import fetch from 'cross-fetch'
type Transaction = {
	block_height: number;
	block_index: number;
	hash: string;
	addresses: any;
	total: number;
	fee: number;
	size: number;
	gas_limit: number;
	gas_price: number;
	gas_tip_cap: number;
	gas_fee_cap: number;
	received: string;
	ver: number;
	double_spend: boolean;
	vin_sz: number;
	vout_sz: number;
	confirmations: number;
	inputs: any;
	outputs: any;
}

type FunctionResponse = {
	response?: Transaction[];
	error?: Error;
}

type ApiResponse = () => Promise<FunctionResponse>;

export const getPendingTransactions: any = async () => {
	try {
        
		const data = await fetch("https://api.blockcypher.com/v1/eth/main/txs?limit=100");
		// console.log('===========',response?.length)
        // let data = await response.json()
        // console.log('====================================');
        // console.log(res);
        // console.log('====================================');
        return {data};
	} catch (error) {
		console.log(error);
		return {
			error,
		};
	}
};

/**
 * "block_height": -1,
"block_index": 0,
"hash": "587fcd95df206b469d2323b706e5cf9d56a5b1820fb7d0329aefabf781f41c10",
"addresses": [
"441ff331f4f6b996b1095e72860641add0260e3e",
"beefbabeea323f07c59926295205d3b7a17e8638"
],
"total": 0,
"fees": 5596183524800000,
"size": 223,
"gas_limit": 200000,
"gas_price": 27980917624,
"gas_tip_cap": 2458456307,
"gas_fee_cap": 27980917624,
"received": "2022-09-07T13:34:54.512927225Z",
"ver": 0,
"double_spend": false,
"vin_sz": 1,
"vout_sz": 1,
"confirmations": 0,
"inputs": [
{
"sequence": 4155,
"addresses": [
"441ff331f4f6b996b1095e72860641add0260e3e"
]
}
],
"outputs": [
{
"value": 0,
"script": "000000116b175474e89094c44da98b954eedeac495271d0fc02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000f3f20b8dfa69d00000000000000000000000000000000000000000000000000000288802f31c0c840001",
"addresses": [
"beefbabeea323f07c59926295205d3b7a17e8638"
]
}
]
},
 */
export {
	Transaction
}