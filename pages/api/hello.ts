// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
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
    // console.log("configurations",configurations);
    res.status(200).json({ name: 'John Doe' })
  } catch (error) {
    console.log(error);
    res.status(404).json({ error })
    
  }
}
