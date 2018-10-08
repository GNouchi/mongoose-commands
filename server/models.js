const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://localhost/cruddash',
    {useNewUrlParser:true},
    (err)=> err?console.log(star,err):console.log("====> db running fine"),    
    )


var objSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required : true,
        minlength : 2 
    },
    description:
    {
        type:String,
        required:true,
        minlength:3
    }
},{timestamps:true})

module.exports = mongoose.model('Object', objSchema);