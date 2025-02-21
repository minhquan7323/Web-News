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

// const updateProduct = async (req, res) => {
//     try {
//         const productId = req.params.id
//         const data = req.body

//         if (!productId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The productID is required'
//             })
//         }
//         const response = await ProductService.updateProduct(productId, data)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const detailsProduct = async (req, res) => {
//     try {
//         const productId = req.params.id
//         if (!productId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The productID is required'
//             })
//         }
//         const response = await ProductService.detailsProduct(productId)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const deleteProduct = async (req, res) => {
//     try {
//         const productId = req.params.id

//         if (!productId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The productID is required'
//             })
//         }
//         const response = await ProductService.deleteProduct(productId)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

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

// const allProduct = async (req, res) => {
//     try {
//         const { limit, page, sort, filter, search } = req.query
//         const response = await ProductService.allProduct(limit, page, sort, filter, search)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

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
    // updateProduct,
    // detailsProduct,
    // deleteProduct,
    // allProduct,
    // deleteManyProducts,
    // getAllTypeProduct
}