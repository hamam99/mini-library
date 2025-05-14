import { model, Schema } from 'mongoose';

export type ITags = {
  title: string;
};

const tagsSchema = new Schema<ITags>(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 500,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Tag', tagsSchema);
