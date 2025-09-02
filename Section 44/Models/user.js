const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.log('MongoDB connection error:', err);
    });


const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            _id: { _id: false },
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: "Harry",
        last: "Potter"
    });
    u.address.push({
        street: "4 Privet Drive",
        city: "Little Whinging",
        state: "Surrey",
        country: "UK"
    });
    const res = await u.save();
    console.log(res);
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.address.push({
        street: "99 3rd St",
        city: "NYC",
        state: "NY",
        country: "USA"
    });
    const res = await user.save();
    console.log(res);
}

addAddress("68b63264acbce602b9d67439");

// makeUser();
