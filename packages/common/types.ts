import {z} from 'zod';

export const trainModelSchema = z.object({
    name: z.string(),
    type: z.enum(['Male, Female, Other']),
    age: z.number(),
    ethnicity: z.enum(['Asian American','East Asian','South East Asian','South Asian', 'Middle Eastern', 'Pacific','Black','White' ,'Hispanic']),
    eyeColor: z.enum(['Brown', 'Blue', 'Gray', 'Hazel']),
    bald: z.boolean(),
    images: z.array(z.string())
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