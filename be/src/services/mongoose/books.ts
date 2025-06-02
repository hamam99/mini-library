import { Request } from 'express';
import Books, { BookType } from '../../api/v1/books/model';
import { NotfoundError } from '../../errors';
import config from '../../config/config';
import { PATH_UPLOAD_BOOKS } from '../../middlewares/multer';
import { UpdateQuery } from 'mongoose';

// Define the return type for getAll function
interface BookWithUrl extends Record<string, unknown> {
  fileUrl: string;
}

export const create = async (req: Request): Promise<BookType> => {
  const response = await Books.create({
    ...req.body,
    fileName: req.file?.filename,
  });

  return response;
};

export const getAll = async (): Promise<BookWithUrl[]> => {
  const response = await Books.find();
  const booksWithUrl = response.map((book) => {
    // Handle potential undefined/null fileName
    const fileName = book.fileName || '';
    // Ensure all parts of the template are strings
    const baseUrl = String(config.baseUrl || '');
    const uploadPath = String(PATH_UPLOAD_BOOKS);
    const fileUrl = `${baseUrl}/${uploadPath}/${fileName}`;
    return {
      ...book.toObject(),
      fileUrl,
    };
  });
  return booksWithUrl;
};

export const getById = async (req: Request): Promise<BookType> => {
  const { id } = req.params;
  const response = await Books.findById(id);

  if (!response) {
    throw new NotfoundError({
      message: 'Book not found with id ' + id,
    });
  }

  return response;
};

export const update = async (req: Request): Promise<BookType> => {
  const { id } = req.params;
  const response = await Books.findByIdAndUpdate(id, req.body as UpdateQuery<BookType>, {
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

export const destroy = async (req: Request): Promise<BookType> => {
  const response = await Books.findByIdAndDelete(req.params.id);
  if (!response) {
    throw new NotfoundError({
      message: 'Book not found with id ' + req.params.id,
    });
  }
  return response;
};
