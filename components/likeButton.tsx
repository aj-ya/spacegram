import { Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import handler from '../pages/api/hello';
const LikeButton = ({
    postid,
    handlePostInteraction,
    defl,
}: {
    defl: boolean;
    postid: string;
    handlePostInteraction: Function;
}) => {
    const [like, setLike] = useState<boolean>(defl);

    const toggleLike = () => {
        setLike(!like);
    };
    useEffect(() => {
        handlePostInteraction(postid, like);
    }, [like]);
    return like ? (
        <Button
            onClick={toggleLike}
            rightIcon={<AiFillHeart />}
            width="90px"
            height="30px"
            colorScheme="red"
            variant="outline"
        >
            Unlike
        </Button>
    ) : (
        <Button
            onClick={toggleLike}
            rightIcon={<AiOutlineHeart />}
            colorScheme="grey"
            width="90px"
            height="30px"
            variant="outline"
        >
            Like
        </Button>
    );
};
export default LikeButton;
