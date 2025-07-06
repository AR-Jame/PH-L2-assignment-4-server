"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookZodSchema = void 0;
const zod_1 = require("zod");
exports.bookZodSchema = zod_1.z.object({
    title: zod_1.z.string().trim(),
    author: zod_1.z.string(),
    genre: zod_1.z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    copies: zod_1.z.number().positive(),
    available: zod_1.z.boolean().default(true)
});
