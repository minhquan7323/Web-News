import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as ArticleService from '../../services/ArticleService'
import { useQuery } from '@tanstack/react-query'
import { Box, Button, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import TableComponent from '../../components/Table/Table'
import { sortByDate } from '../../utils'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Input } from 'antd'
import Loading from '../../components/Loading/Loading'
import { useMessage } from '../../components/Message/Message'

const ArticleManagement = () => {
    const { success, error } = useMessage()
    const navigate = useNavigate()
    const [selectedArticles, setSelectedArticles] = useState([])
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    const searchInputRef = useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isDeleting, setIsDeleting] = useState(false)

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

    const fetchAllArticle = async () => {
        const res = await ArticleService.getAllArticle()
        return res.data
    }

    const queryArticle = useQuery({
        queryKey: ['articles'],
        queryFn: fetchAllArticle,
        retry: 2,
        retryDelay: 1000,
    })
    const { isLoading: isLoadingArticles, data: articles } = queryArticle

    const mutationDelete = useMutationHooks(
        async (data) => {
            const { id } = data
            const res = await ArticleService.deleteArticle(id)
            return res
        }
    )
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete || {}
    const isLoadingDeleted = mutationDelete?.isPending || false

    const mutationDeleteMany = useMutationHooks(
        async (data) => {
            const { ...ids } = data
            const res = await ArticleService.deleteManyArticles(ids)
            return res
        }
    )
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany || {}
    const isLoadingDeletedMany = mutationDeleteMany?.isPending || false

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            success()
            onClose()
            setIsDeleting(false)
        } else if (isErrorDeleted) {
            error()
            setIsDeleting(false)
        }
    }, [dataDeleted, isSuccessDeleted, isErrorDeleted])
    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            success()
            setIsDeleting(false)
        } else if (isErrorDeletedMany) {
            error()
            setIsDeleting(false)
        }
    }, [dataDeletedMany, isSuccessDeletedMany, isErrorDeletedMany])

    const deleteArticle = () => {
        setIsDeleting(true)
        if (mutationDelete) {
            mutationDelete.mutate({ id: selectedArticles }, {
                onSettled: () => {
                    queryArticle.refetch()
                }
            })
        }
    }
    const deleteManyArticles = (ids) => {
        setIsDeleting(true)
        if (mutationDeleteMany) {
            mutationDeleteMany.mutate({ ids: ids }, {
                onSettled: () => {
                    queryArticle.refetch()
                }
            })
        }
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters) => {
        setSearchText("")
        clearFilters()
    }

    const getColumnSearchProps = (dataIndex) => ({
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
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
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
    })

    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'imageUrl',
            render: (text, record) => <Image
                src={text}
                alt={text}
                width="100%"
                height="80px"
                objectFit="cover"
                opacity={record.hide ? 0.5 : 1} transition="opacity 0.3s ease"
                onClick={() => handleClickNav('details', record._id)}
                cursor='pointer'
            />,
            width: 150,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            searchable: true,
            width: 300,
            ...getColumnSearchProps('title'),
            render: (text, record) => <Text
                opacity={record.hide ? 0.5 : 1}
                transition="opacity 0.3s ease">
                {text}
            </Text>
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            searchable: true,
            width: 150,
            ...getColumnSearchProps('author'),
            render: (author, record) => <Text
                opacity={record.hide ? 0.5 : 1}
                transition="opacity 0.3s ease">
                {author}
            </Text>
        },
        {
            title: 'Lượt xem',
            sorter: (a, b) => a.read - b.read,
            dataIndex: 'read',
            width: 150,
            render: (view, record) => <Text
                opacity={record.hide ? 0.5 : 1}
                transition="opacity 0.3s ease">
                {view}
            </Text>
        },
        {
            title: 'Bình luận',
            sorter: (a, b) => a.commentCount - b.commentCount,
            dataIndex: 'commentCount',
            width: 150,
            render: (commentCount, record) => <Text
                opacity={record.hide ? 0.5 : 1}
                transition="opacity 0.3s ease">
                {commentCount}
            </Text>
        },
        {
            title: 'Nổi bật',
            dataIndex: 'featured',
            width: 150,
            filters: [
                {
                    text: 'Có',
                    value: true,
                },
                {
                    text: 'Không',
                    value: false,
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.featured === value,
            ellipsis: true,
            render: (featured, record) => <Text
                opacity={record.hide ? 0.5 : 1}
                transition="opacity 0.3s ease">
                {featured ? "Có" : "không"}
            </Text>
        },
        {
            title: 'Thể loại',
            dataIndex: 'type',
            width: 150,
            filters: articles?.reduce((acc, article) => {
                article.type.forEach(type => {
                    if (!acc.some(filter => filter.value === type.name)) {
                        acc.push({ text: type.name, value: type.name })
                    }
                });
                return acc
            }, []),
            filterMode: 'tree',
            onFilter: (value, record) => record.type.some(type => type.name === value),
            render: (types, record) => <Text
                opacity={record.hide ? 0.5 : 1}
                transition="opacity 0.3s ease">
                {types.map(type => type.name).join(', ')}
            </Text>
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <HStack spacing={2} justifyContent="center">
                    <Button colorScheme="blue" size="sm" p={2}
                        onClick={() => handleClickNav('update-article', record._id)}
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button colorScheme="orange" size="sm" p={2} onClick={() => {
                        setSelectedArticles(record._id)
                        onOpen()
                    }}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>

                </HStack>
            )
        }
    ]

    const dataTable = articles?.length && articles?.map((article) => {
        return {
            ...article, key: article._id
        }
    })

    return (
        <Box>
            <Box>
                <Button colorScheme='blue' onClick={() => handleClickNav('add-article')}>
                    <i className="fa-solid fa-plus"></i>
                    <Text as="span" paddingLeft={4}>Thêm bài báo</Text>
                </Button>

            </Box>
            <TableComponent
                multiChoice={true}
                deleteMany={deleteManyArticles}
                columns={columns}
                data={sortByDate(dataTable)}
                isLoading={isLoadingArticles}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setSelectedArticles(record._id)
                        }
                    }
                }}
            />

            <Modal onClose={onClose} isOpen={isOpen} isCentered >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Xóa bài báo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            Bạn có chắc là muốn xóa bài báo này?
                        </Box>
                    </ModalBody>
                    <ModalFooter gap={4}>
                        <Loading isLoading={isDeleting}>
                            <Button colorScheme="red" onClick={deleteArticle}>Xóa</Button>
                        </Loading>
                        <Button onClick={onClose}>Đóng</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ArticleManagement
