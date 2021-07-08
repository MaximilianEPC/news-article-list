const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dateFormat = require('dateformat');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017/newsLogs', { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to database.')
        const db = client.db('newsLogs');
        
        app.post('/logOpen', (req, res) => {
            const dateTime = new Date()
            const logMessage = `[${dateFormat(dateTime, 'yyyy-mm-dd HH:MM:ss')}] ${req.body.source} article '${req.body.title}' at ${req.body.url} opened.`;
            if(!fs.existsSync('logs')) {
                fs.mkdirSync('logs');
            }
            fs.writeFile(`logs/${dateFormat(new Date(), 'yyyymmdd')}_log.log`, `${logMessage}\n`, { flag: 'a' }, err => {});
            console.log(logMessage);
            db.collection('opens').insertOne({
                dateTime: dateTime.toString(),
                ...req.body,
            })
            res.status(204).send();
        })

        app.post('/logSearch', (req, res) => {
            const dateTime = new Date()
            const logMessage = `[${dateFormat(dateTime, 'yyyy-mm-dd HH:MM:ss')}] '${req.body.query}' was searched.`;
            if(!fs.existsSync('logs')) {
                fs.mkdirSync('logs');
            }
            fs.writeFile(`logs/${dateFormat(new Date(), 'yyyymmdd')}_log.log`, `${logMessage}\n`, { flag: 'a' }, err => {});
            console.log(logMessage);
            db.collection('searches').insertOne({
                dateTime: dateTime.toString(),
                ...req.body,
            })
            res.status(204).send();
        })

    })
    .catch(error => console.error(error));

app.listen(port, () => {
    console.log(`Server listening at port ${port}.`);
});