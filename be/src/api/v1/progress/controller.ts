import { NextFunction, Response, Request } from 'express';
import { create, destroy, getAll, getById, update } from '../../../services/mongoose/progress';
import { StatusCodes } from 'http-status-codes';
// Helper function to handle errors in responses

// Create a new tag
export const createProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProgress = await create(req);
    res.status(StatusCodes.CREATED).json(newProgress);
  } catch (error) {
    next(error);
  }
};

// Get all tags
export const getAllProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await getAll();
    res.status(StatusCodes.OK).json(tags);
  } catch (error) {
    next(error);
  }
};

// Get tag by ID
export const getProgressById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tag = await getById(req);
    res.status(StatusCodes.OK).json(tag);
  } catch (error) {
    next(error);
  }
};

// Update tag
export const updateProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedTag = await update(req);
    res.status(StatusCodes.OK).json(updatedTag);
  } catch (error) {
    next(error);
  }
};

// Delete tag
export const deleteProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await destroy(req);
    res.status(StatusCodes.OK).json({
      message: 'Delete successfully id : ' + req.params.id,
    });
  } catch (error) {
    next(error);
  }
};
