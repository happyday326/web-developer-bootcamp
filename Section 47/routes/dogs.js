const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All dogs!');
});

router.post('/', (req, res) => {
    res.send('Create a dog!');
});

router.get('/:id', (req, res) => {
    res.send(`Get dog with ID: ${req.params.id}`);
});

router.get('/:id/edit', (req, res) => {
    res.send(`Edit dog with ID: ${req.params.id}`);
});

module.exports = router;
