"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBook = addBook;
exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
const books_model_1 = require("../models/books.model");
const books_validation_1 = require("../validation/books.validation");
function addBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const body = books_validation_1.bookZodSchema.parse(Object.assign(Object.assign({}, req.body), { copies: parseInt(req.body.copies) }));
            const result = yield books_model_1.Book.create(body);
            res.send({
                success: true,
                message: 'Book created successfully',
                data: result
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
function getAllBooks(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { filter, sortBy, sort, limit } = req.query;
            console.log(limit);
            const query = {};
            if (filter)
                query.genre = filter;
            const sortField = sortBy || 'createdAt';
            const sortOrder = sort || 'asc';
            const limitValue = limit ? parseInt(limit) : 10;
            const result = yield books_model_1.Book.find(query)
                .sort({ [sortField]: sortOrder })
                .limit(limitValue);
            res.send({
                success: true,
                message: "Books retrieved successfully",
                data: result
            });
        }
        catch (error) {
            console.log(error);
            // res.send(error)
            next(error);
        }
    });
}
;
function getBookById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = req.params.bookId;
        const result = yield books_model_1.Book.findById(bookId);
        res.send({
            success: true,
            message: "Book retrieved successfully",
            data: result
        });
    });
}
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = req.params.bookId;
        console.log(bookId);
        const body = req.body;
        const result = yield books_model_1.Book.findByIdAndUpdate(bookId, body, { new: true });
        res.send({
            success: true,
            message: "Book updated successfully",
            data: result
        });
    });
}
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = req.params.bookId;
        const result = yield books_model_1.Book.findByIdAndDelete(bookId);
        console.log(result);
        res.send({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    });
}
