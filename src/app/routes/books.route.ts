import express from 'express';
import { addBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controller/books.controller';
export const booksRouter = express.Router();

booksRouter.post('/', addBook);
booksRouter.get('/', getAllBooks);
booksRouter.get('/:bookId', getBookById);
booksRouter.put('/:bookId', updateBook);
booksRouter.delete('/:bookId', deleteBook)