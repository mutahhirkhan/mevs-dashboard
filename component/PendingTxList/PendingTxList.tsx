import {Transaction} from "./../../utils/block-cypher.config"
import PendingTxListItem from "./../PendingTxListItem/PendingTxListItem"

interface Props {
    pendingList: Transaction[]
}

const PendingTxList: React.FC = ({pendingList}:Props) => {
    return (
        <div>
            PendingTxList
            {pendingList.map(tx => <PendingTxListItem key={tx.hash}/>)}

        </div>
    )
}

export default PendingTxList;