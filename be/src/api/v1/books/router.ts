import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from './controller';

const booksRouter = express();

booksRouter.get('/books', getAllBooks);
booksRouter.get('/books/:id', getBookById);
booksRouter.post('/books', createBook);
booksRouter.delete('/books/:id', deleteBook);
booksRouter.put('/books/:id', updateBook);

export default booksRouter;
