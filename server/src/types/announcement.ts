export interface AnnouncementInput {
  title: string;
  description: string;
  eventDate: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface AnnouncementDTO {
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
