const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log('Connected to MongoDB!')
    })
    .catch(err => {
        console.log('Could not connect to MongoDB...')
        console.log(err)
    });

// const p = new Product({
//     name: 'Rupy Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// });

// p.save()
//     .then(() => {
//         console.log(p)
//     })
//     .catch(err => {
//         console.log(err)
//     });


Product.insertMany([
    {
        name: 'Navel Orange',
        price: 2.49,
        category: 'fruit'
    },
    {
        name: 'Lettuce',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Cheddar Cheese',
        price: 3.99,
        category: 'dairy'
    },
    {
        name: 'Banana',
        price: 0.99,
        category: 'fruit'
    }
])
    .then((res) => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    });