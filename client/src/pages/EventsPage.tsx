import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeUp, staggerContainer } from "../animations/variants";
import { AnnouncementCard } from "../components/announcements/AnnouncementCard";
import { AnnouncementSkeleton } from "../components/announcements/AnnouncementSkeleton";
import { GlassCard } from "../components/common/GlassCard";
import { announcementService } from "../services/announcementService";
import type { Announcement } from "../types/announcement";

const upcomingEvents = [
  {
    id: "1",
    title: "Kickoff: Welcome to AWS Cloud Club DYPiu",
    date: "15th April",
    time: "4:00 PM",
    location: "Innovation Lab, DYPiu"
  },
  {
    id: "2",
    title: "Deploy Your First Website on AWS",
    date: "25th April",
    time: "3:30 PM - 5:00 PM",
    location: "Cloud Lab, DYPiu"
  }
];

export const EventsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await announcementService.getAll();
        setAnnouncements(data);
      } finally {
        setLoading(false);
      }
    };

    void fetchAnnouncements();
  }, []);

  return (
    <main className="pb-16">
      <section className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-8 rounded-full bg-linear-to-r from-orange-500 to-transparent"></div>
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-orange-400">Community</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Events & Updates</h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Upcoming events are scheduled club sessions. Latest announcements are general updates and notices from the club.
          </p>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-5 md:grid-cols-2">
          {upcomingEvents.map((event) => (
            <motion.div key={event.id} variants={fadeUp}>
              <GlassCard className="h-full flex flex-col hover:border-orange-500/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-orange-500/20 to-orange-600/10">
                    <span className="text-xl">📅</span>
                  </div>
                  <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">Upcoming</span>
                </div>
                <h3 className="grow text-lg font-semibold text-white">{event.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-400 border-t border-white/10 pt-4">
                  <p className="flex items-center gap-2"><span className="text-orange-400">📅</span>{event.date} at {event.time}</p>
                  <p className="flex items-center gap-2"><span className="text-orange-400">📍</span>{event.location}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-8 rounded-full bg-linear-to-r from-orange-500 to-transparent"></div>
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-orange-400">Updates</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Announcements</h2>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading && [1, 2, 3].map((value) => <AnnouncementSkeleton key={value} />)}
          {!loading && announcements.map((item) => <AnnouncementCard key={item.id} announcement={item} />)}
          {!loading && announcements.length === 0 && (
            <GlassCard className="sm:col-span-2 lg:col-span-3 text-center py-12">
              <p className="text-slate-400">No announcements yet. Check back soon!</p>
            </GlassCard>
          )}
        </motion.div>
      </section>
    </main>
  );
};