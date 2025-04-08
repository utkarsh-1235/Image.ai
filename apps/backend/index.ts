 import express from 'express';
 import dotenv from 'dotenv';
 import {trainModelSchema, GenerateImage, GenerateImageFromPrompt} from 'common/types';
 import { prismaClient } from 'prisma-app';
 import {FalAiModel} from './Models/FalAimodel'

dotenv.config();
 
const app = express();
app.use(express.json());
const Port = process.env.PORT ;

const FalAimodel = new FalAiModel();
const USER_ID = "utksndf";

app.post("/ai/training", async(req, res)=>{
    const parsedBody = trainModelSchema.safeParse(req.body);

    if(!parsedBody.success){
        res.status(401).json({
            message: "Input Incorrect"
        })
        return;
    }
  
    const {request_id, response_url} = await FalAimodel.trainModel(parsedBody.data.zipUrl, parsedBody.data.name)
  const data =  await prismaClient.model.create({ 
    data:{
        name: parsedBody.data.name,         
        type: parsedBody.data.type,         
        age: parsedBody.data.age,          
        ethinicity: parsedBody.data.ethinicity,    
        eyeColor: parsedBody.data.eyeColor,    
        bald: parsedBody.data.bald,   
        userId: USER_ID,   
        falAiRequestId: request_id,
        zipUrl: parsedBody.data.zipUrl
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

   const model = await prismaClient.model.findUnique({
    where: {
        id: parsedBody.data.modelId
    }
   })

   if(!model || !model.tensorPath){
    res.status(411).json({
        message: "Model not found"
    })
   }

   const {request_id, response_url} = await FalAimodel.generateImage(parsedBody.data.prompt, model?.tensorPath ?? "")
   const data = await prismaClient.outputImages.create({
      data: {
        prompt: parsedBody.data.prompt, // Removed as it does not exist in the Prisma model
        userId: USER_ID,
        modelId: parsedBody.data.prompt,
        imageUrl: "https://example.com/image.jpg", 
        falAiRequestId: request_id
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

app.post('/fal-ai/webhook/train', async(req, res)=>{
    console.log(req.body);
    const requestId = req.body.request_id;

    await prismaClient.model.updateMany({
        where: {
            falAiRequestId: requestId 
        },
        data: {
            trainingStatus: "Generated",
            tensorPath: req.body.tensor_path
        }
    })
    res.status(200).json({
        message: "webhook recieved"
    })
})

app.post('/fal-ai/webhook/image', async(req, res)=>{
    console.log(req.body) ;

    const requestId = req.body.request._id;

    await prismaClient.outputImages.updateMany({
        where:{
            falAiRequestId: requestId
        },
        data:{
            status: "Generated",
            imageUrl: req.body.image_url
        }
    })
    res.status(200).json({
        message: "Webhook recieved"
    })
})

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
})