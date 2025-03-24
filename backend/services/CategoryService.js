const Category = require('../models/CategoryModel')

const createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const { name, parentId } = newCategory
        try {
            const checkCategory = await Category.findOne({
                name: name
            })
            if (checkCategory !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of category is already'
                })
            }

            if (parentId) {
                const parentCategory = await Category.findById(parentId)
                if (!parentCategory) {
                    resolve({
                        status: 'ERR',
                        message: 'Parent category not found'
                    })
                }
            }

            const createdCategory = await Category.create({
                name,
                parentId: parentId || null
            })

            if (createdCategory) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdCategory
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id
            })

            if (checkCategory === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Category is not defined'
                })
                return
            }

            const checkNameCategory = await Category.findOne({
                name: data.name,
                _id: { $ne: id }
            })

            if (checkNameCategory !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Category name already exists'
                })
                return
            }

            if (data.parentId) {
                if (data.parentId === id) {
                    resolve({
                        status: 'ERR',
                        message: 'Category cannot be its own parent'
                    })
                    return
                }

                const parentCategory = await Category.findById(data.parentId)
                if (!parentCategory) {
                    resolve({
                        status: 'ERR',
                        message: 'Parent category not found'
                    })
                    return
                }
            }

            const updateData = {
                ...data,
                parentId: data.parentId || null
            }

            const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true })

            resolve({
                status: 'OK',
                message: 'Update category success',
                data: updatedCategory
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

const getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCategory = await Category.find().sort({ createdAt: -1 })
            resolve({
                status: 'OK',
                message: 'Success',
                data: allCategory
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findOne({ _id: id })

            if (category === null) {
                return resolve({
                    status: 'OK',
                    message: 'The category is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: category
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findById(id)
            if (!category) {
                resolve({
                    status: 'ERR',
                    message: 'Category not found'
                })
                return
            }

            const hasChildren = await Category.exists({ parentId: id })
            if (hasChildren) {
                resolve({
                    status: 'ERR',
                    message: 'Cannot delete category with subcategories'
                })
                return
            }

            await Category.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete category success'
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createCategory,
    updateCategory,
    getAllCategory,
    getDetailsCategory,
    deleteCategory
}