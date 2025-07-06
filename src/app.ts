import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import { booksRouter } from './app/routes/books.route';
import { borrowRouter } from './app/routes/borrow.routes';
import cors from 'cors'

const app: Application = express();

app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5173', "https://assignment-4-client-green.vercel.app"]
    }
))

app.use('/api/books', booksRouter);
app.use('/api/borrow', borrowRouter)

app.get('/', (req: Request, res: Response) => {
    console.log('i am hitting');
    res.send('Library management application working perfectly.')
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    let errorCode = error.statusCode | 400;
    if (error) {
        res.status(errorCode).send({
            message: error.message,
            success: false,
            error: error
        })
    }
})

export default app