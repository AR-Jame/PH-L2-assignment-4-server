import express from 'express';
import { borrowSummary, newBorrow } from '../controller/borrow.controller';

export const borrowRouter = express.Router();

borrowRouter.post('/', newBorrow);
borrowRouter.get('/', borrowSummary)