const mongoose = require('mongoose')
const colors = require('colors');


const connectDB = async() => {

    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected ${mongoose.connection.host}`.bgCyan.black);
    }
    catch(error){
        console.log(`MongoDB Server Issue ${error}`.bgMagenta.blue);
    }
}

module.exports = connectDB;