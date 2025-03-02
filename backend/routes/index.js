const ArticleRouter = require('./ArticleRouter')
const CategoryRouter = require('./CategoryRouter')
const UserRouter = require('./UserRouter')

const routes = (app) => {
    app.use('/api/article', ArticleRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/user', UserRouter)
}
module.exports = routes