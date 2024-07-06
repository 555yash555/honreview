// create a sigUp schema for sigin using zod
import { z } from "zod";
//create a username validation using zod with proper constrartttaints using regex also min characters 2 no speceail characters only underscore sllowed
const usernameValid = z
  .string()
  .min(2, { message: "Username must be at least 2 character long" })
  .regex(/^[a-zA-Z0-9_]*$/, {
    message: "Username must only contain letters, numbers, and underscores",
  });

const signInSchema = z.object({
  username: usernameValid,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});
