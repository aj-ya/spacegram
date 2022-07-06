// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import api_key from '../../utils/api_key';

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const params = req.query;
    const result = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=${params.start_date}&end_date=${params.end_date}&thumbs=true`
    )
        .then((res) => res.json())
        .then((res) => {
            res.reverse();
            console.log(res);
            return res;
        });
    await res.status(200).json(await result);
}
