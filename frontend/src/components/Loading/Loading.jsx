import { Spinner, Box } from "@chakra-ui/react";
import React from "react";

const Loading = ({ children, isLoading = false }) => {
    return (
        <Box position="relative" display="inline-block">
            {isLoading && (
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    zIndex="1"
                >
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Box>
            )}
            <Box opacity={isLoading ? 0.5 : 1}>
                {children}
            </Box>
        </Box>
    );
};

export default Loading;
