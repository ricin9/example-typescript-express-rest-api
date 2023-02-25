import { z } from "zod";

export default z.object({
    username: z.string().min(1).max(32),
    password: z.string().min(6).max(64),
});
