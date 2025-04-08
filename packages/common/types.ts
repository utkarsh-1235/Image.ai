import {z} from 'zod';

export const trainModelSchema = z.object({
    name: z.string(),
    type: z.enum(['Male', 'Female', 'Other']),
    age: z.number(),
    ethinicity: z.enum(['AsianAmerican','EastAsian','SouthEastAsian','SouthAsian', 'MiddleEastern', 'Pacific','Black','White' ,'Hispanic']),
    eyeColor: z.enum(['Brown', 'Blue', 'Gray', 'Hazel']),
    bald: z.boolean(),
    zipUrl: z.string()
})

export const GenerateImage = z.object({
    prompt: z.string(),
    modelId: z.string(),
    num: z.number()
})

export const GenerateImageFromPrompt = z.object({
    modelId: z.string(),
    packId: z.string()
})