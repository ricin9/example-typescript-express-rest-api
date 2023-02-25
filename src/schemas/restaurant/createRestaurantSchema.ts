import { z } from "zod";

export default z.object({
    name: z.string().min(3).max(64),
    location: z.string().min(1).max(128).optional(),
    coordinates: z.string().min(1).max(128).optional(),
});
