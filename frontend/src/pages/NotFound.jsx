import { Box, Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const NotFound = () => {
    return (
        <Box position="relative" height="100vh" width="100vw" bgColor='blue.100'>
            <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                fontSize='30vw'
                fontWeight="bold"
                color="gray.100"
                zIndex={0}
                userSelect="none"
            >
                404
            </Text>

            <VStack height="100vh" align="center" justify="center" position="relative" zIndex={1}>
                <Logo logo="PAGE NOT FOUND" fontSize='10vw' />
                <Button colorScheme="teal" variant="outline">
                    <Link to="/">
                        Go to <Text as="span" color="teal" fontWeight="bold">Home</Text>
                    </Link>
                </Button>
            </VStack>
        </Box>
    )
}

export default NotFound
