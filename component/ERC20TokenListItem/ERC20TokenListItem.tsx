import styles from "./ERC20TokenListItem.module.css"
interface TokenType {
    balance: number | string;
    balanceRawInteger: number | string;
    balanceUsd: number | string;
    blockchain: string;
    holderAddress: string
    thumbnail: string;
    tokenDecimals: number | string;
    tokenName: string
    tokenPrice: number | string;
    tokenSymbol: string
    contractAddress?: string;
    tokenType: string;
}

const ERC20TokenListItem = ({token}:TokenType) => {
    const {tokenName, thumbnail, tokenDecimals, tokenSymbol, tokenType, balance, contractAddress} = token
    return   (

        <div className={styles.tokenItem}>
            <span className="flex">{tokenName}</span>
            <span  className="flex">
                <img height="30px" src={thumbnail}/>
            </span>
            <span className="flex"> decimals: {tokenDecimals} </span>
            <span className="flex"> symbol: {tokenSymbol} </span>
            <span className="flex"> type: {tokenType} </span>
            <span className="flex">{balance} {tokenSymbol}</span>
            {/* <span>{tokenSymbol}</span> */}
            {contractAddress && <a className="flex" href={`https://etherscan.io/address/${contractAddress}`}> view contract</a>}
            
            
        </div>
    )
}

export default ERC20TokenListItem;

/**
 * balance: "3151.193481398491588436"
balanceRawInteger: "3151193481398491588436"
balanceUsd: "0"
blockchain: "eth"
holderAddress: "0xcbd6832ebc203e49e2b771897067fce3c58575ac"
thumbnail: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"
tokenDecimals: 18
tokenName: "Ethereum"
tokenPrice: "0"
tokenSymbol: "ETH"
tokenType: "NATIVE"

1
: 
balance: "298131"
balanceRawInteger: "298131000000000"
balanceUsd: "0"
blockchain: "eth"
contractAddress: "0x2ceee24f8d03fc25648c68c8e6569aa0512f6ac3"
holderAddress: "0xcbd6832ebc203e49e2b771897067fce3c58575ac"
thumbnail: ""
tokenDecimals: 9
tokenName: "ABCHANGE.io"
tokenPrice: "0"
tokenSymbol: "XCH"
tokenType: "ERC20"
 */