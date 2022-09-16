import  axios from "axios";
import Web3 from 'web3'
import styles from "./PendingTxListItem.module.css"
import { CopyOutlined } from '@ant-design/icons';
import {Transaction} from "./../../utils/block-cypher.config"
import {TruncateAddress} from "./../../helper"
import {getFunctionNameBySignature} from "./../../utils/generalServices.config"
import { showSuccessMessage, showErrorMessage } from "./../Notification/Notification"
import { useWeb3React } from "@web3-react/core";

type FunctionSignature = {
    signature: string;
    name: string;
}
interface Props {
    transaction: Transaction[];
    functionName:FunctionSignature;
    wss: boolean;
}

const PendingTxListItem: NextComponentType<Props> = ({transaction, functionName, wss}) => {
    // console.log("functionName",functionName)
    const {account, } = useWeb3React();

    const {hash, addresses,total, gas_price,/*onwards are of wss*/ from, to, value, input, gasPrice} = transaction
    
    const frontRun = async (contractAddress: string) => {
        try {
            const web3 = new Web3(web3Context?.library?.currentProvider);
            let etherScanContractApi = `https://api.etherscan.io/api?module=contract&action=getabi&address=0x${contractAddress}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_TOKEN}`
            
            const { data } = await axios.get(etherScanContractApi);
            //console.log("abi res",data)
            if (data.message === "NOTOK") {
                return {
                    error: data.result,
                };
            }
            const contractAbi: any = JSON.parse(data.result);

            const contract = new web3.eth.Contract(
                contractAbi as any,
                contractAddress
            );

            // contract.methods
            //     .mint(
            //         status,
            //         Web3.utils.toWei(price),
            //         Math.floor(date.getTime() / 1000).toString(),
            //         URI.cid.toString(),
            //         JSON.stringify(URI_Obj)
            //     )
            //     .send({
            //         from: web3Context.account,
            //     })
            //     .on("transactionHash", (hash) => {
            //         // console.log("hash 0", hash);
            //     })
            //     .on("error", () => {
            //         // console.log("hash 0", hash);
            //         // setLoading(false);
            //     })
            //     .on("confirmation", function (confirmationNumber) {
            //         if (confirmationNumber === 0) {
            //         navigate("/home");
            //         }
            //     });
            // }
        }catch(error) {
            showErrorMessage(error.message)
        }    
    }
        return (
            wss ? 
            <div className={styles.tokenItem}>
                <span className="flex">From: &nbsp; <a href={`https://etherscan.io/address/${from}` }  target="_blank" > {TruncateAddress(from)} </a> &nbsp; &nbsp; <CopyOutlined onClick={() => {navigator.clipboard.writeText(`${from}`); showSuccessMessage('From Address Copied to clipboard')}} />  </span>
                <span className="flex"> To: &nbsp; <a href={`https://etherscan.io/address/${to}` }  target="_blank" > {TruncateAddress(to)} </a> &nbsp; &nbsp; <CopyOutlined onClick={() => {navigator.clipboard.writeText(`${to}`); showSuccessMessage('To Address Copied to clipboard')}}/>  </span>
                <span className="flex"> Eth: {(+value)/1e18}{/** convert wei to eth */} </span>
                <span pan className={`flex ${styles.sig}`}> Function: {functionName?.signature === "0xundefined" ? "N/A " : functionName?.name} </span>
                <span className="flex"> Gas Price: {gasPrice/1e9} Gwei{/**convert wei to Gwei */}</span>
                {hash && <a className="flex" href={`https://etherscan.io/tx/${hash}`} target="_blank"> view Transaction </a>}
                <button className="flex" onClick={() => frontRun(to)}> Front Run </button>
            </div>
            : 
            <div className={styles.tokenItem}>
                <span className="flex">From: &nbsp; <a href={`https://etherscan.io/address/0x${addresses?.[1]}`}> {TruncateAddress(addresses?.[1])} </a> &nbsp; &nbsp; <CopyOutlined onClick={() => {navigator.clipboard.writeText(`0x${addresses?.[1]}`); showSuccessMessage('From Address Copied to clipboard')}} />  </span>
                <span className="flex"> To: &nbsp; <a href={`https://etherscan.io/address/0x${addresses?.[0]}`}> {TruncateAddress(addresses?.[0])} </a> &nbsp; &nbsp; <CopyOutlined onClick={() => {navigator.clipboard.writeText(`0x${addresses?.[0]}`); showSuccessMessage('To Address Copied to clipboard')}}/>  </span>
                <span className="flex"> Eth: {total/1e18}{/** convert wei to eth */} </span>
                <span className={`flex ${styles.sig}`}> Function: {functionName?.signature === "0xundefined" ? "N/A " : functionName?.name} </span>
                <span className="flex"> Gas Price: {gas_price/1e9} Gwei{/**convert wei to Gwei */}</span>
                {hash && <a className="flex" href={`https://etherscan.io/tx/0x${hash}`} target="_blank"> view Transaction </a>}
                <button className="flex" onClick={() => frontRun(addresses?.[0])}> Front Run </button>
                {/* <span className="flex" onClick={frontRun(addresses?.[0])}>  </span> */}
            </div>
        )
}

export default PendingTxListItem;
/**
 * {
 *      0xSomeSignature:[
 *          {
 *              filtered: bool,
 *              name: 'functionName(typeA,typeB)'
 *          }
 *      ]
 * }
 * 
[
    "block_height": -1,
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

//======================================================================
// WSS transactions
/**
 * 
accessList: []
blockHash: null
blockNumber: null
chainId: "0x1"
from: "0x1c8f6a5f009e051cab9c3851ca2da2c936b2775a"
gas: "0x3dad0"
gasPrice: "0x46ed5126f"
hash: "0x564389eaf679a184adbd3a35fbb201ae91098de862fe2d9ec6882d997a056494"
input: "0x1cff79cd000000000000000000000000a341dcee3e6e1302072fc1fd22a796df3f4ef2c5000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c402d4898300000000000000000000000000000000000000000000000084f34fb9af9d362800000000000000000000000000000000000000143126da11b21c000000000000000000000000000000000000000000000000000006661b04aa5d54203144fd420000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000006321bcd900000000000000000000000000000000000000000666062646171e5e714f3a9600000000000000000000000000000000000000000000000000000000"
maxFeePerGas: "0x46ed5126f"
maxPriorityFeePerGas: "0x173b99cf5"
nonce: "0x1b696"
r: "0xeadd8725991c758a6068adeb9e9c9ffb92076d908e141d03fba93c5c6198186b"
s: "0x284eb78d692b06140adbb7e2d7ad15bdd44b4df2ce22a5e246ec6369798d80dd"
to: "0xa69babef1ca67a37ffaf7a485dfff3382056e78c"
transactionIndex: null
type: "0x2"
v: "0x1"
value: "0x5903"
 */
// from, to, value, input, gasPrice, hash