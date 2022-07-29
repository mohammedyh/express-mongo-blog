const express = require('express');
const saveArticleAndRedirect = require('../middleware/saveArticleAndRedirect');
const Article = require('../models/article');
const router = express.Router();

// Create
router.get('/new', function (_req, res) {
	res.render('articles/new', { article: new Article() });
});

// Store
router.post(
	'/',
	async function (req, res, next) {
		req.article = new Article({
			title: req.body.title,
			description: req.body.description,
			markdown: req.body.markdown,
		});
		next();
	},
	saveArticleAndRedirect('new'),
);

// Show
router.get('/:slug', async function (req, res) {
	try {
		const article = await Article.findOne({ slug: req.params.slug }).exec();
		res.render('articles/show', { article });
	} catch (err) {
		res.render('404');
	}
});

// Edit
router.get('/edit/:slug', async function (req, res) {
	try {
		const article = await Article.findOne({ slug: req.params.slug }).exec();
		res.render('articles/edit', { article });
	} catch (err) {
		res.render('404');
	}
});

// Update
router.put(
	'/:id',
	async function (req, res, next) {
		req.article = await Article.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			description: req.body.description,
			markdown: req.body.markdown,
		});
		next();
	},
	saveArticleAndRedirect('edit'),
);

// Delete
router.delete('/delete/:id', async function (req, res) {
	await Article.findByIdAndDelete(req.params.id);
	res.redirect('/');
});

module.exports = router;
