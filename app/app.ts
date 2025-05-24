
// import express from 'express';
// import next from 'next';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import morgan from 'morgan';

// const dev = process.env.NODE_ENV !== 'production';
// const nextApp = next({ dev});
// const handle = nextApp.getRequestHandler();

// const app = express();

// // middlewares
// app.use(cors(
//     {
//         origin : '*' , 
//         credentials : true
//     }
//  ))
// app.use(cookieParser());
// app.use(morgan('dev'));
// app.use(express.json());


// // add api endpoints

// app.get('/api/health' , (req,res) =>{
//     res.json({ status : 'Server is healthy'});
// })


// nextApp.prepare().then(() =>{
//     app.all('*' , (req,res) => handle(req,res));
// })

// export default app;