import React, { useRef, useState, useEffect } from "react"
import { Box, Text, VStack, Input, Button, Avatar, HStack, useColorModeValue, } from "@chakra-ui/react"
import { SendOutlined } from '@ant-design/icons'
import * as CommentService from '../services/CommentService'
import { useMutationHooks } from '../hooks/useMutationHook'
import CommentPopover from './CommentPopover'
// import io from 'socket.io-client'

const Comment = ({ articleId, user, allComments, refetchComments }) => {
    const commentsScrollBoxRef = useRef(null)
    const [latestCommentId, setLatestCommentId] = useState(null)
    const [stateComment, setStateComment] = useState({
        userId: '',
        articleId: articleId,
        content: '',
        parentId: null
    })

    // const [socket, setSocket] = useState(null)
    const [replyingTo, setReplyingTo] = useState(null)

    const bgColor = useColorModeValue("gray.50", "gray.700")
    const replyBgColor = useColorModeValue("blue.50", "blue.900")
    const commentBgColor = useColorModeValue("white", "gray.800")
    const borderColor = useColorModeValue("gray.200", "gray.600")

    const mutation = useMutationHooks(async (data) => {
        const res = await CommentService.createComment(data)
        return res
    })

    const mutationApproveComment = useMutationHooks(async ({ commentId }) => {
        const res = await CommentService.approveComment(commentId)
        return res
    })

    const fetchDeleteComment = async (commentId) => {
        const res = await CommentService.deleteComment(commentId)
        return res.data
    }

    // useEffect(() => {
    //     const newSocket = io(import.meta.env.VITE_SOCKET_URL)
    //     setSocket(newSocket)

    //     return () => newSocket.close()
    // }, [])

    // useEffect(() => {
    //     if (socket) {
    //         socket.on('comment_added', (data) => {
    //             if (data.articleId === articleId) {
    //                 setLatestCommentId(data.comment._id)
    //                 refetchComments()
    //             }
    //         })

    //         socket.on('comment_updated', (data) => {
    //             if (data.articleId === articleId) {
    //                 refetchComments()
    //             }
    //         })

    //         socket.on('comment_removed', (data) => {
    //             if (data.articleId === articleId) {
    //                 refetchComments()
    //             }
    //         })

    //         return () => {
    //             socket.off('comment_added')
    //             socket.off('comment_updated')
    //             socket.off('comment_removed')
    //         }
    //     }
    // }, [socket, articleId])

    const handleComment = () => {
        if (!stateComment.content.trim()) return

        mutation.mutate(stateComment, {
            onSuccess: (res) => {
                setLatestCommentId(res.data._id)
                refetchComments()
            }
        })
        setStateComment({
            ...stateComment,
            content: '',
            parentId: null
        })
        setReplyingTo(null)
    }

    const handleOnchange = (e) => {
        setStateComment({
            ...stateComment,
            [e.target.name]: e.target.value
        })
    }

    const handleDeleteComment = async (commentId) => {
        await fetchDeleteComment(commentId)
        refetchComments()
    }

    const handleApproveComment = async (commentId) => {
        mutationApproveComment.mutate(
            { commentId },
            {
                onSettled: () => {
                    refetchComments()
                }
            }
        )
    }

    const handleReply = (comment) => {
        setReplyingTo(comment)
        setStateComment({
            ...stateComment,
            parentId: comment._id
        })
    }

    const cancelReply = () => {
        setReplyingTo(null)
        setStateComment({
            ...stateComment,
            parentId: null
        })
    }

    const renderComment = (comment, isReply = false) => {
        const parentComment = comment.parentId ? allComments.find(c => c._id === comment.parentId) : null

        const shouldShowComment = !comment.pending || user?.isAdmin || comment.userId === user?.userId
        if (!shouldShowComment) return null

        return (
            <Box
                key={comment._id}
                id={comment._id}
                ml={isReply ? 4 : 0}
                mb={4}
                p={3}
                borderRadius="md"
                bg={commentBgColor}
                borderWidth="1px"
                borderColor={borderColor}
                boxShadow="sm"
            >
                <HStack align='top' spacing={3}>
                    <Avatar name={comment.fullName} src={comment.imageUrl} size="sm" opacity={comment.pending ? 0.5 : 1} transition="opacity 0.3s ease" />
                    <VStack align='left' w='100%' spacing={2} opacity={comment.pending ? 0.5 : 1} transition="opacity 0.3s ease">
                        <HStack w='100%' justifyContent='space-between'>
                            <Text fontWeight='bold'>{comment.fullName}</Text>
                            <Text fontSize='sm' color='gray.400'>
                                {new Date(comment.createdAt).toLocaleString()}
                            </Text>
                        </HStack>
                        <Box>
                            <Text>
                                {parentComment && <Text as="span" color="blue.500" fontWeight="bold">@{parentComment.fullName} </Text>}
                                {comment.content}
                            </Text>
                        </Box>
                        <HStack spacing={4}>
                            {!isReply && user?.userId && !user?.isBanned && !comment.pending && (
                                <Button
                                    size="xs"
                                    variant="ghost"
                                    colorScheme="blue"
                                    leftIcon={<i className="fas fa-reply"></i>}
                                    onClick={() => { handleReply(comment) }}
                                >
                                    Reply
                                </Button>
                            )}
                            {!user?.isAdmin && comment.pending && (
                                <Text fontSize="sm" color="yellow.500">Waiting for approval</Text>
                            )}
                        </HStack>
                    </VStack>
                    <Box>
                        {user?.isAdmin && (
                            <CommentPopover
                                comment={comment}
                                onDelete={handleDeleteComment}
                                onApprove={handleApproveComment}
                            />
                        )}
                    </Box>
                </HStack>

                {comment.replies && comment.replies.length > 0 && (
                    <VStack align='left' mt={2} borderLeftWidth="2px" borderLeftColor={borderColor}>
                        {comment.replies.map(reply => renderComment(reply, true))}
                    </VStack>
                )}
            </Box>
        )
    }

    useEffect(() => {
        if (latestCommentId) {
            const el = document.getElementById(latestCommentId)
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" })
                setLatestCommentId(null)
            }
        }
    }, [allComments, latestCommentId])

    useEffect(() => {
        if (user?.userId) {
            setStateComment(prev => ({
                ...prev,
                userId: user.userId
            }))
        }
    }, [user])

    const approvedCount = allComments.filter(comment => !comment.pending).length
    const approvedRepliesCount = allComments.map(comment => comment.replies.filter(reply => !reply.pending).length).reduce((a, b) => a + b, 0)
    const pendingCount = allComments.filter(comment => comment.pending).length
    const pendingRepliesCount = allComments.map(comment => comment.replies.filter(reply => reply.pending).length).reduce((a, b) => a + b, 0)

    return (
        <Box width={'100%'}>
            <Box backgroundColor={bgColor} borderRadius="lg" p={4} boxShadow="md">
                <HStack justifyContent='space-between' mb={4}>
                    <Text as='b' fontSize={'xl'} textTransform='uppercase'>Comment</Text>
                    <Text fontSize='sm' as='b'>
                        {approvedCount + approvedRepliesCount} {approvedCount + approvedRepliesCount > 1 ? 'comments' : 'comment'}
                    </Text>
                </HStack>

                <Box display="flex" justifyContent='flex-end' mb={2}>
                    {user?.isAdmin && pendingCount > 0 && (
                        <Text fontSize='sm' color='yellow.500'>
                            {pendingCount + pendingRepliesCount} {pendingCount + pendingRepliesCount > 1 ? 'comments' : 'comment'} waiting for approval
                        </Text>
                    )}
                </Box>

                {allComments?.length === 0 || (
                    allComments.filter(c => !c.pending).length === 0 &&
                    !user?.isAdmin &&
                    !allComments.some(c => c.userId === user?.userId)
                ) ? (
                    <VStack overflow='auto' height='400px' my={4} justify="center" align="center">
                        <Text fontSize='2xl' color='gray.400'>
                            No comments yet
                        </Text>
                    </VStack>
                ) : (
                    <Box
                        ref={commentsScrollBoxRef}
                        overflowY="auto"
                        height="400px"
                        my={4}
                    >
                        <VStack align='left' spacing={0}>
                            {allComments?.map((comment) => {
                                const shouldShowComment =
                                    !comment.pending ||
                                    user?.isAdmin ||
                                    comment.userId === user?.userId;
                                return shouldShowComment && renderComment(comment);
                            })}
                        </VStack>
                    </Box>
                )}


                {user?.userId ? (
                    user?.isBanned ? (
                        <Box textAlign='center' fontWeight='bold' color='red' p={4}>
                            Your account has been banned. You cannot comment.
                        </Box>
                    ) : (
                        <Box>
                            {replyingTo && (
                                <HStack mb={3} p={3} bg={replyBgColor} borderRadius="md" justifyContent='space-between'>
                                    <Text fontSize="sm" fontWeight="bold" color="blue.500">
                                        Replying to <Text as="span" color="blue.700">{replyingTo.fullName}</Text>
                                    </Text>
                                    <Button size="sm" colorScheme="yellow" onClick={cancelReply}>
                                        <i className="fas fa-times"></i> <Text pl={2}>Cancel</Text>
                                    </Button>
                                </HStack>
                            )}
                            <Box display='flex' gap={2}>
                                <Input
                                    placeholder={replyingTo ? `Reply to ${replyingTo.fullName}` : "Comment here"}
                                    value={stateComment.content}
                                    name="content"
                                    onKeyDown={(e) => e.key === "Enter" && handleComment()}
                                    onChange={handleOnchange}
                                    borderRadius="md"
                                />
                                <Button colorScheme="teal" onClick={handleComment} borderRadius="md">
                                    <SendOutlined />
                                </Button>
                            </Box>
                        </Box>
                    )
                ) : (
                    <Box textAlign='center' fontWeight='bold' color='red' p={4}>
                        Sign in to comment
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Comment
