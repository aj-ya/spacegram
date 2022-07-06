import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';

const ShareButton = ({ date }: { date: string }) => {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 3000);
            var base_url = window.location.origin;
            navigator.clipboard.writeText(`${base_url}/date/${date}`);
        }
    }, [copied, date]);
    if (!copied) {
        return (
            <Button
                rightIcon={<AiOutlineShareAlt />}
                width="90px"
                height="30px"
                colorScheme="grey"
                variant="outline"
                transition="0.3s ease-in-out"
                onClick={() => {
                    setCopied(true);
                }}
            >
                Share
            </Button>
        );
    } else {
        return (
            <Button
                rightIcon={<AiOutlineShareAlt />}
                width="90px"
                height="30px"
                colorScheme="green"
                variant="outline"
                transition="0.3s ease-in-out"
            >
                Copied
            </Button>
        );
    }
};
export default ShareButton;
