import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fadeUp, staggerContainer } from "../animations/variants";
import { AnnouncementCard } from "../components/announcements/AnnouncementCard";
import { AnnouncementSkeleton } from "../components/announcements/AnnouncementSkeleton";
import { GlassCard } from "../components/common/GlassCard";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
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

const whyUsTeaser = [
  { title: "Learn by Doing", icon: "⚙️" },
  { title: "Find Your Tribe", icon: "👥" },
  { title: "Career-Ready", icon: "🚀" }
];

const teamHighlight = [
  { role: "Club Lead", initials: "CL" },
  { role: "Technical Lead", initials: "TL" },
  { role: "Development Lead", initials: "DL" },
  { role: "Operations Lead", initials: "OL" },
  { role: "Community Manager", initials: "CM" }
];

export const HomePage = () => {
  const navigate = useNavigate();
  const aboutSection = useInViewAnimation<HTMLDivElement>(0.25);

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
      <section className="hero-grid relative overflow-hidden px-4 pt-32 pb-24 lg:px-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl"></div>
          <div className="absolute -bottom-20 right-0 w-96 h-96 rounded-full bg-gradient-to-tl from-blue-500/5 to-transparent blur-3xl"></div>
        </div>

        <div className="mx-auto w-full max-w-7xl relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-orange-400">AWS Cloud Club</p>
            </motion.div>
            
            <motion.h1
              variants={fadeUp}
              className="mt-3 text-5xl md:text-7xl font-bold leading-tight text-white"
            >
              Where curiosity meets{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                cloud computing.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-base md:text-lg text-slate-400 leading-relaxed">
              Learn AWS through hands-on projects, connect with peers, and build the skills to launch your cloud career. We're a community of builders, learners, and innovators at DY Patil International University.
            </motion.p>
            
            <motion.div variants={fadeUp} className="mt-10 flex gap-4 flex-wrap items-center">
              <button
                onClick={() => navigate("/why-us")}
                className="btn-primary"
              >
                Discover Our Mission →
              </button>
              <button
                onClick={() => navigate("/join")}
                className="btn-secondary"
              >
                View Events
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-6 md:gap-12 max-w-2xl">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-orange-400">500+</p>
                <p className="text-xs md:text-sm text-slate-400 mt-1">Members</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-orange-400">50+</p>
                <p className="text-xs md:text-sm text-slate-400 mt-1">Projects</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-orange-400">12+</p>
                <p className="text-xs md:text-sm text-slate-400 mt-1">Mentors</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-orange-400">Community</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Upcoming Events</h2>
          </div>
          <button
            onClick={() => navigate("/join")}
            className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition flex items-center gap-1"
          >
            See all events →
          </button>
        </div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 grid gap-5 md:grid-cols-2"
        >
          {upcomingEvents.map((event) => (
            <motion.div key={event.id} variants={fadeUp}>
              <GlassCard className="h-full flex flex-col hover:border-orange-500/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center">
                    <span className="text-xl">📅</span>
                  </div>
                  <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">Upcoming</span>
                </div>
                <h3 className="text-lg font-semibold text-white flex-grow">{event.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-400 border-t border-white/10 pt-4">
                  <p className="flex items-center gap-2"><span className="text-orange-400">📅</span>{event.date} at {event.time}</p>
                  <p className="flex items-center gap-2"><span className="text-orange-400">📍</span>{event.location}</p>
                </div>
                <button className="mt-4 w-full btn-primary text-sm py-2">
                  Register Now
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Us Section */}
      <motion.section
        ref={aboutSection.ref}
        initial={{ opacity: 0, y: 30 }}
        animate={aboutSection.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.55 }}
        className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8"
      >
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-orange-400">Why Join</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">More than just a club</h2>
              <p className="mt-2 text-slate-400">We're a launchpad for your cloud career</p>
            </div>
            <button
              onClick={() => navigate("/why-us")}
              className="hidden md:block text-sm font-semibold text-orange-400 hover:text-orange-300 transition flex-shrink-0"
            >
              Learn more →
            </button>
          </div>
        </div>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-5 md:grid-cols-3">
          {whyUsTeaser.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <GlassCard className="text-center h-full hover:border-orange-500/50 transition">
                <div className="text-5xl">{item.icon}</div>
                <h3 className="mt-4 font-semibold text-white text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">Structured curriculum designed for real-world success</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Announcements Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-orange-400">Updates</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Announcements</h2>
          </div>
        </div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {loading && [1, 2, 3].map((value) => <AnnouncementSkeleton key={value} />)}
          {!loading && announcements.map((item) => <AnnouncementCard key={item.id} announcement={item} />)}
          {!loading && announcements.length === 0 && (
            <GlassCard className="sm:col-span-2 lg:col-span-3 text-center py-12">
              <p className="text-slate-400">No announcements yet. Check back soon!</p>
            </GlassCard>
          )}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-orange-400">Leadership</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Our Team</h2>
          </div>
          <button
            onClick={() => navigate("/team")}
            className="hidden md:block text-sm font-semibold text-orange-400 hover:text-orange-300 transition"
          >
            Full team →
          </button>
        </div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {teamHighlight.map((member) => (
            <motion.div key={member.role} variants={fadeUp}>
              <GlassCard className="text-center h-full hover:border-orange-500/50">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/30 to-orange-600/10">
                  <span className="text-lg font-bold text-orange-400">{member.initials}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{member.role}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <GlassCard className="relative overflow-hidden py-16 px-8 lg:py-20">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to join the community?</h2>
            <p className="mt-4 max-w-2xl text-slate-300 mx-auto text-lg">
              Get access to exclusive events, mentorship from cloud professionals, AWS credits, and a supportive community of builders and learners.
            </p>
            <button
              onClick={() => navigate("/join")}
              className="mt-8 btn-primary text-base"
            >
              Join Us Today →
            </button>
          </div>
        </GlassCard>
      </section>
    </main>
  );
};
