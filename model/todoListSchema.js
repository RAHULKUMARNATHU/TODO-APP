const mongoose = require('mongoose');

// schema
const todoListSchema = mongoose.Schema({
    uniqueCode : {type:Number , require:true},
    description : {type:String, require:true},
    category : {type:String, require:true},
    dueDate : {type:Date, require:true}
})
//model
const todoListModel = mongoose.model('todo_list_collections',todoListSchema);

module.exports = todoListModel;