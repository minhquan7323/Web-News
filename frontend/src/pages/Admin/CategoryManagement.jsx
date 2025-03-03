import React, { useEffect, useRef, useState } from 'react'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as CategoryService from '../../services/CategoryService'
import { useQuery } from '@tanstack/react-query'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import TableComponent from "../../components/Table/Table"
import { sortByDate } from '../../utils'

import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useMessage } from '../../components/Message/Message'
import Loading from '../../components/Loading/Loading'

const CategoryManagement = () => {
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    const [rowSelected, setRowSelected] = useState('')
    const [stateDetailsCategory, setStateDetailsCategory] = useState({
        name: ''
    })
    const [stateCategory, setStateCategory] = useState({
        name: ''
    })
    const searchInputRef = useRef(null)

    const { isOpen: isAddOpen, onOpen: openAddModal, onClose: closeAddModal } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: openEditModal, onClose: closeEditModal } = useDisclosure()

    const { success, error } = useMessage()
    const [isLoadingDetails, setIsLoadingDetails] = useState(false)


    const fetchAllCategory = async () => {
        const res = await CategoryService.getAllCategory()
        return res.data
    }
    const fetchGetDetailsCategory = async (rowSelected) => {
        setIsLoadingDetails(true)
        const res = await CategoryService.getDetailsCategory(rowSelected)
        if (res?.data) {
            setStateDetailsCategory({
                name: res.data.name
            })
        }
        setIsLoadingDetails(false)
    }

    const queryCategory = useQuery({
        queryKey: ['categories'],
        queryFn: fetchAllCategory,
        retry: 2,
        retryDelay: 1000,
    })
    const { isLoading: isLoadingCategories, data: categories } = queryCategory

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }
    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText("")
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
            title: 'Name',
            dataIndex: 'name',
            searchable: true,
            ...getColumnSearchProps('name'),
            ellipsis: true
        },
        {
            title: 'Action',
            dataIndex: 'action',
            fixed: 'right',
            align: 'center',
            width: 200,
            render: (_, record) => (
                <Button colorScheme="blue" size="sm" p={2}
                    onClick={() => {
                        setRowSelected(record._id);
                        openEditModal();
                    }}
                >
                    <i className="fas fa-edit"></i>
                </Button>
            )
        }
    ]

    const dataTable = categories?.length && categories?.map((category) => {
        return {
            ...category, key: category._id
        }
    })

    const mutation = useMutationHooks(async (data) => {
        const { ...rests } = data
        const res = await CategoryService.createCategory(rests)
        return res
    })
    const { data, isSuccess, isError } = mutation
    const isLoading = mutation.isPending

    const mutationUpdate = useMutationHooks(async (data) => {
        const { id, ...rests } = data
        const res = await CategoryService.updateCategory(id, rests)
        return res
    }
    )
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const isLoadingUpdated = mutationUpdate.isPending

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            success("Category created successfully!")
            setStateCategory({
                name: ''
            })
        } else if (isError) {
            error("Failed to create Category")
        }
    }, [data, isSuccess, isError])
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            success('Category updated successfully!')
            closeEditModal()
        } else if (isErrorUpdated) {
            error("Failed to update Category")
        }
    }, [dataUpdated, isSuccessUpdated, isErrorUpdated])

    useEffect(() => {
        if (isEditOpen && rowSelected) {
            fetchGetDetailsCategory(rowSelected);
        }
    }, [isEditOpen, rowSelected]);

    const handleOnchange = (e) => {
        setStateCategory({
            ...stateCategory,
            [e.target.name]: e.target.value
        })
    }
    const handleOnchangeDetails = (e) => {
        setStateDetailsCategory({
            ...stateDetailsCategory,
            [e.target.name]: e.target.value
        })
    }

    const createCategory = () => {
        mutation.mutate({ ...stateCategory }, {
            onSettled: () => {
                queryCategory.refetch()
            }
        })
    }
    const updateCategory = () => {
        mutationUpdate.mutate({ id: rowSelected, ...stateDetailsCategory }, {
            onSettled: () => {
                queryCategory.refetch()
            }
        })
    }

    const isFormValid = stateCategory.name !== ''
    const isFormUpdateValid = stateDetailsCategory.name !== ''
    return (
        <>
            <Box>
                <Button colorScheme='blue' onClick={openAddModal}>
                    <i className="fa-solid fa-plus"></i>
                    <Text as="span" paddingLeft={4}>Category</Text>
                </Button>
                <TableComponent
                    columns={columns}
                    data={sortByDate(dataTable)}
                    isLoading={isLoadingCategories}
                />
            </Box>

            <Modal onClose={closeAddModal} isOpen={isAddOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Input
                                addonBefore="Category name"
                                value={stateCategory.name}
                                placeholder='Category name here'
                                onChange={handleOnchange}
                                name="name"
                            />
                        </Box>
                    </ModalBody>
                    <ModalFooter gap={4}>
                        <Loading isLoading={isLoading}>
                            <Button colorScheme="red" onClick={createCategory} disabled={!isFormValid}>
                                Add
                            </Button>
                        </Loading>
                        <Button onClick={closeAddModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal onClose={closeEditModal} isOpen={isEditOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <Loading isLoading={isLoadingDetails}>
                        <ModalHeader>Edit category</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box>
                                <Input
                                    addonBefore="Category name"
                                    value={stateDetailsCategory.name}
                                    placeholder='Category name here'
                                    onChange={handleOnchangeDetails}
                                    name="name"
                                />
                            </Box>
                        </ModalBody>
                        <ModalFooter gap={4}>
                            <Loading isLoading={isLoadingUpdated}>
                                <Button colorScheme="red" onClick={updateCategory} disabled={!isFormUpdateValid}>
                                    Edit
                                </Button>
                            </Loading>
                            <Button onClick={closeEditModal}>Close</Button>
                        </ModalFooter>
                    </Loading>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CategoryManagement
