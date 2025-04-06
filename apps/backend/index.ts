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

app.post('/ai/generate', async(req,res)=>{
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

app.post('/pack/generate', async(req, res)=>{
    const parsedBody = GenerateImageFromPrompt.safeParse(req.body);

    if(!parsedBody.success){
        res.status(401).json({
            message: "Incorrect Input"
        })
        return;
    }

    const prompts = await prismaClient.packPrompts.findMany({
        where: {
        packId: parsedBody.data.packId
        }
    })

    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt)=>({
            prompt: prompt.prompt,
            userId: USER_ID,
            modelId: parsedBody.data.modelId,
            imageUrl: ""
        }))
    })

    res.status(200).json({
        images: images.map((image)=> image.id)
    })

});
 
app.get('/pack/bulk', async(req, res)=>{
    const packs = await prismaClient.packs.findMany({})
    
    res.status(200).json({
        packs
    })
});

app.get('/image/bulk', async(req, res)=>{
    const images= req.query.images as string[];
    const limit = req.query.limit as string ?? '10';
    const offset = req.query.offset as string  ?? '0';

    console.log(images);


    const imageData = await prismaClient.outputImages.findMany({
        where: {
            id: {
                in: images
            },
            userId: USER_ID
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    })

    res.status(200).json({
        images: imageData
    })
});


app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
})