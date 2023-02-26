import { z } from "zod";

export default z
  .object({
    skip: z.number({ coerce: true }).nonnegative().default(0),
    take: z.number({ coerce: true }).nonnegative().max(100).default(25),
    where: z.object({
      name: z.string().transform((val) => {
        return {
          search: val,
        };
      }),
    }),
    orderBy: z.string().transform((val) => {
      const [key, value] = val.split(":");
      return {
        [key]: value,
      };
    }),
  })
  .partial()
  .strict();
