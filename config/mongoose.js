const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codiel_development');
const db = mongoose.connection;

db.on('error', console.error.bind(console, " Error in connecting the MOngoDB"));

db.once('open', () => {
    console.log("Connected to the database :: MongoDb");
});

module.exports = db;