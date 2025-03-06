const ArticleRouter = require('./ArticleRouter')
const CategoryRouter = require('./CategoryRouter')
const UserRouter = require('./UserRouter')
const CommentRouter = require('./CommentRouter')

const routes = (app) => {
    app.use('/api/article', ArticleRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/user', UserRouter)
    app.use('/api/comments', CommentRouter)
}
module.exports = routes