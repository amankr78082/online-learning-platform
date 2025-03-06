const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/progress', (req, res) => {
    fs.readFile('./data/progress.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/progress', (req, res) => {
    const progress = req.body;
    fs.writeFile('./data/progress.json', JSON.stringify(progress), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Progress saved');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
