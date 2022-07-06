import { Box, Center, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import ApodType from '../utils/ApodType';
import PostImage from './image';
import LikeButton from './likeButton';

const Post = ({
    apod,
    likes,
    handlePostInteraction,
}: {
    apod: ApodType;
    likes: Set<string>;
    handlePostInteraction: Function;
}) => {
    return (
        <Box
            borderWidth={'1px'}
            maxW={'lg'}
            borderRadius={'lg'}
            overflow={'hidden'}
            maxH={''}
        >
            <Center>
                <PostImage url={apod.url} alt={apod.title} />
            </Center>
            <Spacer height="6px" />
            <Box padding="10px">
                <Text
                    color={'gray.500'}
                    height="sm"
                    overflowY="scroll"
                    className="container"
                >
                    {apod.explanation}
                </Text>
                <Spacer />
                <Text fontWeight={600}>{apod.title}</Text>
                <Stack direction={'row'} spacing={'space-between'} width="100%">
                    <Center>
                        <Text color={'gray.500'}>{apod.date}</Text>
                    </Center>
                    <Spacer />
                    <LikeButton
                        postid={apod.date}
                        handlePostInteraction={handlePostInteraction}
                        defl={likes.has(apod.date)}
                    />
                </Stack>
            </Box>
        </Box>
    );
};
export default Post;
