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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, 'Please provide a unique ISBN number'],
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
booksSchema.static('updateAvailability', function updateAvailability(doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(doc.book);
        if (!book) {
            return new Error('Book is not found');
        }
        book.copies = book.copies - doc.quantity;
        console.log(book.copies);
        if (book.copies === 0)
            book.available = false;
        yield book.save();
    });
});
exports.Book = (0, mongoose_1.model)('Book', booksSchema);
