import {useEffect, useState, useRef} from 'react'
import {NextComponentType} from "next"
import styles from "./PendingTxList.module.css"
import {Transaction} from "./../../utils/block-cypher.config"
import PendingTxListItem from "./../PendingTxListItem/PendingTxListItem"
import {getFunctionNameBySignatureArray, getFunctionNameBySignature} from "./../../utils/generalServices.config"
import { ankrGetPendingTransactions } from "./../../utils/ankr.config"
import { fetchResponse } from "./../../utils/httpRequest"
import { alchemyGetPendingTransaction } from "./../../utils/alchemy.config" 
import {showErrorMessage} from "./../Notification/Notification"

interface Props {
    pendingList: Transaction[];
    userAddress: string;
    isChanged: boolean;
}
const PendingTxList:NextComponentType<Props> = ({pendingList, userAddress, isChanged}:Props) => {
    let txArray : any[] = [];
    let counter: number = 0;
    // let alchemyInstance:any ;
    
    const [decodedSignatures, setDecodedSignatures] = useState<any[]>([])
    const [socketPendingTransactions, setSocketPendingTransactions] = useState<any[]>([])
    const alchemyRef = useRef<any>(null);

    

    const modelDecodedSignature = (signatureObject: any) => {
        /**
         * input: {
         *  '0xsig': [{
         *      filter: bool;
         *      name: "transfer(a,b,c)" 
         *  }]
         * }
         */
        let functionSignature = Object.keys(signatureObject)[0];
        let name = signatureObject[functionSignature]?.[0]?.name;
        return {
            signature: functionSignature,
            name
        }

    }

    useEffect(() => {
        // (async () => {
        // })()
            initializePendingTransactions()
    },[userAddress])


    //only runs on the mounting phase
    useEffect(() => {
        //FOR DECODING ARRAY OF SIGNATURES
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
            resolvedResponse.forEach(sig => tempDecodedSignatures.push(modelDecodedSignature(sig.data?.result?.function)))
            setDecodedSignatures(tempDecodedSignatures)
        })()
    },[isChanged])



    const getFunctionNameAndSetTransaction = async (res: any) => {
        let signature = res.input?.substring(0,10)
        console.log('secondary calling api')
        let {data, error} = await getFunctionNameBySignature(signature);
        if(error) showErrorMessage(error.message)
        else {
            let normalizeSignature = modelDecodedSignature(data)
            setDecodedSignatures((decodedSignatures) => [...decodedSignatures, normalizeSignature])
        }
        setSocketPendingTransactions((socketPendingTransactions) => [...socketPendingTransactions, res])
    }

    const initializePendingTransactions =  () => {
        try {
            // console.log('pending for ',userAddress)
            if(userAddress) {
                //0x6046945c5b5ef5933b8e73a98a6ad7bf3e031df7
                
                // if(!alchemyRef.current) 
                alchemyRef.current = alchemyGetPendingTransaction()
                setDecodedSignatures([])
                setSocketPendingTransactions([])
                //debugger;
                console.log('user',userAddress)
                alchemyRef.current.ws.on(
                	{ method: "alchemy_pendingTransactions",
                	fromAddress: userAddress, toAddress: userAddress},
                	async (res:any) => {
                        // console.log(res); 
                        // txArray.push(res)
                        await getFunctionNameAndSetTransaction(res)
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
        // if(decodedSignatures.length === 0) {
        //     console.log("================")
        //     console.log("decodedSignatures", decodedSignatures.length)
        //     console.log("================")
        // }
        // else {
        //     console.log("decodedSignatures", decodedSignatures.length)
        // }
    },[decodedSignatures.length])
    
    // stop websocket from fetch further pending transactions
    const closeSocket = () => alchemyRef.current.ws.removeAllListeners();
    const resumeSocket = () => initializePendingTransactions();

    return (
        <>
            {alchemyRef.current ? 
            <button ref={alchemyRef} onClick={closeSocket}> STOP FETCHING </button> 
            :  <button ref={alchemyRef} onClick={resumeSocket}> RESUME FETCHING </button>
            }
            <div className={styles.listWrapper+" "+ styles.boxShadowClass }>  
                {/* {console.log("pendingList",pendingList && pendingList[0])} */}
                
                {socketPendingTransactions.length > 0 ? 
                    socketPendingTransactions.map((tx, index) =>  <PendingTxListItem key={index+1}  transaction={tx} functionName = {decodedSignatures[index]} wss={true} /> )
                : 
                    decodedSignatures.length > 0 && pendingList.map((tx:Transaction, index:number) => <PendingTxListItem key={tx.hash} transaction={tx} functionName = {decodedSignatures[index]} wss={false}/>)
                }
            </div>
        </>
    )
}

export default PendingTxList;