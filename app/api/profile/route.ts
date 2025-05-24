import Profile from "@/app/models/Profile";
import auth from "../middleware/auth";
import { NextFunction } from "express";
import User from "@/app/models/User";


export async function GET( auth , req : AuthenticatedRequest , res : Response , next : NextFunction) {

    const username = req.user!.username;

    try {

        if(!username){
            throw new Error("No username found");
        }

        const user = await User.findOne({username});
        const profile = (await Profile.findOne({_id : user._id}));

        res.json(profile);
        
    } catch (err) {
        next(err);
    }
}