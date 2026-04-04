import { InferSchemaType, Schema, model } from "mongoose";

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    posterUrl: {
      type: String,
      required: true
    },
    eventDate: {
      type: Date,
      required: true
    },
    ctaLabel: {
      type: String,
      required: true,
      trim: true
    },
    ctaUrl: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

announcementSchema.index({ eventDate: -1 });

export type AnnouncementDocument = InferSchemaType<typeof announcementSchema> & {
  _id: string;
};

export const Announcement = model("Announcement", announcementSchema);
