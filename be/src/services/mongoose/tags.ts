import { Request } from 'express';
import Tags from '../../api/v1/tags/model';
import BadRequestError from '../../errors/BadRequestError';
import { NotfoundError } from '../../errors';

export const create = async (req: Request) => {
  const { title } = req.body;

  const isExist = await Tags.findOne({
    title,
  });
  if (isExist) {
    throw new BadRequestError({
      message: 'Tag already exist',
      logging: true,
    });
  }
  const response = await Tags.create({ title });

  return response;
};

export const getAll = async (req: Request) => {
  const response = await Tags.find();

  return response;
};

export const getById = async (req: Request) => {
  const { id } = req.params;
  const response = await Tags.findById(id);

  if (!response) {
    throw new NotfoundError({
      message: 'Tag not found with id ' + id,
    });
  }

  return response;
};

export const update = async (req: Request) => {
  const { id } = req.params;
  const response = await Tags.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!response) {
    throw new NotfoundError({
      message: 'Tag not found with id ' + id,
    });
  }

  return response;
};

export const destroy = async (req: Request) => {
  const deletedTag = await Tags.findByIdAndDelete(req.params.id);
  if (!deletedTag) {
    throw new NotfoundError({
      message: 'Tag not found with id ' + req.params.id,
    });
  }
};
