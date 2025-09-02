const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.log('MongoDB connection error:', err);
    });

const userSchema = new Schema({
    username: String,
    age: Number
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweet = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 30 });
//     const user = await User.findOne({ username: 'chickenfan99' });
//     const tweet2 = new Tweet({
//         text: 'This is a tweet from chickenfan99',
//         likes: 99,
//     });
//     tweet2.user = user;
//     tweet2.save();
// }

// makeTweet();

const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user');
    console.log(t);
}

findTweet();