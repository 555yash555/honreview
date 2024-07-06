import {z} from 'zod';
const messageSchema = z.object({
    content: z.string().min(10, { message: "Message must be at least 10 character long" }).max(500, { message: "Message must be at most 500 character long" })
    
});