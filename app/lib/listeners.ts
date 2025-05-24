import mongoose from "mongoose";

export function databaseListeners(){
    mongoose.connection.once('open' , (err) =>{
        console.log('Database Connected' , err);
    })
    mongoose.connection.on('error' , (err) =>{
        console.log(err);
    })
}