import React, { useRef, useState } from "react"
import { Box, Text, VStack, Input, Button, Avatar, HStack, useColorModeValue } from "@chakra-ui/react"
import { SendOutlined } from '@ant-design/icons'
import * as CommentService from '../services/CommentService'
import { useMutationHooks } from '../hooks/useMutationHook'
import CommentPopover from './CommentPopover'

const Comment = ({ articleId, user, allComments, refetchComments }) => {
    const commentsEndRef = useRef(null)
    const [stateComment, setStateComment] = useState({
        userId: user.userId,
        articleId: articleId,
        content: ''
    })

    const mutation = useMutationHooks(async (data) => {
        const { ...rests } = data
        const res = await CommentService.createComment(rests)
        return res
    })

    const mutationUpdateComment = useMutationHooks(
        async (data) => {
            const { commentId, ...rests } = data
            const res = await CommentService.updateComment(commentId, rests)
            return res
        }
    )

    const fetchDeleteComment = async (commentId) => {
        const res = await CommentService.deleteComment(commentId)
        return res.data
    }

    const scrollToBottom = () => {
        if (commentsEndRef.current) {
            commentsEndRef.current.scrollTop = commentsEndRef.current.scrollHeight
        }
    }

    const handleComment = () => {
        if (!stateComment.content.trim()) return
        mutation.mutate(stateComment, {
            onSettled: () => {
                refetchComments().then(() => {
                    setTimeout(scrollToBottom, 100)
                })
            }
        })
        setStateComment({ ...stateComment, content: '' })
    }

    const handleOnchange = (e) => {
        setStateComment({
            userId: user.userId,
            articleId: articleId,
            [e.target.name]: e.target.value
        })
    }

    const handleDeleteComment = async (commentId) => {
        await fetchDeleteComment(commentId)
        refetchComments()
    }

    const handleApproveComment = async (commentId) => {
        mutationUpdateComment.mutate(
            { commentId, pending: false },
            {
                onSettled: () => {
                    refetchComments()
                }
            }
        )
    }

    return (
        <Box width={'100%'}>
            <Box
                backgroundColor={useColorModeValue("gray.50", "gray.700")} borderRadius="5px" p={2}>
                <Text as='b' fontSize={'xl'} textTransform='uppercase'>Comment</Text>
                {allComments.length > 0 ? (
                    <VStack align='left' overflow='auto' height='250px' my={4} ref={commentsEndRef}>
                        {allComments.map((comment) => (
                            (!comment.pending || user?.isAdmin || comment.userId === user?.userId) && (
                                <Box key={comment._id}>
                                    <HStack align='top'>
                                        <HStack flex={1} opacity={comment.pending ? 0.5 : 1} transition="opacity 0.3s ease">
                                            <Avatar name={comment.fullName} src={comment.imageUrl} />
                                            <VStack align='left' w='100%'>
                                                <HStack w='100%' justifyContent='space-between'>
                                                    <Text fontWeight='bold'>{comment.fullName}</Text>
                                                    {!user?.isAdmin && comment.pending && (
                                                        <Text fontSize="sm" color="yellow.500">Waiting for approval</Text>
                                                    )}
                                                </HStack>
                                                <HStack justifyContent='space-between'>
                                                    <Text>{comment.content}</Text>
                                                    <Text fontSize='sm' color='gray.400'>
                                                        {new Date(comment.createdAt).toLocaleString()}
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                        <Box pr={2}>
                                            {user?.isAdmin && (
                                                <CommentPopover
                                                    comment={comment}
                                                    onDelete={handleDeleteComment}
                                                    onApprove={handleApproveComment}
                                                />
                                            )}
                                        </Box>
                                    </HStack>
                                </Box>
                            )
                        ))}
                    </VStack>
                ) : (
                    <VStack overflow='auto' height='200px' my={4} ref={commentsEndRef} justify="center" align="center">
                        <Text fontSize='2xl' color='gray.400'>
                            No comments yet
                        </Text>
                    </VStack>
                )}
                {user?.userId ? (
                    <Box display='flex' gap={2}>
                        <Input placeholder="Comment here" value={stateComment.content}
                            name="content" onChange={handleOnchange}
                            onKeyDown={(e) => e.key === "Enter" && handleComment()}
                        />
                        <Button colorScheme="teal" onClick={() => handleComment()}><SendOutlined /></Button>
                    </Box>
                ) : (
                    <Box textAlign='center' fontWeight='bold' color='red'>
                        Sign in to comment
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Comment 