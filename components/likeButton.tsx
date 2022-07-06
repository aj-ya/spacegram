import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
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
    }, [handlePostInteraction, like, postid]);
    return like ? (
        <Button
            onClick={toggleLike}
            rightIcon={<AiFillHeart />}
            width="90px"
            height="30px"
            colorScheme="red"
            variant="outline"
            transition="0.3s ease-in-out"
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
            transition="0.3s ease-in-out"
        >
            Like
        </Button>
    );
};
export default LikeButton;
