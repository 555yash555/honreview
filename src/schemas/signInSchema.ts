// create a sigin schema for sigin using zod
import { z } from "zod";
const signInSchema = z.object({
  identfier: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});
