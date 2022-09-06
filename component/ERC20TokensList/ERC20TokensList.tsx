import ERC20TokenListItem from "./../ERC20TokenListItem/ERC20TokenListItem"
import styles from "./ERC20TokenList.module.css"
import styless from "./../ERC20TokenListItem/ERC20TokenListItem.module.css"

interface Props {
    tokenList: Item[]
}

const ERC20TokensList: React.FC = ({tokenList}:Props) => {
return (
    <div className={styles.listWrapper}>
        <div className={styless.tokenItem}>
            <strong className="flex"> NAME </strong>
            <strong className="flex"> IMAGE </strong>
            <strong className="flex"> DECIMALS </strong>
            <strong className="flex"> SYMBOL </strong>
            <strong className="flex"> TYPE </strong>
            <strong className="flex"> BALANCE  </strong>
            <strong className="flex"> CONTRACT </strong>
            {/* {contractAddress && <a href={`https://etherscan.io/address/${contractAddress}`}> view contract</a>} */}
            
            
        </div>
        {tokenList.map(token => <ERC20TokenListItem key={token.contractAddress} token={token}/>)}
    </div> 
    )   
}

export default ERC20TokensList;

