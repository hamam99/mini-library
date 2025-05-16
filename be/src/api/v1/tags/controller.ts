import { NextFunction, Request, Response } from 'express';
import { create, destroy, getAll, getById, update } from '../../../services/mongoose/tags';
import { StatusCodes } from 'http-status-codes';
// Helper function to handle errors in responses

// Create a new tag
export const createTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTag = await create(req);
    res.status(StatusCodes.CREATED).json(newTag);
  } catch (error) {
    next(error);
  }
};

// Get all tags
export const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await getAll();
    res.status(StatusCodes.OK).json(tags);
  } catch (error) {
    next(error);
  }
};

// Get tag by ID
export const getTagById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tag = await getById(req);
    res.status(StatusCodes.OK).json(tag);
  } catch (error) {
    next(error);
  }
};

// Update tag
export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedTag = await update(req);
    res.status(StatusCodes.OK).json(updatedTag);
  } catch (error) {
    next(error);
  }
};

// Delete tag
export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedTag = await destroy(req);
    res.status(StatusCodes.OK).json({
      message: 'Delete successfully id : ' + req.params.id,
    });
  } catch (error) {
    next(error);
  }
};
