import multer, { StorageEngine } from 'multer';

const storage: StorageEngine = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, 'public/uploads/');
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
    return;
  }

  cb(null, false);
};

const multerMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default multerMiddleware;
