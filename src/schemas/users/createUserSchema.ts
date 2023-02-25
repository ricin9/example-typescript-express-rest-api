import { z } from "zod";

export default z.object({
    username: z.string().min(1).max(32),
    name: z.string().min(1).min(32).optional(),
    password: z.string().min(6).max(64),
});
