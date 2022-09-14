// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { getPendingTransactions } from '../../utils/web3Services';
import { getPendingTransactions } from "./../../utils/block-cypher.config";
const { ankrGetPendingTransactions } = require("./../../utils/ankr.config") 
const { alchemyGetPendingTransaction } = require("./../../utils/alchemy.config") 


export default async function pending (req: NextApiRequest, res: NextApiResponse) {
  try {
    const {user, wss} = req.query;
    // console.log(JSON.stringify(req.headers));
    console.log(wss, user)
    if(!wss) {
      console.log('block cypher pending')
      const {data, error} = await getPendingTransactions();
      // console.log('api resposne',response?.[0], response?.[1], error)
      if(error) throw new Error(error.message)
      // console.log(response,'\n=====================\n' ,error)
      res.status(200).json({data})
    }
    else {
      console.log("alchemy wss query")
      alchemyGetPendingTransaction(user)
      // ankrGetPendingTransactions()
      // res.status(200).json({data})
    }
    
  } catch (error) { 
    console.log(error);
    res.status(404).json({ error })
  }
}