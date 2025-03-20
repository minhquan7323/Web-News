import React, { useEffect, useRef, useState } from 'react'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { useQuery } from '@tanstack/react-query'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import TableComponent from "../../components/Table/Table"
import { sortByDate } from '../../utils'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, Image } from '@chakra-ui/react'
import { useMessage } from '../../components/Message/Message'
import Loading from '../../components/Loading/Loading'

const UserManagement = () => {
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    const [rowSelected, setRowSelected] = useState('')
    const [stateDetailsUser, setStateDetailsUser] = useState({
        isAdmin: false
    })
    const searchInputRef = useRef(null)

    const { isOpen: isEditOpen, onOpen: openEditModal, onClose: closeEditModal } = useDisclosure()

    const { success, error } = useMessage()
    const [isLoadingDetails, setIsLoadingDetails] = useState(false)

    const fetchAllUser = async () => {
        const res = await UserService.getAllUser()
        return res
    }
    const fetchGetDetailsUser = async (rowSelected) => {
        setIsLoadingDetails(true)
        const res = await UserService.getDetailsUser(rowSelected)
        if (res?.data) {
            setStateDetailsUser({
                isAdmin: res.data.isAdmin
            })
        }
        setIsLoadingDetails(false)
    }

    const queryUser = useQuery({
        queryKey: ['users'],
        queryFn: fetchAllUser,
        retry: 2,
        retryDelay: 1000,
    })
    const { isLoading: isLoadingUsers, data: users } = queryUser

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
            title: 'User ID',
            dataIndex: 'userId',
            searchable: true,
            ...getColumnSearchProps('userId'),
            ellipsis: true
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            searchable: true,
            ...getColumnSearchProps('fullName'),
            ellipsis: true
        },
        {
            title: 'Avatar',
            dataIndex: 'imageUrl',
            searchable: true,
            ...getColumnSearchProps('imageUrl'),
            ellipsis: true,
            render: (imageUrl) => (
                <Image
                    src={imageUrl}
                    alt="User avatar"
                    boxSize="40px"
                    borderRadius="full"
                    objectFit="cover"
                />
            )
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            searchable: true,
            ...getColumnSearchProps('isAdmin'),
            ellipsis: true,
            render: (isAdmin) => isAdmin ? 'Yes' : 'No'
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
                        setRowSelected(record.userId);
                        openEditModal();
                    }}
                >
                    <i className="fas fa-edit"></i>
                </Button>
            )
        }
    ]

    const dataTable = users?.data.length && users?.data.map((user) => {
        return {
            ...user, key: user.userId
        }
    })

    const mutationUpdate = useMutationHooks(async (data) => {
        const { userId, ...rests } = data
        const res = await UserService.updateUser(userId, rests)
        return res
    }
    )
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const isLoadingUpdated = mutationUpdate.isPending

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            success('User updated successfully!')
            closeEditModal()
        } else if (isErrorUpdated) {
            error("Failed to update User")
        }
    }, [dataUpdated, isSuccessUpdated, isErrorUpdated])

    useEffect(() => {
        if (isEditOpen && rowSelected) {
            fetchGetDetailsUser(rowSelected);
        }
    }, [isEditOpen, rowSelected]);

    const handleOnchangeDetails = (e) => {
        const { name, type, checked } = e.target
        setStateDetailsUser({
            ...stateDetailsUser,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const updateUser = () => {
        mutationUpdate.mutate({ userId: rowSelected, ...stateDetailsUser }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    return (
        <>
            <Box>
                <TableComponent
                    columns={columns}
                    data={sortByDate(dataTable)}
                    isLoading={isLoadingUsers}
                />
            </Box>

            <Modal onClose={closeEditModal} isOpen={isEditOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <Loading isLoading={isLoadingDetails}>
                        <ModalHeader>Edit user admin status</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box display="flex" flexDirection="column" gap={4}>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <input
                                        type="checkbox"
                                        checked={stateDetailsUser.isAdmin}
                                        onChange={handleOnchangeDetails}
                                        name="isAdmin"
                                    />
                                    <Text>Is Admin</Text>
                                </Box>
                            </Box>
                        </ModalBody>
                        <ModalFooter gap={4}>
                            <Loading isLoading={isLoadingUpdated}>
                                <Button colorScheme="red" onClick={updateUser}>
                                    Update
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

export default UserManagement
