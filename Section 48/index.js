const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`View count: ${req.session.count}`);
});

app.get('/register', (req, res) => {
    const { username = 'anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/greet');
});

app.get('/greet', (req, res) => {
    const username = req.session.username;
    res.send(`Welcome back, ${username}!`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
