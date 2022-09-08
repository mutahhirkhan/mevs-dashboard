import {NextComponentType} from "next"
import styles from "./PendingTxList.module.css"
import {Transaction} from "./../../utils/block-cypher.config"
import PendingTxListItem from "./../PendingTxListItem/PendingTxListItem"
// import styles from "./PendingTxList.module"

interface Props {
    pendingList: Transaction[]
}

const PendingTxList:NextComponentType<Props> = ({pendingList}) => {
    return (
        <>
            <div className={styles.listWrapper}>  
                {/* {console.log("pendingList",pendingList)} */}
                {pendingList.map((tx:Transaction) => <PendingTxListItem key={tx.hash} transaction={tx}/>)}

            </div>
        </>
    )
}

export default PendingTxList;