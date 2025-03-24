import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select, VStack, useDisclosure, } from '@chakra-ui/react'

const CategoryForm = ({ open, onClose, onSubmit, formData, setFormData, editingCategory, categories }) => {
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
        if (!editingCategory) {
            // khi thêm mới, cho phép chọn tất cả categories làm parent
            return categories
        }
        // khi edit, loại bỏ category hiện tại và các category con của nó
        const getAllChildrenIds = (categoryId) => {
            const children = categories.filter(cat => cat.parentId === categoryId)
            return [categoryId, ...children.flatMap(child => getAllChildrenIds(child._id))]
        }
        const excludedIds = getAllChildrenIds(editingCategory._id)
        return categories.filter(cat => !excludedIds.includes(cat._id))
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={onSubmit}>
                    <ModalHeader>
                        {editingCategory ? 'Edit Category' : 'Add New Category'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Category Name</FormLabel>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter category name"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Parent Category</FormLabel>
                                <Select
                                    name="parentId"
                                    value={formData.parentId}
                                    onChange={handleChange}
                                    placeholder="Select parent category"
                                >
                                    <option value="">No parent</option>
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
                        <Button colorScheme="blue" type="submit">
                            {editingCategory ? 'Update' : 'Add new'}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default CategoryForm 