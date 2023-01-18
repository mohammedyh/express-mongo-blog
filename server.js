const mongoose = require('mongoose');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
require('dotenv').config();

const Article = require('./models/article');
const articleRouter = require('./routes/articles');

mongoose.connect(process.env.MONGO_CONNECTION, { dbName: 'posts' });
mongoose.connection.on('error', err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.get('/', async function (_req, res) {
	const articles = await Article.find().exec();
	res.render('articles/index', { articles });
});

app.use('/articles', articleRouter);

app.use('*', function (_req, res) {
	res.render('404');
});

app.listen(5000, () => console.log('server listening on port 5000'));
