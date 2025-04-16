import React, { useState } from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, useDisclosure, Box, Text, HStack } from '@chakra-ui/react'
import { DownloadOutlined } from '@ant-design/icons'
import * as XLSX from 'xlsx'

const ExportExcelButton = ({ data, columns, defaultFileName = "export" }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [fileName, setFileName] = useState(defaultFileName)

    const handleExport = () => {
        if (!data || !columns) return

        const formattedData = data.map(item => {
            const row = {}
            columns.forEach(col => {
                row[col.label] = typeof col.value === 'function'
                    ? col.value(item)
                    : item[col.value]
            })
            return row
        })

        const worksheet = XLSX.utils.json_to_sheet(formattedData)

        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        const finalFileName = fileName.trim() !== "" ? `${fileName}.xlsx` : "export.xlsx"
        XLSX.writeFile(workbook, finalFileName)

        onClose()
    }

    return (
        <>
            <Button colorScheme="teal" onClick={onOpen} leftIcon={<DownloadOutlined />}>
                Xuất Excel
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Nhập tên file Excel</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Tên file..."
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleExport}>
                            Xuất
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Huỷ</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ExportExcelButton