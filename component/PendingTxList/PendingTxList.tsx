import {useEffect, useState} from 'react'
import {NextComponentType} from "next"
import styles from "./PendingTxList.module.css"
import {Transaction} from "./../../utils/block-cypher.config"
import PendingTxListItem from "./../PendingTxListItem/PendingTxListItem"
import {getFunctionNameBySignatureArray} from "./../../utils/generalServices.config"
// import styles from "./PendingTxList.module"

interface Props {
    pendingList: Transaction[]
}

const PendingTxList:NextComponentType<Props> = ({pendingList}) => {
    // let decodedSignatures = []
    const [decodedSignatures, setDecodedSignatures] = useState([])
    useEffect(() => {
        (async ()=> {
            let functionSignaturesArray:string[] = [];
            pendingList.forEach(tx => {
                // console.log(tx.outputs)
                //get starting 6 characters, which are function signature
                let signature = tx.outputs?.[0]?.script?.substring(0,8)
                // console.log('====================================');
                // console.log(signature);
                // console.log('====================================');
                functionSignaturesArray.push(signature)
            })
            //0xundefined

            const response = getFunctionNameBySignatureArray(functionSignaturesArray)
            const resolvedResponse = await Promise.all(response);
            let tempDecodedSignatures=[];
            //remove unsed entries from api respnse
            resolvedResponse.forEach(sig => tempDecodedSignatures.push(sig.data?.result?.function))
            // console.log(tempDecodedSignatures);
            setDecodedSignatures(tempDecodedSignatures)
            // console.log('SIGNATURE',decodedSignatures);
        })()
    },[])
    return (
        <>
            <div className={styles.listWrapper}>  
                {console.log("pendingList",pendingList && pendingList[pendingList.length-1])}
                {/* <PendingTxListItem  transaction = {pendingList[0]}/>
                <PendingTxListItem  transaction = {pendingList[1]}/> */}
                {decodedSignatures.length > 0 && pendingList.map((tx:Transaction, index:number) => <PendingTxListItem key={tx.hash} transaction={tx} functionName = {decodedSignatures[index]}/>)}

            </div>
        </>
    )
}

export default PendingTxList;