// import Profile from "@/app/models/Profile";

// import { NextFunction } from "express";
// import User from "@/app/models/User";


// export async function GET(req: Request, res: Response, next: NextFunction) {
//   const username = req.user?.username;

//   try {
//     if (!username) {
//       throw new Error("No username found");
//     }

//     const user = await User.findOne({ username });
//     const profile = await Profile.findOne({ _id: user?._id });

//     res.json();
//   } catch (err) {
//     next(err);
//   }
// }
