 const express = require('express');
 const {trainModelSchema, GenerateImage, GenerateImageFromPrompt } = require('common');
 
const app = express();

const Port = 3001;

// app.post();
// app.post();
// app.post();
// app.get();
// app.get();


app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
})