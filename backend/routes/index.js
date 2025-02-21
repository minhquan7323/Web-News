const ArticleRouter = require('./ArticleRouter')

const routes = (app) => {
    app.use('/api/article', ArticleRouter)
}
module.exports = routes