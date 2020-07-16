import { Document, model, Schema } from 'mongoose';

export interface UrlDocument extends Document {
  url: string
}

const urlSchema = new Schema<UrlDocument>({
  url: {
    type: String,
    required: true
  }
});

export const Url = model<UrlDocument>('Url', urlSchema, 'urls');
