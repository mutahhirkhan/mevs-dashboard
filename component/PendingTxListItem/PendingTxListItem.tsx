import styles from "./PendingTxListItem.module.css"
import { CopyOutlined } from '@ant-design/icons';
import {Transaction} from "./../../utils/block-cypher.config"
import {TruncateAddress} from "./../../helper"
import {getFunctionNameBySignature} from "./../../utils/generalServices.config"
import { showSuccessMessage } from "./../Notification/Notification"

interface Props {
    transaction: Transaction[];
    functionName:any;
}

const PendingTxListItem: NextComponentType<Props> = ({transaction, functionName}) => {
    // console.log(transaction);
    const {hash, addresses,total,outputs, confirmations, gas_price, thumbnail, tokenDecimals, tokenSymbol, tokenType, balance, contractAddress} = transaction
    let functionSignature;
    // if(!functionName) {
    //     console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    //     console.log(transaction, functionName)
    // }
    // else {
    //     console.log("=======================================")
    // }
    if(functionName) {
        functionSignature = Object.keys(functionName)[0];
        // console.log('functionSignature',functionSignature)
    }
    return (
        <div className={styles.tokenItem}>
            <span className="flex">From: &nbsp; <a href={`https://etherscan.io/address/0x${addresses?.[0]}`}> {TruncateAddress(addresses?.[0])} </a> &nbsp; &nbsp; <CopyOutlined onClick={() => {navigator.clipboard.writeText(addresses?.[0]); showSuccessMessage('From Address Copied to clipboard')}} />  </span>
            <span className="flex"> To: &nbsp; <a href={`https://etherscan.io/address/0x${addresses?.[1]}`}> {TruncateAddress(addresses?.[1])} </a> &nbsp; &nbsp; <CopyOutlined onClick={() => {navigator.clipboard.writeText(addresses?.[0]); showSuccessMessage('To Address Copied to clipboard')}}/>  </span>
            <span className="flex"> Eth Amount: {total/1e18}{/** convert wei to eth */} </span>
            <span className={`flex ${styles.sig}`}> Function: {functionSignature === "0xundefined" ? "N/A " : functionName[functionSignature]?.[0]?.name} </span>
            {/* <span className="flex"> Confirmations: {confirmations}</span> */}
            <span className="flex"> Gas Price: {gas_price/1e9}{/**convert wei to Gwei */}</span>
            {hash && <a className="flex" href={`https://etherscan.io/tx/0x${hash}`} target="_blank"> view Transaction </a>}
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