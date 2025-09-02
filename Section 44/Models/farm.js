const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.log('MongoDB connection error:', err);
    });


const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Apple', price: 1.0, season: 'Fall' },
//     { name: 'Orange', price: 0.8, season: 'Winter' },
//     { name: 'Banana', price: 0.5, season: 'Summer' },
//     { name: 'Strawberry', price: 2.0, season: 'Spring' }
// ]);

// const makefarm = async () => {
//     const farm = new Farm({ name: 'Green Acres', city: 'Springfield' });
//     const apple = await Product.findOne({ name: 'Apple' });
//     farm.products.push(apple);
//     await farm.save();
//     console.log(farm);
// }

// makefarm();

// const addProduct = async () => {
//     const farm = await Farm.findOne({ name: 'Green Acres' });
//     const banana = await Product.findOne({ name: 'Banana' });
//     farm.products.push(banana);
//     await farm.save();
//     console.log(farm);
// }

// addProduct();

Farm.findOne({ name: 'Green Acres' })
    .populate('products')
    .then(farm => console.log(farm));
