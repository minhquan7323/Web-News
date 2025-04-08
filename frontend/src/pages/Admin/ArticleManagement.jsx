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

    const handleClickNav = (type, idArticle = '') => {
        if (type === 'add-article') {
            navigate('/system/admin/add-article')
        }
        if (type === 'update-article' && idArticle) {
            navigate(`/system/admin/update-article/${idArticle}`)
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
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const isLoadingDeleted = mutationDelete.isPending

    const mutationDeleteMany = useMutationHooks(
        async (data) => {
            const { ...ids } = data
            const res = await ArticleService.deleteManyArticles(ids)
            return res
        }
    )
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany
    const isLoadingDeletedMany = mutationDeleteMany.isPending

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            success()
            onClose()
        } else if (isErrorDeleted) {
            error()
        }
    }, [dataDeleted, isSuccessDeleted, isErrorDeleted])
    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            success()
        } else if (isErrorDeletedMany) {
            error()
        }
    }, [dataDeletedMany, isSuccessDeletedMany, isErrorDeletedMany])

    const deleteArticle = () => {
        mutationDelete.mutate({ id: selectedArticles }, {
            onSettled: () => {
                queryArticle.refetch()
            }
        })
    }
    const deleteManyArticles = (ids) => {
        mutationDeleteMany.mutate({ ids: ids }, {
            onSettled: () => {
                queryArticle.refetch()
            }
        })
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
            title: 'Image',
            dataIndex: 'imageUrl',
            render: (text, record) => <Image
                src={text}
                alt={text}
                width="100%"
                height="100px"
                objectFit="cover"
                opacity={record.hide ? 0.5 : 1} transition="opacity 0.3s ease"
            />,
            width: 200,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            searchable: true,
            ...getColumnSearchProps('title'),
            ellipsis: true,
            render: (text, record) => <Text
                opacity={record.hide ? 0.5 : 1}
                transition="opacity 0.3s ease">
                {text}
            </Text>
        },
        {
            title: 'Featured',
            dataIndex: 'featured',
            width: 150,
            render: (featured, record) => <Text
                opacity={record.hide ? 0.5 : 1}
                transition="opacity 0.3s ease">
                {featured ? "true" : "false"}
            </Text>
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: 150,
            render: (types, record) => <Text
                opacity={record.hide ? 0.5 : 1}
                transition="opacity 0.3s ease">
                {types.map(type => type.name).join(', ')}
            </Text>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            fixed: 'right',
            align: 'center',
            width: 200,
            render: (_, record) => (
                <HStack spacing={2} justifyContent="center">
                    <Button colorScheme="blue" size="sm" p={2}
                        onClick={() => handleClickNav('update-article', record._id)}
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button colorScheme="orange" size="sm" p={2} onClick={onOpen}>
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
                    <Text as="span" paddingLeft={4}>Article</Text>
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

            <Modal Modal onClose={onClose} isOpen={isOpen} isCentered >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete article</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            Are you sure you want to delete this article?
                        </Box>
                    </ModalBody>
                    <ModalFooter gap={4}>
                        <Loading isLoading={isLoadingDeleted}>
                            <Button colorScheme="red" onClick={deleteArticle}>Delete</Button>
                        </Loading>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ArticleManagement
