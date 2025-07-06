import { model, Schema } from "mongoose";
import type { IBorrow } from "../interface/borrow.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    dueDate: {
        type: Date,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true
})

// Middlewares
borrowSchema.pre('save', async function (next) {
    const book = await Book.findById(this.book)
    if (!book) {
        return next(new Error('We do not find the book that you want to borrow'));
    }
    if (book.copies < this.quantity) {
        return next(new Error('We do not have enough copy to give you. sorry!!'));
    }
    next();
})

borrowSchema.post('save', async function (doc) {
    Book.updateAvailability(doc)
})


export const Borrow = model<IBorrow>('Borrow', borrowSchema)