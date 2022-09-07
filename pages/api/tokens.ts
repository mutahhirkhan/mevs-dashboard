// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getERC20TransferEventsByAddress} from "../../utils/ethereumServices"
import config from "./config"
const  {getTokenBalances} = require( "./../../utils/alchemy.config")
const {ankrGetTokenBalances} = require("./../../utils/ankr.config") 

type Data = {
  name?: string,
  error?: any,
  tokenHoldings?: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let {user} = req.query
    //only call this config when interacting with smart contract
    // const configurations = await config()
    let ankrTokenResponse;
    console.log("getting token balances of user",user)
    if(user) {
      // const {data, error} = await getTokenBalances(user);
      const {data, error} = await ankrGetTokenBalances(user)
      ankrTokenResponse = data 
      
      if(error) {
        console.log('error found')   
        // res.status(304).json({ error })
        throw new Error( error)
      }
    }


    // console.log("tokenResponse",tokenResponse)
    // const {data: tokenEvents} = await getERC20TransferEventsByAddress(true,"","0x9490eb162ecD2f97df5772417e3A4cb35Deb14d8")
    // console.log("TOKEN EVENT", tokenEvents)
    // console.log("configurations",configurations);
    res.status(200).json({ name: 'John Doe', tokenHoldings: ankrTokenResponse })
  } catch (error) {
    console.log(error);
    res.status(404).json({ error })
    
  }
}
