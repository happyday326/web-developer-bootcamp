const express = require('express');
const app = express();
// console.dir(app);

// app.use((req, res) => {
//     console.log('We got a new request!');
//     res.send({ color: "red" });
// });

app.get('/', (req, res) => {
    res.send("This is the homepage!!!");
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`This is a subreddit: ${subreddit}`);
});

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`This is a subreddit: ${subreddit}, and this is a postID: ${postId}`);
});

app.get('/cats', (req, res) => {
    res.send("Meow!");
});

app.post('/cats', (req, res) => {
    res.send("Post request to cats received!");
});

app.get('/dogs', (req, res) => {
    res.send("Woof!");
});

app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.send("Nothing found if nothing searched!");
    }
    res.send(`Search results for: ${q}`);
});

// app.get(/(.*)/, (req, res) => {
//     res.send("I don't know that!");
// });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});