import { Request } from 'express';
import Books from '../../api/v1/books/model';
import { NotfoundError } from '../../errors';
import config from '../../config/config';
import { PATH_UPLOAD_BOOKS } from '../../middlewares/multer';

export const create = async (req: Request) => {
  const response = await Books.create({
    ...req.body,
    fileName: req.file?.filename,
  });

  return response;
};

export const getAll = async () => {
  const response = await Books.find();
  const booksWithUrl = response.map((book) => {
    const fileUrl = `${config.baseUrl}/${PATH_UPLOAD_BOOKS}/${book.fileName}`;
    return {
      ...book.toObject(),
      fileUrl,
    };
  });
  return booksWithUrl;
};

export const getById = async (req: Request) => {
  const { id } = req.params;
  const response = await Books.findById(id);

  if (!response) {
    throw new NotfoundError({
      message: 'Book not found with id ' + id,
    });
  }

  return response;
};

export const update = async (req: Request) => {
  const { id } = req.params;
  const response = await Books.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!response) {
    throw new NotfoundError({
      message: 'Book not found with id ' + id,
    });
  }

  return response;
};

export const destroy = async (req: Request) => {
  const response = await Books.findByIdAndDelete(req.params.id);
  if (!response) {
    throw new NotfoundError({
      message: 'Book not found with id ' + req.params.id,
    });
  }
  return response;
};
