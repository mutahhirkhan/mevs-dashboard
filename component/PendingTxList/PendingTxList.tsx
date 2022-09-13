import {useEffect, useState} from 'react'
import {NextComponentType} from "next"
import styles from "./PendingTxList.module.css"
import {Transaction} from "./../../utils/block-cypher.config"
import PendingTxListItem from "./../PendingTxListItem/PendingTxListItem"
import {getFunctionNameBySignatureArray} from "./../../utils/generalServices.config"
import { ankrGetPendingTransactions } from "./../../utils/ankr.config"
import { fetchResponse } from "./../../utils/httpRequest"
// const { ankrGetPendingTransactions } = require("./../../utils/ankr.config") 

interface Props {
    pendingList: Transaction[]
}
const PendingTxList:NextComponentType<Props> = ({pendingList}:Props) => {
    const [decodedSignatures, setDecodedSignatures] = useState([])
    

    useEffect(() => {
        (async () => {
            await initializePendingTransactions()
        })()
    },[])

    useEffect(() => {
        (async ()=> {
            let functionSignaturesArray:string[] = [];
            pendingList.forEach(tx => {
                let signature = tx.outputs?.[0]?.script?.substring(0,8)
                functionSignaturesArray.push(signature)
            })
            const response = getFunctionNameBySignatureArray(functionSignaturesArray)
            const resolvedResponse = await Promise.all(response);
            let tempDecodedSignatures: any[] =[];

            //remove unsed entries from api respnse
            resolvedResponse.forEach(sig => tempDecodedSignatures.push(sig.data?.result?.function))
            setDecodedSignatures(tempDecodedSignatures)
        })()
    },[])

    const initializePendingTransactions = async () => {
        try {
            console.log("component useeffect")
            const {data, error} = await fetchResponse("pending","",true);
        }
        catch(error) {
            console.log(error)
        }

        // await ankrGetPendingTransactions()
    }

    return (
        <>
            <div className={styles.listWrapper}>  
                {/* {console.log("pendingList",pendingList && pendingList[0])} */}
                {decodedSignatures.length > 0 && pendingList.map((tx:Transaction, index:number) => <PendingTxListItem key={tx.hash} transaction={tx} functionName = {decodedSignatures[index]}/>)}

            </div>
        </>
    )
}

export default PendingTxList;