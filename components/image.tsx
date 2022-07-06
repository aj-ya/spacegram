import { Box, Center, Image, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
const FallbackImage = () => {
    return (
        <Box width="lg" height="400" className="jd">
            <Center height="100%">
                <Spinner />
            </Center>
        </Box>
    );
};
const PostImage = ({ url, alt }: { url: string; alt: string }) => {
    const [loading, setLoading] = useState(false);
    return (
        <Image
            src={url}
            alt={alt}
            height="400px"
            width="lg"
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
                transform: 'scale(1.05)',
            }}
            _focus={{
                transform: 'scale(1.05)',
            }}
            fallback={<FallbackImage />}
        ></Image>
    );
};
export default PostImage;
