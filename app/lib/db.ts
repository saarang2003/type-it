import 'dotenv/config';
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

export async function dbConnect(){
    if(MONGO_URL){
        await mongoose.connect(MONGO_URL);
    }
}



