import { z } from "zod";

export default z.object({
    name: z.string().min(3).max(64),
    price: z.number().positive().optional(),
    categoryId: z.number().positive().optional(),
    restaurantId: z.number().positive().optional(),
});
