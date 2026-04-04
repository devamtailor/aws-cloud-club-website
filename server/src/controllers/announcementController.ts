import { Request, Response } from "express";
import { z } from "zod";
import { Announcement } from "../models/Announcement";
import { ApiResponse } from "../types/api";
import { AnnouncementDTO } from "../types/announcement";
import { asyncHandler } from "../utils/asyncHandler";

const announcementSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  eventDate: z.coerce.date(),
  ctaLabel: z.string().min(2),
  ctaUrl: z.string().url()
});

const fileToDataUrl = (file: Express.Multer.File): string =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

const toDTO = (announcement: {
  _id: string;
  title: string;
  description: string;
  posterUrl: string;
  eventDate: Date;
  ctaLabel: string;
  ctaUrl: string;
  createdAt: Date;
  updatedAt: Date;
}): AnnouncementDTO => ({
  id: String(announcement._id),
  title: announcement.title,
  description: announcement.description,
  posterUrl: announcement.posterUrl,
  eventDate: announcement.eventDate.toISOString(),
  ctaLabel: announcement.ctaLabel,
  ctaUrl: announcement.ctaUrl,
  createdAt: announcement.createdAt.toISOString(),
  updatedAt: announcement.updatedAt.toISOString()
});

export const getAnnouncements = asyncHandler(
  async (_req: Request, res: Response<ApiResponse<AnnouncementDTO[]>>) => {
    const announcements = await Announcement.find().sort({ eventDate: -1 }).exec();

    res.status(200).json({
      success: true,
      message: "Announcements fetched",
      data: announcements.map((item) =>
        toDTO({
          _id: String(item._id),
          title: item.title,
          description: item.description,
          posterUrl: item.posterUrl,
          eventDate: item.eventDate,
          ctaLabel: item.ctaLabel,
          ctaUrl: item.ctaUrl,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        })
      )
    });
  }
);

export const createAnnouncement = asyncHandler(
  async (req: Request, res: Response<ApiResponse<AnnouncementDTO>>) => {
    const parsed = announcementSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Invalid announcement payload"
      });
      return;
    }

    const uploadedFile = req.file as Express.Multer.File | undefined;

    if (!uploadedFile?.buffer) {
      res.status(400).json({
        success: false,
        message: "Poster image is required"
      });
      return;
    }

    const created = await Announcement.create({
      ...parsed.data,
      eventDate: parsed.data.eventDate,
      posterUrl: fileToDataUrl(uploadedFile)
    });

    res.status(201).json({
      success: true,
      message: "Announcement created",
      data: toDTO({
        _id: String(created._id),
        title: created.title,
        description: created.description,
        posterUrl: created.posterUrl,
        eventDate: created.eventDate,
        ctaLabel: created.ctaLabel,
        ctaUrl: created.ctaUrl,
        createdAt: created.createdAt,
        updatedAt: created.updatedAt
      })
    });
  }
);

export const updateAnnouncement = asyncHandler(
  async (req: Request, res: Response<ApiResponse<AnnouncementDTO>>) => {
    const parsed = announcementSchema.partial().safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Invalid update payload"
      });
      return;
    }

    const existing = await Announcement.findById(req.params.id).exec();

    if (!existing) {
      res.status(404).json({
        success: false,
        message: "Announcement not found"
      });
      return;
    }

    const uploadedFile = req.file as Express.Multer.File | undefined;

    if (uploadedFile?.buffer) {
      existing.posterUrl = fileToDataUrl(uploadedFile);
    }

    if (parsed.data.title) {
      existing.title = parsed.data.title;
    }

    if (parsed.data.description) {
      existing.description = parsed.data.description;
    }

    if (parsed.data.eventDate) {
      existing.eventDate = parsed.data.eventDate;
    }

    if (parsed.data.ctaLabel) {
      existing.ctaLabel = parsed.data.ctaLabel;
    }

    if (parsed.data.ctaUrl) {
      existing.ctaUrl = parsed.data.ctaUrl;
    }

    const updated = await existing.save();

    res.status(200).json({
      success: true,
      message: "Announcement updated",
      data: toDTO({
        _id: String(updated._id),
        title: updated.title,
        description: updated.description,
        posterUrl: updated.posterUrl,
        eventDate: updated.eventDate,
        ctaLabel: updated.ctaLabel,
        ctaUrl: updated.ctaUrl,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt
      })
    });
  }
);

export const deleteAnnouncement = asyncHandler(
  async (req: Request, res: Response<ApiResponse<null>>) => {
    const deleted = await Announcement.findByIdAndDelete(req.params.id).exec();

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Announcement not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Announcement deleted",
      data: null
    });
  }
);
