const ArticleService = require('../services/ArticleService')

const createArticle = async (req, res) => {
    try {
        const { title, slug, content, imageUrl, author, source, categoryId } = req.body

        if (!title || !slug || !content || !imageUrl || !author) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require'
            })
        }

        const response = await ArticleService.createArticle(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id
        const data = req.body

        if (!articleId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The articleID is required'
            })
        }
        const response = await ArticleService.updateArticle(articleId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const detailsArticle = async (req, res) => {
    try {
        const articleId = req.params.id
        if (!articleId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The articleID is required'
            })
        }
        const response = await ArticleService.detailsArticle(articleId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id

        if (!articleId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The articleID is required'
            })
        }
        const response = await ArticleService.deleteArticle(articleId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// const deleteManyProducts = async (req, res) => {
//     try {
//         const ids = req.body.ids

//         if (!ids) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The ids is required'
//             })
//         }
//         const response = await ProductService.deleteManyProducts(ids)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

const allArticle = async (req, res) => {
    try {
        const { limit, page, sort, filter, search } = req.query
        const response = await ArticleService.allArticle(limit, page, sort, filter, search)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// const getAllTypeProduct = async (req, res) => {
//     try {
//         const response = await ProductService.getAllTypeProduct()
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }
module.exports = {
    createArticle,
    updateArticle,
    detailsArticle,
    deleteArticle,
    allArticle,
    // deleteManyProducts,
    // getAllTypeProduct
}