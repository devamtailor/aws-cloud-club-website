import { http } from "./http";
import type { ApiResponse } from "../types/api";
import type { Announcement, AnnouncementPayload } from "../types/announcement";

const toFormData = (payload: AnnouncementPayload): FormData => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("eventDate", payload.eventDate);
  formData.append("ctaLabel", payload.ctaLabel);
  formData.append("ctaUrl", payload.ctaUrl);

  if (payload.poster) {
    formData.append("poster", payload.poster);
  }

  return formData;
};

export const announcementService = {
  async getAll(): Promise<Announcement[]> {
    const response = await http.get<ApiResponse<Announcement[]>>("/announcements");
    return response.data.data ?? [];
  },

  async create(payload: AnnouncementPayload): Promise<Announcement> {
    const response = await http.post<ApiResponse<Announcement>>("/announcements", toFormData(payload), {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    if (!response.data.data) {
      throw new Error("Failed to create announcement");
    }

    return response.data.data;
  },

  async update(id: string, payload: AnnouncementPayload): Promise<Announcement> {
    const response = await http.put<ApiResponse<Announcement>>(`/announcements/${id}`, toFormData(payload), {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    if (!response.data.data) {
      throw new Error("Failed to update announcement");
    }

    return response.data.data;
  },

  async remove(id: string): Promise<void> {
    await http.delete(`/announcements/${id}`);
  }
};
