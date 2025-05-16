import express from 'express';
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from './controller';
const tagsRouter = express();

tagsRouter.get('/tags', getAllTags);
tagsRouter.get('/tags/:id', getTagById);
tagsRouter.post('/tags', createTag);
tagsRouter.delete('/tags/:id', deleteTag);
tagsRouter.put('/tags/:id', updateTag);

export default tagsRouter;
