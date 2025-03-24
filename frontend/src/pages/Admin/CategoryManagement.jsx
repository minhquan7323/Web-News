import React, { useEffect, useState } from 'react'
import { Box, Button, VStack, Card, CardBody, Text } from '@chakra-ui/react'
import * as CategoryService from '../../services/CategoryService'
import CategoryItem from '../../components/CategoryItem'
import CategoryForm from '../../components/CategoryForm'
import { useMessage } from '../../components/Message/Message'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useQuery } from '@tanstack/react-query'

const CategoryManagement = () => {
    const [open, setOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        parentId: '',
    })
    const { success, error } = useMessage()

    const fetchAllCategory = async () => {
        const res = await CategoryService.getAllCategory()
        return res.data
    }

    const queryCategory = useQuery({
        queryKey: ['categories'],
        queryFn: fetchAllCategory,
        retry: 2,
        retryDelay: 1000
    })
    const { isLoading: isLoadingCategories, data: categories = [] } = queryCategory

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

    const mutation = useMutationHooks(async (data) => {
        const res = await CategoryService.createCategory(data)
        return res
    })
    const mutationUpdate = useMutationHooks(async (data) => {
        const { id, ...rests } = data
        const res = await CategoryService.updateCategory(id, rests)
        return res
    })
    const mutationDelete = useMutationHooks(async (id) => {
        const res = await CategoryService.deleteCategory(id)
        return res
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingCategory) {
                mutationUpdate.mutate({ id: editingCategory._id, ...formData }, {
                    onSettled: () => {
                        success('Category updated successfully!')
                        handleClose()
                    }
                })
            } else {
                mutation.mutate(formData, {
                    onSettled: () => {
                        success('Category added successfully')
                        handleClose()
                    }
                })
            }
        } catch (e) {
            error('Failed to save category')
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                mutationDelete.mutate(id, {
                    onSettled: () => {
                        success('Category deleted successfully')
                    }
                })
            } catch (e) {
                error('Failed to delete category')
            }
        }
    }

    useEffect(() => {
        return () => {
            queryCategory.refetch()
        }
    }, [handleSubmit, handleDelete])

    return (
        <Box>
            <VStack spacing={6} align="stretch">
                <Box>
                    <Button colorScheme='blue' onClick={() => handleOpen()}>
                        <i className="fa-solid fa-plus"></i>
                        <Text as="span" paddingLeft={4}>Category</Text>
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
                                        onDelete={handleDelete}
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
            </VStack>
        </Box>
    )
}

export default CategoryManagement 