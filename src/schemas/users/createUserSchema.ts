import { z } from "zod";

export default z.object({
    email: z.string().email(),
    password: z.string().min(6).max(64),
    name: z.string().min(1).min(32).optional(),
});
