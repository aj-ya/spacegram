/* eslint-disable react/no-children-prop */
import {
    Box,
    Center,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    Spacer,
    Stack,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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
    const fromRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const toRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const today = new Date();
    const todayStr = today.toISOString().substring(0, 10);
    const tenDaysAgoStr = new Date(today.getTime() - 24 * 60 * 60 * 1000 * 10)
        .toISOString()
        .substring(0, 10);
    const handleDateChange = async () => {
        const start_date = fromRef.current.value;
        const end_date = toRef.current.value;
        console.log(start_date, end_date);
        await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=PwdzyE2LAUSIQUpIqbDxUhHA18CHXrIVFwW7C2Oa&start_date=${start_date}&end_date=${end_date}&thumbs=true`
        )
            .then((res) => res.json())
            .then((res) => {
                setApods(res);
            });
    };
    const [apods, setApods] = useState([]);
    useEffect(() => {
        const initLoad = async () => {
            await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=PwdzyE2LAUSIQUpIqbDxUhHA18CHXrIVFwW7C2Oa&start_date=${tenDaysAgoStr}&end_date=${todayStr}&thumbs=true`
            )
                .then((res) => res.json())
                .then((res) => {
                    setApods(res);
                });
        };
        initLoad();
    }, [todayStr, tenDaysAgoStr]);

    const [minToDate, setMinToDate] = useState('2020-01-01');
    return (
        <Box width="100%">
            <Center>
                <Stack direction={'row'}>
                    <InputGroup>
                        <InputLeftAddon children="From" width="70px" />
                        <Input
                            ref={fromRef}
                            type="date"
                            defaultValue={tenDaysAgoStr}
                            min="2022-01-01"
                            onChange={(e) => {
                                setMinToDate(e.target.value);
                                handleDateChange();
                            }}
                            max={todayStr}
                        />
                    </InputGroup>
                    <InputGroup>
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
                </Stack>
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
                {MapPosts(apods)}
            </Flex>
        </Box>
    );
};
export default Feed;
