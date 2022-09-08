import styles from "./PendingTxListItem.module.css"
import {Transaction} from "./../../utils/block-cypher.config"
import {TruncateAddress} from "./../../helper"

const PendingTxListItem: React.FC = ({transaction}:Transaction) => {
    const {hash, addresses,total,outputs, thumbnail, tokenDecimals, tokenSymbol, tokenType, balance, contractAddress} = transaction
    let functionSignature = outputs[0].scripts;
    
    return (
        <div className={styles.tokenItem}>
            <span className="flex">From: {addresses?.[0]}</span>
            {/* <span  className="flex">
                <img height="30px" src={thumbnail}/>
            </span> */}
            <span className="flex"> To: {addresses?.[0]} </span>
            <span className="flex"> Eth Amount: {total} </span>
            <span className="flex"> Function: {outputs[0]} </span>
            <span className="flex">{balance} {tokenSymbol}</span>
            {/* <span>{tokenSymbol}</span> */}
            {hash && <a className="flex" href={`https://etherscan.io/tx/${hash}`} target="_blank"> view Transaction </a>}

        </div>
    )
}

export default PendingTxListItem;
/**
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