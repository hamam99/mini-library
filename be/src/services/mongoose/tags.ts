import { Request } from 'express';
import mongoose from 'mongoose';
import Tags, { ITags } from '../../api/v1/tags/model';
import BadRequestError from '../../errors/BadRequestError';
import { NotfoundError } from '../../errors';

type TagDocument = mongoose.Document & ITags;

interface TagRequest extends Request {
  body: ITags;
}

interface UpdateTagRequest extends Request {
  body: Partial<ITags>;
}

export const create = async (req: TagRequest): Promise<TagDocument> => {
  // Explicitly type the title to avoid unsafe assignment
  const title: string = req.body.title;

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

export const getAll = async (): Promise<TagDocument[]> => {
  const response = await Tags.find();

  return response;
};

export const getById = async (req: Request): Promise<TagDocument> => {
  const { id } = req.params;
  const response = await Tags.findById(id);

  if (!response) {
    throw new NotfoundError({
      message: 'Tag not found with id ' + id,
    });
  }

  return response;
};

export const update = async (req: UpdateTagRequest): Promise<TagDocument> => {
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

export const destroy = async (req: Request): Promise<void> => {
  const deletedTag = await Tags.findByIdAndDelete(req.params.id);
  if (!deletedTag) {
    throw new NotfoundError({
      message: 'Tag not found with id ' + req.params.id,
    });
  }
};
