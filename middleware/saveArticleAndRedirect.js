function saveArticleAndRedirect(view) {
	return async (req, res) => {
		let article = req.article;
		article.title = req.body.title;
		article.description = req.body.description;
		article.markdown = req.body.markdown;
		try {
			article = await article.save();
			res.redirect(`/articles/${article.slug}`);
		} catch (err) {
			res.render(`articles/${view}`, { article, errors: err.message });
		}
	};
}

module.exports = saveArticleAndRedirect;
