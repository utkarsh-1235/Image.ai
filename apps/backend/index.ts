 import express from 'express';
 import dotenv from 'dotenv';
 import {trainModelSchema, GenerateImage, GenerateImageFromPrompt} from '@common/types';

dotenv.config();
 
const app = express();

const Port = process.env.PORT ;

// app.post();
// app.post();
// app.post();
// app.get();
// app.get();


app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
})