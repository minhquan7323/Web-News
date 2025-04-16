import React, { useEffect, useState } from 'react'
import { Box, Button, VStack, Card, CardBody, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'
import * as CategoryService from '../../services/CategoryService'
import CategoryItem from '../../components/CategoryItem'
import CategoryForm from '../../components/CategoryForm'
import { useMessage } from '../../components/Message/Message'

const CategoryManagement = () => {
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        parentId: '',
    })
    const [deleteCategoryId, setDeleteCategoryId] = useState(null)
    const { success, error } = useMessage()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    useEffect(() => {
        fetchAllCategory()
    }, [])

    const fetchAllCategory = async () => {
        const res = await CategoryService.getAllCategory()
        setCategories(res.data)
    }

    const handleOpen = (category = null) => {
        if (category) {
            setEditingCategory(category)
            setFormData({
                name: category.name,
                parentId: category.parentId || '',
            })
        } else {
            setEditingCategory(null)
            setFormData({
                name: '',
                parentId: '',
            })
        }
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setEditingCategory(null)
        setFormData({
            name: '',
            parentId: '',
        })
    }

    const isChildCategory = (categoryId, parentId) => {
        if (!parentId) return false
        const category = categories.find(cat => cat._id === parentId)
        if (!category) return false
        if (category._id === categoryId) return true
        if (category.parentId) {
            return isChildCategory(categoryId, category.parentId)
        }
        return false
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let response
            if (editingCategory) {
                response = await CategoryService.updateCategory(editingCategory._id, formData)
            } else {
                response = await CategoryService.createCategory(formData)
            }

            if (response?.data.status === 'OK') {
                success(editingCategory ? 'Cập nhật danh mục thành công!' : 'Thêm danh mục thành công')
                fetchAllCategory()
                handleClose()
            } else {
                error(response?.data.message || 'Tên danh mục đã tồn tại')
            }
        } catch (error) {
            error(response?.data.message || 'Không thể thêm hoặc cập nhật danh mục')
        }
    }

    const handleDeleteClick = (id) => {
        setDeleteCategoryId(id)
        onDeleteOpen()
    }

    const hasChildCategories = (categoryId) => {
        return categories.some(category => category.parentId === categoryId)
    }

    const handleDelete = async () => {
        if (hasChildCategories(deleteCategoryId)) {
            error('Danh mục này có danh mục con, không thể xóa!');
            onDeleteClose();
            return;
        }

        try {
            await CategoryService.deleteCategory(deleteCategoryId)
            success('Xóa danh mục thành công')
            fetchAllCategory()
            onDeleteClose()
            setDeleteCategoryId(null)
        } catch (e) {
            error('Không xóa được danh mục')
        }
    }


    return (
        <Box>
            <VStack spacing={6} align="stretch">
                <Box>
                    <Button colorScheme='blue' onClick={() => handleOpen()}>
                        <i className="fa-solid fa-plus"></i>
                        <Text as="span" paddingLeft={4}>Danh mục</Text>
                    </Button>
                </Box>

                <Card>
                    <CardBody>
                        <VStack spacing={4} align="stretch">
                            {categories
                                .filter(category => !category.parentId)
                                .map(category => (
                                    <CategoryItem
                                        key={category._id}
                                        category={category}
                                        onEdit={handleOpen}
                                        onDelete={handleDeleteClick}
                                        categories={categories}
                                    />
                                ))}
                        </VStack>
                    </CardBody>
                </Card>

                <CategoryForm
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    editingCategory={editingCategory}
                    categories={categories}
                />

                <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Xóa danh mục</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Bạn có chắc chắn muốn xóa danh mục này không? Hành động này không thể hoàn tác.
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={onDeleteClose}>
                                Hủy
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete}>
                                Xóa
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </VStack>
        </Box>
    )
}

export default CategoryManagement 