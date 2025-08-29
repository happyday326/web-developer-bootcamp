const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log('Connected to MongoDB!')
    })
    .catch(err => {
        console.log('Could not connect to MongoDB...', err)
    });


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: [0, 'Price must be positive!'],
    },
})

const Product = mongoose.model('Product', productSchema)

const bike = new Product({
    name: 'Mountain Bike',
    price: 599,
    color: 'red'
})
bike.save()
    .then(data => {
        console.log('It worked!')
        console.log(data)
    })
    .catch(err => {
        console.error('Error saving product:', err)
    })