import {useEffect, useState} from 'react'
import {NextComponentType} from "next"
import styles from "./PendingTxList.module.css"
import {Transaction} from "./../../utils/block-cypher.config"
import PendingTxListItem from "./../PendingTxListItem/PendingTxListItem"
import {getFunctionNameBySignatureArray} from "./../../utils/generalServices.config"
import { ankrGetPendingTransactions } from "./../../utils/ankr.config"
import { fetchResponse } from "./../../utils/httpRequest"
import { alchemyGetPendingTransaction } from "./../../utils/alchemy.config" 

interface Props {
    pendingList: Transaction[];
    userAddress: string;
    isChanged: boolean;
}
const PendingTxList:NextComponentType<Props> = ({pendingList, userAddress, isChanged}:Props) => {
    let txArray : any[] = []
    
    const [decodedSignatures, setDecodedSignatures] = useState([])
    const [socketPendingTransactions, setSocketPendingTransactions] = useState<any[]>([])
    

    useEffect(() => {
        // (async () => {
        // })()
        initializePendingTransactions()
    },[userAddress])

    useEffect(() => {
        //FOR DECODING SIGNATURE OF ARRAY
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
    },[isChanged])

    const initializePendingTransactions = () => {
        try {
            // console.log('pending for ',userAddress)
            if(userAddress) {
                //0x6046945c5b5ef5933b8e73a98a6ad7bf3e031df7
                const alchemyInstance = alchemyGetPendingTransaction()
                console.log('instance',alchemyInstance)
                console.log('user',userAddress)
                alchemyInstance.ws.on(
                	{ method: "alchemy_pendingTransactions",
                	fromAddress: userAddress, toAddress: userAddress},
                	(res:any) => {
                        console.log(res); 
                        txArray.push(res)
                        // setSocketPendingTransactions([...socketPendingTransactions, res])
                    }
                );
                // console.log("================")
                // console.log(txArray) 
                // console.log("================")
                // const {data, error} = await fetchResponse("pending",userAddress,true);
            }
        }
        catch(error) {
            console.log(error)
        }
        
        // await ankrGetPendingTransactions()
    }
    useEffect(() => {
        console.log("================")
        console.log(socketPendingTransactions)
        console.log("================")
    },[socketPendingTransactions.length])

    return (
        <>
            <div className={styles.listWrapper+" "+ styles.boxShadowClass }>  
                {/* {console.log("pendingList",pendingList && pendingList[0])} */}
                
                {socketPendingTransactions.length > 0 ? 
                    socketPendingTransactions.map((tx, index) =>  <PendingTxListItem key={index+1} transaction={tx} wss={true} /> )
                : 
                    decodedSignatures.length > 0 && pendingList.map((tx:Transaction, index:number) => <PendingTxListItem key={tx.hash} transaction={tx} functionName = {decodedSignatures[index]} wss={false}/>)
                }


            </div>
        </>
    )
}

export default PendingTxList;