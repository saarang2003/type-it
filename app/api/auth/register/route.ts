import User from "@/app/models/User";


export async function POST(req : Request){
    
    const { username , email , password} = await req.json();

    try {
        const user = await User.create({
            username,
            email,
            password
        })
        return Response.json({message : "User created successfully", user}, { status: 201 });
    } catch (error : unknown) {
        if (error instanceof Error) {
        return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json({ error: "An unknown error occurred" }, { status: 400 });
    }
}