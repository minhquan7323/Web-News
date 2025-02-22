const ArticleRouter = require('./ArticleRouter')
const CategoryRouter = require('./CategoryRouter')

const routes = (app) => {
    app.use('/api/article', ArticleRouter)
    app.use('/api/category', CategoryRouter)
}
module.exports = routes