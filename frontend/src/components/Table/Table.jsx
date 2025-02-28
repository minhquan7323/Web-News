import { Table } from "antd"
import React, { useState } from "react"
import Loading from '../Loading/Loading'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isLoading = false, columns = [], deleteMany, multiChoice = false } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
    }

    const handleDeleteAll = async () => {
        await deleteMany(rowSelectedKeys)
        setRowSelectedKeys([])
        onClose()
    }

    const handleTableChange = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <Loading isLoading={isLoading}>
                <Box py={4}>
                    {multiChoice && rowSelectedKeys.length > 0 && (
                        <Button colorScheme="red" onClick={onOpen} >Delete all?</Button>
                    )}
                </Box>
                <Table
                    bordered
                    rowSelection={multiChoice && {
                        type: selectionType,
                        ...rowSelection
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        position: ['bottomCenter'],
                    }}
                    onChange={handleTableChange}
                    {...props}
                />
            </Loading>

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
                        <Button colorScheme="red" onClick={handleDeleteAll}>Delete</Button>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TableComponent