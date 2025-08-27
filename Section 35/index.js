const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

let comments = [
    {
        id: uuid(),
        username: 'Linda',
        comment: 'I love tacos!'
    },
    {
        id: uuid(),
        username: 'John',
        comment: 'Tacos are the best!'
    },
    {
        id: uuid(),
        username: 'Sarah',
        comment: 'I could eat tacos every day!'
    },
    {
        id: uuid(),
        username: 'Mike',
        comment: 'I like my tacos with extra guac!'
    }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    console.log(foundComment);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.get('/tacos', (req, res) => {
    res.send('GET: Here are your tacos!');
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`POST: Here are your ${qty} ${meat} tacos!`);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});