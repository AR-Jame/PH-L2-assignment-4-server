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
exports.newBorrow = newBorrow;
exports.borrowSummary = borrowSummary;
const borrow_model_1 = require("../models/borrow.model");
const borrow_validation_1 = require("../validation/borrow.validation");
function newBorrow(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = borrow_validation_1.borrowZodSchema.parse(req.body);
            const borrow = new borrow_model_1.Borrow(body);
            const result = yield borrow.save();
            res.send({
                success: true,
                message: "Book borrowed successfully",
                data: result
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
function borrowSummary(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield borrow_model_1.Borrow.aggregate([
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
        ]);
        res.send({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: result
        });
    });
}
