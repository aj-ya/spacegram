import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Feed from '../components/feed';

const Home: NextPage = () => {
    const [allLikes, setAllLikes] = useState(new Set<string>());
    useEffect(() => {
        const localLikes = localStorage.getItem('likes') || '[]';
        setAllLikes(new Set(JSON.parse(localLikes)));
    }, []);
    const handleChangedLikes = (newSet: Set<string>) => {
        setAllLikes(newSet);
        localStorage.setItem('likes', JSON.stringify(Array.from(newSet)));
    };
    return (
        <main>
            <Feed userLikes={allLikes} setUserLikes={handleChangedLikes} />
        </main>
    );
};

export default Home;
