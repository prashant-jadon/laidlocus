const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({

    category:{
        type:String,
        require: true
    },
    postTask:{
        type:String,
        require: true
    },
    location:{
        type:String,
        require: false
    },
    workType:{
        type:String,
        require: true
    },
    basePrice:{
        type:String,
        require: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    finished:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = TaskCreate = mongoose.model('taskCreate',TaskSchema);
