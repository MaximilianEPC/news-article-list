const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.post('/logOpen', (req, res) => {
    console.log(`Article opened at url ${req.body.url}`);
    res.status(200).send();
})

app.listen(port, () => {
    console.log(`Server listening at port ${port}.`);
});