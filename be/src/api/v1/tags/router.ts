import express from 'express';
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from './controller';
const router = express();

router.get('/tags', getAllTags);
router.get('/tags/:id', getTagById);
router.post('/tags', createTag);
router.delete('/tags/:id', deleteTag);
router.put('/tags/:id', updateTag);

// router.get('/tags/:id', async (req: Request, res: Response) => {
//   return await getTagById(req, res);
// });

// router.put('/tags/:id', async (req: Request, res: Response) => {
//   return await getTagById(req, res);
// });

// router.delete('/tags/:id', async (req: Request, res: Response) => {
//   return await getTagById(req, res);
// });

export default router;
