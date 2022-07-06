import { NextPage } from 'next';
import { useRouter } from 'next/router';

const SingleDay: NextPage = () => {
    const router = useRouter();
    const { date } = router.query;

    return <p>date: {date}</p>;
};
export default SingleDay;
