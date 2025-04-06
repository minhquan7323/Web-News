import { Box, Stack, Skeleton, HStack, Divider, Grid, VStack } from "@chakra-ui/react"

export const FeaturedArticleSkeleton = () => {
    return (
        <Box width="100%">
            <Skeleton
                height='100%'
                minHeight="300px"
                maxHeight='500px'
                width="100%"
                mb={4}
            />
            <Stack spacing={3}>
                <Skeleton height="36px" width="90%" />
                <Stack spacing={1}>
                    <Skeleton height="20px" width="40%" />
                </Stack>
                <Skeleton height="60px" width="100%" />
            </Stack>
        </Box>
    )
}

export const SideArticleSkeleton = () => {
    return (
        <Box width="100%">
            <HStack alignItems="start">
                <Skeleton
                    height="100px"
                    width="100px"
                    borderRadius="5px"
                />
                <Stack spacing={1} width="100%">
                    <Skeleton height="24px" width="90%" />
                    <Skeleton height="20px" width="40%" />
                </Stack>
            </HStack>
        </Box>
    )
}

export const ArticleInfinitySkeleton = () => {
    return (
        <Box width="100%">
            <Divider borderColor="gray.300" mb={4} />
            <Grid templateColumns="2fr 3fr" gap={4}>
                <Box width="100%">
                    <Skeleton
                        height='100%'
                        minHeight="80px"
                        maxHeight='200px'
                        width="100%"
                        minWidth='100px'
                    />
                </Box>
                <VStack align='start' spacing={2} width="100%">
                    <Skeleton height="24px" width="80%" />
                    <Skeleton height="20px" width="40%" />
                    <Skeleton height="60px" width="100%" />
                </VStack>
            </Grid>
        </Box>
    )
}

export const ArticleGridSkeleton = ({ bgColor }) => {
    return Array(8).fill(0).map((_, index) => (
        <Box key={index} p={2} backgroundColor={bgColor} borderRadius='5px'>
            <Skeleton height="200px" borderRadius="5px" mb={3} />
            <Stack spacing={3}>
                <Skeleton height="24px" />
                <Skeleton height="16px" width="70%" />
                <Skeleton height="40px" noOfLines={2} />
            </Stack>
        </Box>
    ))
}