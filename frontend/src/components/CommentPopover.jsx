import { Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverHeader, VStack, HStack, useDisclosure } from "@chakra-ui/react"

const CommentPopover = ({ comment, onDelete, onApprove }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <Button size="xs" colorScheme={comment.pending ? 'yellow' : 'blue'}>
                    <i className="fa-solid fa-ellipsis"></i>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Manage comment</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody p={2}>
                    <VStack align="stretch">
                        <HStack justifyContent="flex-end">
                            <Button colorScheme="red" onClick={() => onDelete(comment._id)}>Delete</Button>
                            {comment.pending ? (
                                <Button colorScheme="yellow" onClick={() => {
                                    onApprove(comment._id)
                                    onClose()
                                }}>Approve</Button>
                            ) : null}
                        </HStack>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default CommentPopover 