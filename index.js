// SERVER
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import express from 'express';
import fs from 'node:fs/promises';

// Connection URL
const url = process.env.MONGO_CS;
const client = new MongoClient(url);

// Database Name
const dbName = 'Sokoban';

await client.connect();
console.log('Connected successfully to database');
const db = client.db(dbName);
const collection = db.collection('highscores');

// prepare levels array
const levels = [];

// read levels data from levels.txt file as string
const levelData = await fs.readFile('./assets/levels.txt', 'utf8');

// function to read and interpret level data
function readLevelsData() {
    // split the level data string (which contains the entire file) into the separate levels.
    const splitLevelData = levelData.split('\n\n');

    // iterate over the levels
    for (let singleLevelData of splitLevelData) {
        // prepare the level object
        const level = {
            level: [],
            player: {},
            boxes: [],
        };

        // split level into single lines
        const lines = singleLevelData.split('\n');
        // iterate over lines
        for (let y = 0; y < lines.length; y += 1) {
            // prepare line to save into level object later
            const line = [];
            // iterate over characters of the line
            for (let x = 0; x < lines[y].length; x += 1) {
                // get character
                const char = lines[y][x];

                // handle character
                switch (char) {
                    case '@': // player on floor
                        line.push('-');
                        level.player.x = x;
                        level.player.y = y;
                        break;
                    case '+': // player on target
                        line.push('.');
                        level.player.x = x;
                        level.player.y = y;
                        break;
                    case '$': // box on floor
                        line.push('-');
                        level.boxes.push({ x, y });
                        break;
                    case '*': // box on target
                        line.push('.');
                        level.boxes.push({ x, y });
                        break;
                    default: // other characters: # . - _
                        line.push(char);
                        break;
                }
            }
            // add prepared line to level object
            level.level.push(line);
        }
        // add level object to levels array
        levels.push(level);
    }
}

// call the function to read level data
readLevelsData();

// initialize express server
const app = express();

const port = 8080;

// let express read request bodies as json
app.use(express.json());

// REST API: GET /api/levels - returns count of levels
app.get('/api/levels', (req, res) => {
    res.send({ count: levels.length });
});

// REST API: GET /api/levels/:levelId - returns selected level
app.get('/api/levels/:levelId', (req, res) => {
    const levelId = req.params.levelId;
    res.send(levels[levelId]);
});

app.get('/api/scores/:levelId', async (req, res) => {
    const levelId = req.params.levelId;

    const scores = await collection.find({ levelId }).sort({ score: 1 }).limit(10).toArray();

    res.send(scores);
});

app.post('/api/scores/:levelId', async (req, res) => {
    const levelId = req.params.levelId;

    const score = {
        score: req.body.score,
        name: req.body.name,
        levelId,
    };

    const result = await collection.insertOne(score);

    const scores = await collection.find({ levelId }).sort({ score: 1 }).limit(10).toArray();

    res.status(201).send(scores);
});

// Static file hosting for public folder
app.use(express.static('public'));

// start the server
app.listen(port, () => {
    console.log(`Sokoban server listening on port ${port}`);
});
