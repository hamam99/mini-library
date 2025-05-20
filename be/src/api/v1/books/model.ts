import { model, Schema, Types } from 'mongoose';
import TagStatus from '../tags/constant';

const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 500,
    },
    description: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    fileName: {
      type: String,
      required: false,
    },
    tag: {
      type: Types.ObjectId,
      ref: 'Tag',
      required: false,
      default: TagStatus.unchategorized,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Book', booksSchema);
