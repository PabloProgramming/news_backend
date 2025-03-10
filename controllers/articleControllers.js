const selectArticleById = require("../models/articleModels");

const getArticleById = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const article = await selectArticleById(article_id);
        res.status(200).send({ article })
    } catch (err) {
        console.log(err, "<<<<<<<")
        next(err)
    }
};

module.exports = getArticleById
