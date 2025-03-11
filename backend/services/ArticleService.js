const Article = require('../models/ArticleModel')
const Category = require('../models/CategoryModel')

const createArticle = (newArticle) => {
    return new Promise(async (resolve, reject) => {
        const { title, content, description, imageUrl, author, source, type, featured } = newArticle
        try {
            const checkArticle = await Article.findOne({ title: title })
            if (checkArticle !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of Article is already'
                })
            }
            const newArticle = await Article.create({
                title, content, description, imageUrl, author, source, type, featured
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
            const article = await Article.findOne({ _id: id }).populate('type', 'name');

            if (!article) {
                return resolve({
                    status: 'ERR',
                    message: 'The article is not defined'
                });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: article
            });
        } catch (e) {
            reject(e);
        }
    });
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

            resolve({
                status: 'OK',
                message: 'Delete Article success'
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

            resolve({
                status: 'OK',
                message: 'Delete articles success'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const allArticle = (limit, page, sort, filter, search) => {

    return new Promise(async (resolve, reject) => {
        try {
            const query = {};
            if (search) {
                query['title'] = { '$regex': search, '$options': 'i' };
            }

            if (filter && Array.isArray(filter)) {
                filter.forEach((f, index) => {
                    if (index % 2 === 0) {
                        if (f === 'type') {
                            query['type'] = { '$in': filter[index + 1].split(',') };
                        }
                    }
                });
            }

            const totalArticle = await Article.countDocuments();
            const totalArticleFilter = await Article.countDocuments(query);

            let articleQuery = Article.find(query)
                .populate('type', 'name')
                .limit(limit)
                .skip((page - 1) * limit);

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0] === 'asc' ? 1 : -1;
                articleQuery = articleQuery.sort(objectSort);
            }

            const allArticle = await articleQuery;

            resolve({
                status: 'OK',
                message: 'Success',
                data: allArticle,
                totalArticle,
                totalArticleFilter,
                currentPage: Number(page),
                totalPage: Math.ceil(totalArticleFilter / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getAllTypeArticle = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCategories = await Category.find()
            const allTypesInArticles = await Article.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: {
                    categories: allCategories,
                    types: allTypesInArticles,
                }
            })
        } catch (e) {
            reject({
                status: 'ERROR',
                message: e.message,
            })
        }
    })
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

module.exports = {
    createArticle,
    updateArticle,
    detailsArticle,
    deleteArticle,
    allArticle,
    deleteManyArticles,
    getAllTypeArticle,
    getFeaturedArticles
}