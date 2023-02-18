import { z } from "zod";

export default z.object({
    title: z.string().min(3).max(128),
    content: z.string().min(1).max(1024).optional(),
});
