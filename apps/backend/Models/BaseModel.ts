import { PrismaClient } from "@prisma/client/extension";

export abstract class BaseModel{
    constructor(){}

    public async generateImage(prompt: string, tensorFlowPath: string){

    }

    public async trainModel(inputImages: string[], triggerWord: string){

    }
}