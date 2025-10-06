import { Pinecone } from '@pinecone-database/pinecone'

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const chatgpt=pc.index('chatgpt');
export const createMemory=async({vectors,metadata})=>{
    await chatgpt.upsert([{
        id:messagesValidation,
        values:vectors,
        metadata
    }])
}

export const  queryMemory=async({queryVector,limit=5,metadata})=>{
    const data=await chatgpt.query({
        vector:queryVector,
        topK:limit,
        filter:metadata?{metadata}:undefined
    })
    return data.matches;
}

