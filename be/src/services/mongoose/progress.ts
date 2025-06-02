import { Request } from 'express';
import mongoose from 'mongoose';
import Progress from '../../api/v1/progress/model';
import { NotfoundError } from '../../errors';
import { ProgressType } from '../../api/v1/progress/model';

type ProgressDocument = mongoose.Document & ProgressType;

export const create = async (req: Request): Promise<ProgressDocument> => {
  const response = await Progress.create(req.body);

  return response;
};

export const getAll = async (): Promise<ProgressDocument[]> => {
  const response = await Progress.find().populate({
    path: 'book',
    select: '_id title',
    populate: {
      path: 'tag',
      select: 'title',
    },
  });

  return response;
};

export const getById = async (req: Request): Promise<ProgressDocument> => {
  const { id } = req.params;
  const response = await Progress.findById(id).populate({
    path: 'book',
    select: '_id title',
    populate: {
      path: 'tag',
      select: 'title',
    },
  });

  if (!response) {
    throw new NotfoundError({
      message: 'Progress not found with id ' + id,
    });
  }

  return response;
};

export const update = async (req: Request): Promise<ProgressDocument> => {
  const { id } = req.params;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const response = await Progress.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!response) {
    throw new NotfoundError({
      message: 'Progress not found with id ' + id,
    });
  }

  return response;
};

export const destroy = async (req: Request): Promise<void> => {
  const deleteData = await Progress.findByIdAndDelete(req.params.id);
  if (!deleteData) {
    throw new NotfoundError({
      message: 'Progress not found with id ' + req.params.id,
    });
  }
};
