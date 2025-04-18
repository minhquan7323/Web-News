const Article = require('../models/ArticleModel')
const Category = require('../models/CategoryModel')
const Comment = require('../models/CommentModel')
const mongoose = require('mongoose')

const createArticle = (newArticle) => {
    return new Promise(async (resolve, reject) => {
        const { title, content, description, imageUrl, author, source, type, featured, hide, commentCount } = newArticle
        try {
            const checkArticle = await Article.findOne({ title: title })
            if (checkArticle !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of Article is already'
                })
            }
            const newArticle = await Article.create({
                title, content, description, imageUrl, author, source, type, featured, hide, commentCount
            })
            if (newArticle) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newArticle
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

const updateArticle = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkArticle = await Article.findOne({
                _id: id
            })

            if (checkArticle === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Article is not defined'
                })
            }

            const updateArticle = await Article.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'Update Article success',
                data: updateArticle
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

const detailsArticle = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const article = await Article.findOne({ _id: id }).populate('type', 'name')

            if (!article) {
                return resolve({
                    status: 'ERR',
                    message: 'The article is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: article
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteArticle = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkArticle = await Article.findOne({ _id: id })

            if (checkArticle === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The Article is not defined'
                })
            }

            await Article.findByIdAndDelete(id)

            await Comment.deleteMany({ articleId: id })

            resolve({
                status: 'OK',
                message: 'Delete Article and related comments success'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyArticles = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Article.deleteMany({ _id: ids })

            await Comment.deleteMany({ articleId: { $in: ids } })

            resolve({
                status: 'OK',
                message: 'Delete articles and related comments success'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const allArticle = (limit, page, sort, filter, search) => {

    return new Promise(async (resolve, reject) => {
        try {
            const query = {}
            if (search) {
                query['$or'] = [
                    { 'title': { '$regex': search, '$options': 'i' } },
                    { 'content': { '$regex': search, '$options': 'i' } },
                    { 'description': { '$regex': search, '$options': 'i' } }
                ]
            }

            if (filter && Array.isArray(filter)) {
                filter.forEach((f, index) => {
                    if (index % 2 === 0) {
                        if (f === 'type') {
                            query['type'] = { '$in': filter[index + 1].split(',') }
                        }
                    }
                })
            }

            const totalArticle = await Article.countDocuments()
            const totalArticleFilter = await Article.countDocuments(query)

            let articleQuery = Article.find(query)
                .populate('type', 'name')
                .limit(limit)
                .skip((page - 1) * limit)

            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0] === 'asc' ? 1 : -1
                articleQuery = articleQuery.sort(objectSort)
            }

            const allArticle = await articleQuery

            resolve({
                status: 'OK',
                message: 'Success',
                data: allArticle,
                totalArticle,
                totalArticleFilter,
                currentPage: Number(page),
                totalPage: Math.ceil(totalArticleFilter / limit),
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllTypeArticle = async () => {
    try {
        const allCategories = await Category.find()
        const allTypesInArticles = await Article.distinct('type', { hide: false })

        const categoryMap = new Map()
        allCategories.forEach(cat => categoryMap.set(cat._id.toString(), cat))

        const findRootCategory = (catId) => {
            let current = categoryMap.get(catId)
            while (current && current.parentId) {
                current = categoryMap.get(current.parentId.toString())
            }
            return current
        }

        const rootCategoriesMap = new Map()

        allTypesInArticles.forEach(typeId => {
            const rootCat = findRootCategory(typeId.toString())
            if (rootCat) {
                rootCategoriesMap.set(rootCat._id.toString(), rootCat)
            }
        })

        const rootCategories = Array.from(rootCategoriesMap.values())

        return {
            status: 'OK',
            message: 'Success',
            data: {
                categories: rootCategories,
                types: allTypesInArticles,
            }
        }
    } catch (e) {
        return {
            status: 'ERROR',
            message: e.message,
        }
    }
}

const getFeaturedArticles = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const articles = await Article.find({ featured: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: articles
            })
        } catch (e) {
            reject({
                status: 'ERROR',
                message: e.message,
            })
        }
    })
}

const getArticleByType = (typeId) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!typeId) {
                return resolve({
                    status: 'ERR',
                    message: 'Type ID is required'
                })
            }

            const articles = await Article.find({ type: typeId }).populate('type', 'name')

            resolve({
                status: 'OK',
                message: 'Success',
                data: articles,
                total: articles.length
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createArticle,
    updateArticle,
    detailsArticle,
    deleteArticle,
    allArticle,
    deleteManyArticles,
    getAllTypeArticle,
    getFeaturedArticles,
    getArticleByType
}