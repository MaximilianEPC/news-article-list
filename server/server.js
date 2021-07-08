const express = require('express');
const cors = require('cors');
const fs = require('fs');
const dateFormat = require('dateformat');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.post('/logOpen', (req, res) => {
    const logMessage = `[${dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')}] ${req.body.source} article '${req.body.title}' at ${req.body.url} opened.`;
    if(!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
    }
    fs.writeFile(`logs/${dateFormat(new Date(), 'yyyymmdd')}_log.log`, `${logMessage}\n`, { flag: 'a' }, err => {});
    console.log(logMessage);
    res.status(200).send();
})

app.listen(port, () => {
    console.log(`Server listening at port ${port}.`);
});