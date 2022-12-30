/* eslint-disable react/no-children-prop */
import {
    Box,
    Center,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    Link,
    Spacer,
} from '@chakra-ui/react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import PostVertical from '../../components/post';
import ApodType from '../../utils/ApodType';
import NextLink from 'next/link';
import { BeatLoader } from 'react-spinners';
import { NextPage } from 'next';

const SingleDay: NextPage = () => {
    const [apod, setApod] = useState<ApodType>();
    const [allLikes, setAllLikes] = useState<Set<string>>(new Set<string>());
    useEffect(() => {
        setLoading(true);
        const localLikes = localStorage.getItem('likes') || '[]';
        setAllLikes(new Set(JSON.parse(localLikes)));
        console.log(allLikes);
        async function initLoad() {
            await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=PwdzyE2LAUSIQUpIqbDxUhHA18CHXrIVFwW7C2Oa&date=${dateRef.current.value}&thumbs=true`
            )
                .then((res) => res.json())
                .then((res) => {
                    setApod(res);
                });
        }
        initLoad();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePostInteraction = (date: string, like: boolean) => {
        if (like && !allLikes.has(date)) allLikes.add(date);
        else allLikes.delete(date);
        setAllLikes(allLikes);
        localStorage.setItem('likes', JSON.stringify(Array.from(allLikes)));
    };
    const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
    const todayStr = new Date().toISOString().substring(0, 10);
    const handleDateChange = async () => {
        setLoading(true);
        await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=PwdzyE2LAUSIQUpIqbDxUhHA18CHXrIVFwW7C2Oa&date=${dateRef.current.value}&thumbs=true`
        )
            .then((res) => res.json())
            .then((res) => {
                setApod(res[0]);
            });
        setLoading(false);
    };
    const [isLoading, setLoading] = useState(false);
    return (
        <main>
            <Box width="100%">
                <Center>
                    <Flex width={'lg'} padding="10px">
                        <NextLink href="/" passHref>
                            <Link>
                                <IconButton
                                    aria-label="Go Back Home"
                                    icon={<AiOutlineHome />}
                                />
                            </Link>
                        </NextLink>
                        <Spacer />
                        <InputGroup width="240px">
                            <InputLeftAddon children="Date" width="70px" />
                            <Input
                                ref={dateRef}
                                type="date"
                                defaultValue={todayStr}
                                min="1995-07-01"
                                onChange={handleDateChange}
                                max={todayStr}
                            />
                        </InputGroup>
                    </Flex>
                </Center>
                <Spacer height="10px" />
                <Center>
                    {isLoading ? (
                        <BeatLoader size={8} color="grey" />
                    ) : (
                        <PostVertical
                            apod={
                                apod || {
                                    date: '2022-07-06',
                                    explanation:
                                        "Our sky is alive with the streams of stars.  The motions of 26 million Milky Way stars are evident in the featured map constructed from recent data taken by ESA's Gaia satellite. Stars colored blue are moving toward us, while red indicates away. Lines depict the motion of the stars across the sky.",
                                    title: 'Milky Way Motion in 3D from Gaia',
                                    url: 'https://apod.nasa.gov/apod/image/2207/MilkyWayMotion_Gaia_1080.jpg',
                                }
                            }
                            likes={allLikes}
                            handlePostInteraction={handlePostInteraction}
                        />
                    )}
                </Center>
            </Box>
        </main>
    );
};
// export async function getServerSideProps({
//     query,
// }: {
//     query: { date: string };
// }) {
//     let { date } = query || '';
//     const datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
//     if (!datePattern.test(date as string)) {
//         date = new Date().toISOString().substring(0, 10);
//     }
//     const apod = await fetch(
//         `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}&thumbs=true`
//     ).then((res) => res.json());
//     return { props: await apod };
// }
export default SingleDay;
