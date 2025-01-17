const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        const db = client.db('your_database_name'); 
        const collection = db.collection('queries');

        app.use(express.json());

        app.post('/api/submit', async (req, res) => {
            try {
                const query = req.body.query;
                await collection.insertOne({ query: query, timestamp: new Date() });
                res.json({ success: true });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ success: false });
            }
        });

        app.listen(3000, () => {
            console.log('Server listening on port 3000');
        });
    })
    .catch(err => console.error(err));