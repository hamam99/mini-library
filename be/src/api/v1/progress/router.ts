import express from 'express';
import { createProgress, deleteProgress, getAllProgress, getProgressById, updateProgress } from './controller';
const progressRouter = express();

progressRouter.get('/progress', getAllProgress);
progressRouter.get('/progress/:id', getProgressById);
progressRouter.post('/progress', createProgress);
progressRouter.delete('/progress/:id', deleteProgress);
progressRouter.put('/progress/:id', updateProgress);

export default progressRouter;
