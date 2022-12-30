/* eslint-disable react/no-children-prop */
import {
    Box,
    Center,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    Spacer,
} from '@chakra-ui/react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import ApodType from '../utils/ApodType';
import PostVertical from './post';

const Feed = ({
    userLikes,
    setUserLikes,
}: {
    userLikes: Set<string>;
    setUserLikes: Function;
}) => {
    const MapPosts = (ArrayofApods: Array<ApodType>) => {
        return ArrayofApods.map((Apod) => (
            <PostVertical
                key={Apod.date}
                apod={Apod}
                likes={userLikes}
                handlePostInteraction={handlePostInteraction}
            />
        ));
    };
    const handlePostInteraction = (date: string, like: boolean) => {
        if (like && !userLikes.has(date)) userLikes.add(date);
        else userLikes.delete(date);
        setUserLikes(userLikes);
    };
    const fromRef = useRef() as MutableRefObject<HTMLInputElement>;
    const toRef = useRef() as MutableRefObject<HTMLInputElement>;
    const today = new Date();
    const todayStr = today.toISOString().substring(0, 10);
    const elevenDaysAgoStr = new Date(
        today.getTime() - 24 * 60 * 60 * 1000 * 11
    )
        .toISOString()
        .substring(0, 10);
    const handleDateChange = async () => {
        const start_date = fromRef.current.value;
        const end_date = toRef.current.value;
        console.log(start_date, end_date);
        setLoading(true);
        await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=PwdzyE2LAUSIQUpIqbDxUhHA18CHXrIVFwW7C2Oa&start_date=${start_date}&end_date=${end_date}`
        )
            .then((res) => res.json())
            .then((res) => {
                setApods(res);
            });
        setLoading(false);
    };
    const [apods, setApods] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const initLoad = async () => {
            setLoading(true);
            await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=PwdzyE2LAUSIQUpIqbDxUhHA18CHXrIVFwW7C2Oa&start_date=${elevenDaysAgoStr}&end_date=${todayStr}`
            )
                .then((res) => res.json())
                .then((res) => {
                    setApods(res);
                    setLoading(false);
                });
        };
        initLoad();
    }, [todayStr, elevenDaysAgoStr]);
    const [minToDate, setMinToDate] = useState('2020-01-01');
    return (
        <Box width="100%">
            <Center>
                <Flex
                    direction="row"
                    wrap="wrap"
                    width="500px"
                    maxWidth="500px"
                    alignContent="center"
                    justifyContent="center"
                    gap="15px"
                >
                    <InputGroup width={'240px'}>
                        <InputLeftAddon children="From" width="70px" />
                        <Input
                            ref={fromRef}
                            type="date"
                            defaultValue={elevenDaysAgoStr}
                            min="1995-07-01"
                            onChange={(e) => {
                                setMinToDate(e.target.value);
                                handleDateChange();
                            }}
                            max={todayStr}
                        />
                    </InputGroup>
                    <InputGroup width={'240px'}>
                        <InputLeftAddon children="To" width="70px" />
                        <Input
                            ref={toRef}
                            type="date"
                            defaultValue={todayStr}
                            min={minToDate}
                            max={todayStr}
                            onChange={handleDateChange}
                        />
                    </InputGroup>
                </Flex>
            </Center>
            <Spacer height="50px" />
            <Flex
                width="100%"
                direction="row"
                wrap="wrap"
                gap="40px"
                alignContent="space-between"
                justifyContent="space-around"
            >
                {isLoading ? (
                    <BeatLoader size={8} color="grey" />
                ) : (
                    MapPosts(apods)
                )}
            </Flex>
        </Box>
    );
};
export default Feed;
