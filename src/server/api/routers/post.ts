import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ctx}) => {
    const data = await ctx.prisma.climates.findMany({})
    return data
  }),
  addReport: publicProcedure.input(z.object({
    comment: z.string(),
    img: z.string(),
    lat: z.number(),
    lng: z.number()
  })).mutation(async ({input, ctx}) => {
    const data = await ctx.prisma.climates.create({
      data: {
        comment: input.comment,
        img: input.img,
        lat: input.lat,
        long: input.lng
      }
    })
  })
});
