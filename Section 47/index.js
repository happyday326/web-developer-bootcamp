const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// const shelterRoutes = require('./routes/shelter');
// const dogRoutes = require('./routes/dogs');
// const adminRoutes = require('./routes/admin');

// app.use((req, res, next) => {
//     if (req.query.isAdmin) {
//         next();
//     }
//     res.send('You are not an admin!');
// });

// app.use('/shelters', shelterRoutes);
// app.use('/dogs', dogRoutes);
// app.use('/admin', adminRoutes);

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
    const { name = 'no name' } = req.cookies;
    res.send(`Welcome to the Greet Page, ${name}!`);
});

app.get('/setname', (req, res) => {
    res.cookie('name', 'Jolibee');
    res.send('Cookie has been set!');
});

app.get('/signedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('Signed cookie has been set!');
});

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});