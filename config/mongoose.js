const mongoose = require('mongoose');

// coneccting to database
mongoose.connect('mongodb://localhost/todo_list_db');

const db = mongoose.connection;

// error
db.on('error',(err)=>{
    console.log(err.message);
})
// running db
db.once('open',()=>{
    console.log("Successfully connected");
})