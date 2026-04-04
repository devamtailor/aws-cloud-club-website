import { motion } from "framer-motion";
import { cardHover } from "../../animations/variants";
import type { Announcement } from "../../types/announcement";
import { formatDisplayDate } from "../../utils/date";

interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit?: (announcement: Announcement) => void;
  onDelete?: (announcement: Announcement) => void;
  adminMode?: boolean;
}

export const AnnouncementCard = ({ announcement, onEdit, onDelete, adminMode }: AnnouncementCardProps) => {
  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="glass-card overflow-hidden rounded-2xl border border-white/10"
    >
      <img src={announcement.posterUrl} alt={announcement.title} className="h-48 w-full object-cover" />
      <div className="space-y-3 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300">{formatDisplayDate(announcement.eventDate)}</p>
        <h3 className="text-lg font-semibold text-white">{announcement.title}</h3>
        <p className="line-clamp-3 text-sm text-slate-300">{announcement.description}</p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <a
            href={announcement.ctaUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-[#FF9900] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            {announcement.ctaLabel}
          </a>
          {adminMode && (
            <>
              <button
                type="button"
                onClick={() => onEdit?.(announcement)}
                className="rounded-md border border-white/20 px-4 py-2 text-xs font-medium text-slate-100 transition hover:border-[#FF9900]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete?.(announcement)}
                className="rounded-md border border-red-300/30 px-4 py-2 text-xs font-medium text-red-200 transition hover:border-red-300"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
};
