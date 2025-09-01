const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I love dogs!");
    next();
});

const verifyPassword = ((req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    // res.send('Sorry you need a password!');
    throw new AppError('Password Required!', 401);
})

// app.use((req, res, next) => {
//     console.log('This is my first middleware!');
//     next();
//     console.log('This is my first middleware - after calling next!');
// })
// app.use((req, res, next) => {
//     console.log('This is my second middleware!');
//     next();
// })

app.get('/', (req, res) => {
    console.log(`Request date: ${req.requestTime}`);
    res.send('Hello World!');
});

app.get('/error', (req, res) => {
    chicken.fly();
});

app.get('/dogs', (req, res) => {
    console.log(`Request date: ${req.requestTime}`);
    res.send('Woof Woof!');
});

app.get('/secret', verifyPassword, (req, res) => {
    res.send("I don't have a secret!");
});

app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin!', 403);
});

app.use((req, res) => {
    res.status(404).send('Not Found!');
})

app.use((err, req, res, next) => {
    // console.log("***********************");
    // console.log('*********error*********');
    // console.log("***********************");
    // console.log(err);
    // next(err);
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
});


app.listen(3000, () => {
    console.log(`Example app listening on 3000`);
});
