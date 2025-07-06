import type { NextFunction, Request, Response } from "express";
import { Book } from "../models/books.model";
import type { BookQueryParams } from "../interface/books.interface";
import { bookZodSchema } from "../validation/books.validation";

export async function addBook(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(req.body);
        const body = bookZodSchema.parse({ ...req.body, copies: parseInt(req.body.copies) });
        const result = await Book.create(body);
        res.send({
            success: true,
            message: 'Book created successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}


export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
        const { filter, sortBy, sort, limit } = req.query as BookQueryParams;
        const query: any = {}
        if (filter) query.genre = filter;

        const sortField = sortBy || 'createdAt';
        const sortOrder = sort || 'asc';
        const limitValue = limit ? parseInt(limit) : 10;

        const result = await Book.find(query)
            .sort({ [sortField]: sortOrder })
            .limit(limitValue)
            .select({ description: 0 })
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        // res.send(error)
        next(error)
    }
};

export async function getBookById(req: Request, res: Response) {
    const bookId = req.params.bookId;
    const result = await Book.findById(bookId);
    res.send({
        success: true,
        message: "Book retrieved successfully",
        data: result
    })
}

export async function updateBook(req: Request, res: Response) {
    const bookId = req.params.bookId;
    console.log(bookId);
    const body = req.body;
    const result = await Book.findByIdAndUpdate(bookId, body, { new: true });
    res.send({
        success: true,
        message: "Book updated successfully",
        data: result
    })
}

export async function deleteBook(req: Request, res: Response) {
    const bookId = req.params.bookId;
    const result = await Book.findByIdAndDelete(bookId);
    console.log(result);
    res.send({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
}