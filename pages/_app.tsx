import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Center, ChakraProvider, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Head>
                <title>SpaceGram</title>
                <meta name="spacegram" content="SpaceGram: space pictures" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
            <footer>
                <Center height="100%">
                    <Link href="https://github.com/aj-ya" isExternal>
                        <Center>
                            Ajeya Bhat <ExternalLinkIcon mx="2px" />
                        </Center>
                    </Link>
                </Center>
            </footer>
        </ChakraProvider>
    );
}

export default MyApp;
