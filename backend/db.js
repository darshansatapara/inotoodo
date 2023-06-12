const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://darshansatapara286:darshansatapara286@cluster0.je5whrr.mongodb.net/inotoodo?retryWrites=true&w=majority"

const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI) 
    console.log('Mongo connected')
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;