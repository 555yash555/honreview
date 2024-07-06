import{z} from 'zod';
const acceptMessageSchema = z.object({
    code: z.string().length(6, { message: "Code must be 6 characters long" }),
});