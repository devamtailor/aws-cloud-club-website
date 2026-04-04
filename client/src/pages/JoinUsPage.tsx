import { motion } from "framer-motion";
import { useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { fadeUp, staggerContainer } from "../animations/variants";
import { GlassCard } from "../components/common/GlassCard";

const perks = [
  "Free AWS credits",
  "Priority registration for events",
  "Mentorship from club leads",
  "Showcase projects",
  "Supportive peer community"
];

export const JoinUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      // For now, just show a success toast
      // In production, send to a mailing list or backend
      toast.success(`Welcome ${name}! Check your email for next steps.`);
      setName("");
      setEmail("");
      setYear("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-5 py-20 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-white md:text-5xl">Ready to start your cloud journey?</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Learn AWS step by step with peers, apply concepts in real projects, and grow into cloud, DevOps, and modern infrastructure.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-8 lg:grid-cols-2">
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-semibold text-white">Membership Perks</h2>
            <ul className="mt-6 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-orange-300" />
                  {perk}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <GlassCard>
              <h3 className="text-xl font-semibold text-white">Join the Community</h3>
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-orange-300"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-orange-300"
                />
                <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-orange-300">
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-md bg-orange-300 px-4 py-2 font-semibold text-slate-950 disabled:opacity-70"
                >
                  {submitting ? "Joining..." : "Join the Community"}
                </button>
              </form>
              <p className="mt-4 text-xs text-slate-400">We'll add you to our Slack/Discord and send event updates.</p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 lg:px-8">
        <GlassCard className="text-center">
          <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
          <p className="mt-2 text-slate-300">Subscribe to our newsletter for workshops, certification prep, and networking events.</p>
          <div className="mt-4 flex gap-2">
            <input placeholder="your@email.com" className="flex-1 rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-orange-300" />
            <button className="rounded-md bg-orange-300 px-4 py-2 font-semibold text-slate-950">Subscribe</button>
          </div>
        </GlassCard>
      </section>
    </main>
  );
};
