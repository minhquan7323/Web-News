const Category = require('../models/CategoryModel')

const createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const { name } = newCategory
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
            const newCategory = await Category.create({
                name
            })
            if (newCategory) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newCategory
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
            }

            const updateCategory = await Category.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'Update category success',
                data: updateCategory
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
            const allCategory = await Category.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allCategory
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getDetailsCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findOne({ _id: id });

            if (category === null) {
                return resolve({
                    status: 'OK',
                    message: 'The category is not defined'
                });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: category
            });
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    createCategory,
    updateCategory,
    getAllCategory,
    getDetailsCategory
}