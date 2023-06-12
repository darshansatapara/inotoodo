const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
 
    title:{
        type: String,
        require:true
    },
    note:{
        type: String,
        require:true
    },
    tag:{
        type: String,
        default:"General"
    },
    date:{
        type: Date,
        require:Date.now
    },
});
module.exports= mongoose.model('note',noteSchema);