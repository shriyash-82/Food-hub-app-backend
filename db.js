const mongoose = require('mongoose')
// MONGO_URL = "mongodb+srv://shriyashawasthi01feb:SHRIyash123@cluster0.uk1z5e3.mongodb.net/FoodAppMern?retryWrites=true&w=majority"
const dotenv = require('dotenv');
dotenv.config();
const mongodb = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URL)
        // fetching food item data 
        const fetched_data = mongoose.connection.collection("Food_items");
        fetched_data.find({}, (err, res) => err ? reject(err) : res.toArray().then(function(x){
        // try to store data in a variable so that it can be displayed in frontend
           global.food_items = x;
        }))
        // fetching foodCategory data
        const category_data = mongoose.connection.collection("Food_Category");
        category_data.find({}, (err,res) => err ? reject(err) : res.toArray().then(function(y){
            global.food_category = y;
        }))
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
    }
}
module.exports = mongodb