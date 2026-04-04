export interface Announcement {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  eventDate: string;
  ctaLabel: string;
  ctaUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnnouncementPayload {
  title: string;
  description: string;
  eventDate: string;
  ctaLabel: string;
  ctaUrl: string;
  poster?: File;
}
