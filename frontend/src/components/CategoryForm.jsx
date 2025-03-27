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
        if (!editingCategory) return categories
        const getAllChildrenIds = (categoryId) => {
            const children = categories.filter(cat => cat.parentId === categoryId)
            return [categoryId, ...children.flatMap(child => getAllChildrenIds(child._id))]
        }
        const excludedIds = getAllChildrenIds(editingCategory._id)
        return categories.filter(cat => !excludedIds.includes(cat._id))
    }

    const isValid = formData.name.trim() !== ''

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
                                <FormLabel>Name</FormLabel>
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
                                >
                                    <option value="">Root</option>
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
                            {editingCategory ? 'Update' : 'Add'}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default CategoryForm 