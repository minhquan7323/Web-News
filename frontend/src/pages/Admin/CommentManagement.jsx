import React, { useEffect, useRef, useState } from 'react'
import { Box, VStack, Card, CardBody, Image, Button, Avatar, HStack, Text } from '@chakra-ui/react'
import { useMessage } from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import * as CommentService from '../../services/CommentService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import TableComponent from '../../components/Table/Table'
import { sortByDate } from '../../utils'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const CommentManagement = () => {
    const { success, error } = useMessage()
    const [deleteCommentId, setDeleteCommentId] = useState(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [rowSelected, setRowSelected] = useState(null)
    const searchInputRef = useRef(null)
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    const navigate = useNavigate()

    const fetchAllComments = async () => {
        const res = await CommentService.getAllComments()
        return res.data
    }
    const queryComments = useQuery({
        queryKey: ['allComments'],
        queryFn: fetchAllComments,
        retry: 2,
        retryDelay: 1000,
    })
    const { isLoading: isLoadingComments, data: comments } = queryComments

    const mutationApproveComment = useMutationHooks(
        async (data) => {
            const { commentId } = data
            const res = await CommentService.approveComment(commentId)
            return res
        }
    )

    const handleClickNav = (type, idArticle = '') => {
        if (type === 'add-article') {
            navigate('/system/admin/add-article')
        }
        if (type === 'update-article' && idArticle) {
            navigate(`/system/admin/update-article/${idArticle}`)
        }
        if (type === 'details' && idArticle) {
            navigate(`/article/details/${idArticle}`)
        }
    }

    const handleDeleteComment = async (commentId) => {
        await CommentService.deleteComment(commentId)
        success('Xóa bình luận thành công')
        queryComments.refetch()
        setDeleteCommentId(null)
    }

    const handleApproveComment = async (commentId) => {
        mutationApproveComment.mutate(
            { commentId },
            {
                onSettled: () => {
                    queryComments.refetch()
                }
            }
        )
        success('Bình luận đã được chấp thuận')
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }
    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText("")
    }

    const getColumnSearchProps = (dataIndex) => {
        const getNestedValue = (obj, path) => {
            return path.split('.').reduce((acc, part) => acc && acc[part], obj)
        }

        return {
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <Box p={2}>
                    <Input
                        ref={searchInputRef}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        mr={2}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} >
                        Reset
                    </Button>
                </Box>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
            onFilter: (value, record) => {
                const recordValue = getNestedValue(record, dataIndex)
                return recordValue?.toString().toLowerCase().includes(value.toLowerCase())
            },
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ""}
                    />
                ) : (
                    text
                ),
        }
    }

    const columns = [
        {
            title: 'Bài báo',
            dataIndex: 'articleId',
            ...getColumnSearchProps('articleId.title'),
            width: 300,
            render: (articleId) => (
                <HStack align='top'>
                    <HStack flex={1} opacity={articleId.pending ? 0.5 : 1} transition="opacity 0.3s ease">
                        <Image
                            src={articleId?.imageUrl}
                            alt={articleId?.title}
                            width="80px"
                            height="60px"
                            objectFit="cover"
                            borderRadius="md"
                            onClick={() => handleClickNav('details', articleId._id)}
                            cursor='pointer'
                        />
                        <Text>
                            {articleId?.title}
                        </Text>
                    </HStack>
                </HStack>
            )
        },
        {
            title: 'Bình luận',
            dataIndex: 'userId',
            ...getColumnSearchProps('userId.fullName'),
            width: 400,
            render: (_, record) => (
                <HStack align='top'>
                    <HStack flex={1} opacity={record.pending ? 0.5 : 1} transition="opacity 0.3s ease">
                        <Avatar name={record.userId.fullName} src={record.userId.imageUrl} />
                        <VStack align='left' w='100%'>
                            <HStack w='100%' justifyContent='space-between'>
                                <Text fontWeight='bold'>{record.userId.fullName}</Text>
                            </HStack>
                            <HStack justifyContent='space-between'>
                                <Text
                                    maxW="350px"
                                    textOverflow="ellipsis"
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                    display="block"
                                >
                                    {record.content}
                                </Text>
                                <Text fontSize='sm' color='gray.400'>
                                    {new Date(record.createdAt).toLocaleString()}
                                </Text>
                            </HStack>
                        </VStack>
                    </HStack>
                </HStack>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'pending',
            width: 100,
            filters: [
                {
                    text: 'Pending',
                    value: true,
                },
                {
                    text: 'Approved',
                    value: false,
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.pending === value,
            ellipsis: true,
            render: (pending) => pending ? 'Pending' : 'Approved'
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <Box display="flex" justifyContent="center">
                    <HStack spacing={2}>
                        <Button colorScheme="blue" size="sm" p={2}
                            disabled={!record.pending}
                            onClick={() => {
                                setRowSelected(record._id)
                                handleApproveComment(record._id)
                            }}
                        >
                            <i className="fas fa-edit"></i>
                        </Button>
                        <Button colorScheme="red" size="sm" p={2}
                            onClick={() => {
                                setDeleteCommentId(record._id)
                                handleDeleteComment(record._id)
                            }}
                        >
                            <i className="fas fa-trash"></i>
                        </Button>
                    </HStack>
                </Box>
            )
        }
    ]

    const dataTable = comments?.length && comments?.map((comment) => {
        return {
            ...comment,
            key: comment._id
        }
    })

    return (
        <TableComponent
            columns={columns}
            data={sortByDate(dataTable)}
            isLoading={isLoadingComments}
        />
    )
}

export default CommentManagement 