 import express from 'express';
 import dotenv from 'dotenv';
 import {trainModelSchema, GenerateImage, GenerateImageFromPrompt} from 'common/types';
 import { prismaClient } from 'prisma-app';

dotenv.config();
 
const app = express();
app.use(express.json());
const Port = process.env.PORT ;

const USER_ID = "utksndf";

app.post("/ai/training", async(req, res)=>{
    const parsedBody = trainModelSchema.safeParse(req.body);

    if(!parsedBody.success){
        res.status(401).json({
            message: "Input Incorrect"
        })
        return;
    }

  const data =  await prismaClient.model.create({ 
    data:{
        name: parsedBody.data.name,         
        type: parsedBody.data.type,         
        age: parsedBody.data.age,          
        ethinicity: parsedBody.data.ethinicity,    
        eyeColor: parsedBody.data.eyeColor,    
        bald: parsedBody.data.bald,   
        userId: USER_ID,   
    }
    })

    res.status(200).json({
        modelId: data.id
    })
});

app.post('ai/generate', async(req,res)=>{
   const parsedBody = GenerateImage.safeParse(req.body);

   if(!parsedBody.success){
    res.status(401).json({
        message: "Input Incorrect"
    })
    return;
   }

   const data = await prismaClient.outputImages.create({
      data: {
        prompt: parsedBody.data.prompt, // Removed as it does not exist in the Prisma model
        userId: USER_ID,
        modelId: parsedBody.data.prompt,
        imageUrl: "https://example.com/image.jpg", 
      }
   })

   res.status(200).json({
    imageId: data.id
   })
});
// app.post();
// app.get();
// app.get();


app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
})