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
                        <Button colorScheme="red" onClick={onOpen} >Xóa tất cả?</Button>
                    )}
                </Box>
                <Table
                    display='block'
                    width='100%'
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
                    scroll={{
                        x: 'max-content',
                    }}
                    onChange={handleTableChange}
                    {...props}
                />
            </Loading>

            <Modal Modal onClose={onClose} isOpen={isOpen} isCentered >
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
                        <Button colorScheme="red" onClick={handleDeleteAll}>Xóa</Button>
                        <Button onClick={onClose}>Đóng</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TableComponent