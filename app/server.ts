// import 'dotenv/config';
// import { dbConnect } from './lib/db';
// import { databaseListeners } from './lib/listeners';
// import { createServer } from 'http';
// import app from './app';

// const PORT = process.env.PORT || 8000;

// const server = createServer(app);

// function startServer(){
//     dbConnect();
//     databaseListeners();


//     server.listen(PORT , () =>{
//         console.log(`Server listening to port , ${PORT}`);
//     });


// }

// startServer();


import { dbConnect } from './lib/db';

export async function GET() {
  await dbConnect();
}
