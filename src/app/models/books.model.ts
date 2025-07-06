import { model, Schema } from "mongoose";
import type { BookStatics, IBooks } from "../interface/books.interface";

const booksSchema = new Schema<IBooks, BookStatics>({
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

booksSchema.static('updateAvailability', async function updateAvailability(doc) {
    const book = await this.findById(doc.book);

    if (!book) { return new Error('Book is not found') }

    book.copies = book.copies - doc.quantity;
    console.log(book.copies);
    if (book.copies === 0) book.available = false;

    await book.save();

})

export const Book = model<IBooks, BookStatics>('Book', booksSchema);