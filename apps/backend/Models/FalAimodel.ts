import { BaseModel } from "./BaseModel";
import { fal } from "@fal-ai/client";

export class FalAiModel extends BaseModel{
    constructor(){
        super();
    }

    public async generateImage(prompt: string, tensorFlowPath: string){
        const {request_id, response_url} = await fal.queue.submit("fal-ai/speech-to-text/turbo/stream", {
            input: {
              prompt: prompt,
              loras: [{path: tensorFlowPath, scale: 1 }]
            },
            
          });
          return {request_id, response_url};
    }

    public async trainModel(zipImage: string, triggerWord: string){
        const { request_id, response_url } = await fal.queue.submit("fal-ai/speech-to-text/turbo/stream", {
            input: {
              image_url: zipImage,
              trigger_word: triggerWord
            },
            webhookUrl: `${process.env.WEBHOOK_URL}/fal-ai/webhook`,
          });
        return {request_id, response_url};
    }
}