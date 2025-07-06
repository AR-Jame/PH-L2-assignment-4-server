import type { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { borrowZodSchema } from "../validation/borrow.validation";


export async function newBorrow(req: Request, res: Response, next: NextFunction) {
    try {
        const body = borrowZodSchema.parse(req.body);
        const borrow = new Borrow(body);
        const result = await borrow.save();
        res.send({
            success: true,
            message: "Book borrowed successfully",
            data: result
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

export async function borrowSummary(req: Request, res: Response) {
    const result = await Borrow.aggregate([
        {
            $group: {
                _id: '$book',
                totalQuantity: { $sum: '$quantity' },

            }
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: 'book'
            }
        },
        {
            $unwind: '$book'
        },
        {
            $project: {
                _id: 0,
                'book.author': 0,
                'book.genre': 0,
                'book.description': 0,
                'book.copies': 0,
                'book.available': 0,
                'book.createdAt': 0,
                'book.updatedAt': 0,
                'book._id': 0,
                // 'book.title': 1,
                // 'book.isbn': 1,

            }
        }
    ])
    res.send({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: result
    })
}