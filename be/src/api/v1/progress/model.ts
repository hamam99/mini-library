import { InferSchemaType, model, Schema, Types } from 'mongoose';
import ProgressStatus from './constant';

const progressSchema = new Schema(
  {
    status: {
      type: String,
      required: false,
      enum: ProgressStatus,
      default: ProgressStatus.NOT_STARTED,
    },
    book: {
      type: Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    lastPageRead: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Progress', progressSchema);

export type ProgressType = InferSchemaType<typeof progressSchema>;
