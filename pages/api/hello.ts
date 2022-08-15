// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getERC20TransferEventsByAddress} from "./../../utils/ethereumServices"
import config from "./config"

type Data = {
  name?: string,
  error?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const configurations = await config()
    const tokenEvents = await getERC20TransferEventsByAddress(true,"","0x9490eb162ecD2f97df5772417e3A4cb35Deb14d8")
    console.log("TOKEN EVENT", tokenEvents)
    // console.log("configurations",configurations);
    res.status(200).json({ name: 'John Doe' })
  } catch (error) {
    console.log(error);
    res.status(404).json({ error })
    
  }
}
