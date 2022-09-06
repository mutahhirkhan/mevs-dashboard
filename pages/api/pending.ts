// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPendingTransactions } from '../../utils/web3Services';

export default async function pending (req: NextApiRequest, res: NextApiResponse) {
  try {
    const query = req.query;

    await getPendingTransactions();
    res.status(200).json({data:[] })

  } catch (error) {
    console.log(error);
    res.status(404).json({ error })
  }
}