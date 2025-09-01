const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError');

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log('Connected to MongoDB!')
    })
    .catch(err => {
        console.log('Could not connect to MongoDB...')
        console.log(err)
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res, next) => {
    try {
        const category = req.query.category;
        if (category) {
            const products = await Product.find({ category: category });
            res.render('products/index', { products, category });
        } else {
            const products = await Product.find({});
            res.render('products/index', { products, category: 'ALL' });
        }
    } catch (e) {
        next(e);
    }
});

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError('Product Not Found', 404));
    }
    res.render('products/show', { product });
}));

app.post('/products', wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
}));

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError('Product Not Found', 404));
    }
    res.render('products/edit', { product, categories });
}));

app.put('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    if (!product) {
        return next(new AppError('Product Not Found', 404));
    }
}));

app.put('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    if (!product) {
        return next(new AppError('Product Not Found', 404));
    }
    res.redirect(`/products/${product._id}`);
}));

app.delete('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
}));

const handleValidationError = err => {
    console.dir(err);
    return new AppError(`Validation Failed...${err.message}`, 400);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationError(err);
    next(err);
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});

