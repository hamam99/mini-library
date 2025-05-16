import { Request } from 'express';
import Books from '../../api/v1/books/model';
import BadRequestError from '../../errors/BadRequestError';
import { NotfoundError } from '../../errors';

export const create = async (req: Request) => {
  const { title, author } = req.body;

  const isExist = await Books.findOne({
    title: title,
  });

  if (isExist) {
    throw new BadRequestError({
      message: 'Book with title and description alrady exist',
      logging: true,
    });
  }
  const response = await Books.create(req.body);

  return response;
};

export const getAll = async () => {
  const response = await Books.find();
  return response;
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
