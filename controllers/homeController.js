const todoListModel = require('../model/todoListSchema.js');

// function to give unique number for each task
increment = async()=>{
    try{
        // get data from database
        let dbdata = await todoListModel.find()
        // if there is no document in database, then it return 1 for first document which is being created.
        if(dbdata.length == 0){
           return 1;
        }
        // if there is document in database, then it return uniqueCode + 1 of last document which is in database
        return dbdata[dbdata.length-1].uniqueCode + 1;
    }catch(err){
        console.log(err);
    }
}

// function for home page
module.exports.home = (req,res)=>{
    todoListModel.find({},(err,todolists)=>{
        if(err){
            console.log("Error in fetching data from db");
            return
        }
        return res.render('home',{todo_list:todolists});
    })
}


// function to add new task
module.exports.addItem = async(req,res)=>{
    // get uniqueCode from increment() function
    let uniqueCode = await increment();
    // create and save a document
    todoListModel.create({
        uniqueCode : uniqueCode,
        description : req.body.description,
        category : req.body.category,
        dueDate : req.body.duedate
    },(err,newTask)=>{
        if(err){console.log(err); return}
        return res.redirect('back');
    })
}


// delete one or more tasks
module.exports.removeItems = async(req,res)=>{
        try{
            
            // condition to check,there is property card in body('card = undefined' when user click on delete button without tick to any task)
            if(req.body.card==undefined){
                return res.redirect('back');;
            }
            // get array of unique code,(array element is string type)
            const card = req.body.card;
            // loop to delete document one by one
            for( var i=0; i<card.length; i++){
                // convert array element which is string type into number 
                const code = parseInt(card[i]);
                
                // delete matched document
                await todoListModel.deleteOne({uniqueCode:code});
                // once all matched document deleted, then go back to home page
                if(i == card.length-1){
                    return res.redirect('back');
                }
            }
        }catch(err){
            console.log(err)
        }    
}