
// requires elements
const express = require('express');
const path = require('path');
// port at where server is listing
const port = 8000;

//mongo database connection
const db = require('./config/mongoose.js');
const todoListModel = require('./model/todoListSchema.js');

// express app
const app = express();

// set template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// serving static files
app.use(express.static('public'));

// middleware
app.use(express.urlencoded());

// routing
app.use('/',require('./routes/home.js'));





// server listening
app.listen(port,(err)=>{
    if (err){
        console.log(err);
        return;
    }
    console.log(`Server listening at http://localhost:${port}`);
});