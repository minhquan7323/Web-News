const Article = require('../models/ArticleModel')
const Category = require('../models/CategoryModel')

const createArticle = (newArticle) => {
    return new Promise(async (resolve, reject) => {
        const { title, slug, content, imageUrl, author, source, categoryId } = newArticle
        try {
            const checkArticle = await Article.findOne({
                $or: [
                    { title: title },
                    { slug: slug }
                ]
            })
            if (checkArticle !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of Article is already'
                })
            }
            const newArticle = await Article.create({
                title, slug, content, imageUrl, author, source, categoryId
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

// const updateProduct = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkProduct = await Product.findOne({
//                 _id: id
//             })

//             if (checkProduct === null) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'The product is not defined'
//                 })
//             }

//             const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })

//             resolve({
//                 status: 'OK',
//                 message: 'Update product success',
//                 data: updateProduct
//             })
//         }
//         catch (e) {
//             reject(e)
//         }
//     })
// }

// const detailsProduct = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const product = await Product.findOne({ _id: id }).populate('type', 'name');

//             if (!product) {
//                 return resolve({
//                     status: 'ERR',
//                     message: 'The product is not defined'
//                 });
//             }

//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: product
//             });
//         } catch (e) {
//             reject(e);
//         }
//     });
// }

// const deleteProduct = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkProduct = await Product.findOne({ _id: id })

//             if (checkProduct === null) {
//                 return resolve({
//                     status: 'ERR',
//                     message: 'The product is not defined'
//                 })
//             }

//             await Product.findByIdAndDelete(id)

//             resolve({
//                 status: 'OK',
//                 message: 'Delete product success'
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

// const deleteManyProducts = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await Product.deleteMany({ _id: ids })

//             resolve({
//                 status: 'OK',
//                 message: 'Delete products success'
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

// const allProduct = (limit, page, sort, filter, search) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const query = {};
//             // Lọc theo search query
//             if (search) {
//                 query['name'] = { '$regex': search, '$options': 'i' };
//             }

//             // Lọc theo loại sản phẩm (type) và giá
//             if (filter && Array.isArray(filter)) {
//                 filter.forEach((f, index) => {
//                     if (index % 2 === 0) {
//                         if (f === 'type') {
//                             query['type'] = { '$in': filter[index + 1].split(',') };
//                         } else if (f === 'price') {
//                             const priceRange = filter[index + 1].split(',').map(Number);
//                             if (priceRange.length === 2) {
//                                 const [minPrice, maxPrice] = priceRange;
//                                 if (!isNaN(minPrice) && !isNaN(maxPrice)) {
//                                     query['price'] = { $gte: minPrice, $lte: maxPrice };
//                                 }
//                             }
//                         } else if (f === 'cover') {
//                             const covers = filter[index + 1].split(',');
//                             query['cover'] = { $in: covers };
//                         }
//                     }
//                 });
//             }

//             const totalProduct = await Product.countDocuments();
//             const totalProductFilter = await Product.countDocuments(query);

//             let productQuery = Product.find(query)
//                 .populate('type', 'name') // Lấy thông tin chi tiết của danh mục
//                 .limit(limit)
//                 .skip((page - 1) * limit);

//             // Sắp xếp theo yêu cầu
//             if (sort) {
//                 const objectSort = {};
//                 objectSort[sort[1]] = sort[0] === 'asc' ? 1 : -1;
//                 productQuery = productQuery.sort(objectSort);
//             }

//             // Lấy danh sách sản phẩm theo query
//             const allProduct = await productQuery;

//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: allProduct,
//                 totalProduct,
//                 totalProductFilter,
//                 currentPage: Number(page),
//                 totalPage: Math.ceil(totalProductFilter / limit),
//             });
//         } catch (e) {
//             reject(e);
//         }
//     });
// };


// const getAllTypeProduct = async () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const allCategories = await Category.find()
//             const allTypesInProducts = await Product.distinct('type')
//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: {
//                     categories: allCategories,
//                     types: allTypesInProducts,
//                 }
//             })
//         } catch (e) {
//             reject({
//                 status: 'ERROR',
//                 message: e.message || 'Failed to fetch data',
//             })
//         }
//     })
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