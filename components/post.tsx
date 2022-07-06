import { Box, Center, Spacer, Stack, Text } from '@chakra-ui/react';
import ApodType from '../utils/ApodType';
import PostImage from './image';
import LikeButton from './likeButton';
import ShareButton from './shareButton';

const Post = ({
    apod,
    likes,
    handlePostInteraction,
}: {
    apod: ApodType;
    likes: Set<string>;
    handlePostInteraction: Function;
}) => {
    // console.log(likes);
    return (
        <Box
            borderWidth={'1px'}
            maxW={'lg'}
            borderRadius={'lg'}
            overflow={'hidden'}
            bgColor={'gray.100'}
        >
            <Center>
                <PostImage url={apod.url} alt={apod.title} />
            </Center>
            <Spacer height="6px" />
            <Box padding="10px">
                <Text fontWeight={600}>{apod.title}</Text>
                <Text
                    color={'gray.600'}
                    height="xs"
                    overflowY="scroll"
                    className="container"
                    textOverflow="ellipsis"
                >
                    {apod.explanation}
                </Text>
                <Spacer height="5px" />
                <Stack direction={'row'} spacing={'space-between'} width="100%">
                    <Center>
                        <Text color={'gray.500'}>{apod.date}</Text>
                    </Center>
                    <Spacer />
                    <Stack direction={'row'}>
                        <ShareButton date={apod.date} />
                        <LikeButton
                            postid={apod.date}
                            handlePostInteraction={handlePostInteraction}
                            defl={likes.has(apod.date)}
                        />
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
};
export default Post;
