import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select, VStack, useDisclosure, } from '@chakra-ui/react'

const CategoryForm = ({ open, onClose, onSubmit, formData, setFormData, editingCategory, categories, canBeParent }) => {
    const { isOpen, onClose: handleClose } = useDisclosure({
        isOpen: open,
        onClose: onClose,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const getAvailableParentCategories = () => {
        const getAllChildrenIds = (categoryId) => {
            const children = categories.filter(cat => cat.parentId === categoryId)
            return [categoryId, ...children.flatMap(child => getAllChildrenIds(child._id))]
        }
        const excludedIds = editingCategory ? getAllChildrenIds(editingCategory._id) : []
        return categories.filter(cat => !cat.parentId && !excludedIds.includes(cat._id))
    }

    const isValid = formData.name.trim() !== ''

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={onSubmit}>
                    <ModalHeader>
                        {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Tên danh mục</FormLabel>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nhập tên danh mục"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Danh mục cha</FormLabel>
                                <Select
                                    name="parentId"
                                    value={formData.parentId}
                                    onChange={handleChange}
                                >
                                    <option value="">Gốc</option>
                                    {getAvailableParentCategories().map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={onSubmit} isDisabled={!isValid}>
                            {editingCategory ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default CategoryForm 