const express = require('express');
const app = express();
const port = 8000;

// use express Router
app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        // console.log('Error : ', err); There's a another way to console.log
        console.log(`Error : ${err}`);
    } 
    console.log(`Server is running on port  : ${port}`);
});