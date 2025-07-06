import { z } from "zod";

export const bookZodSchema = z.object({
    title: z.string().trim(),
    author: z.string(),
    genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
    isbn: z.string(),
    description: z.string().optional().nullable(),
    copies: z.number().positive(),
    available: z.boolean().default(true)
})