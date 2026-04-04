import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, staggerContainer } from "../animations/variants";
import { GlassCard } from "../components/common/GlassCard";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "What is AWS Cloud Club DYPiu?",
    a: "AWS Cloud Club DYPiu is a student-led hub where we learn AWS through hands-on labs, real infrastructure projects, and mentorship. We focus on practical cloud skills and career growth."
  },
  {
    q: "Do I need prior cloud experience to join?",
    a: "Not at all! We welcome absolute beginners. Our sessions start from the basics and progress at a pace that works for everyone. Curiosity is the only requirement."
  },
  {
    q: "How do I become a member?",
    a: "Click the 'Join Us' button on this site, fill out the quick form, and you'll be added to our Slack/Discord community. Then start attending events and collaborating with peers."
  },
  {
    q: "How does this help my career?",
    a: "We offer resume reviews, mock interviews, AWS certification prep, internship leads, and real project experience. Many of our members have landed internships and jobs through the club."
  }
];

export const FAQPage = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-5 py-20 lg:px-8">
        <h1 className="text-4xl font-bold text-white md:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          Everything you need to know about AWS Cloud Club DYPiu.
        </p>
      </section>

      <section className="mx-auto w-full max-w-4xl px-5 py-12 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div key={faq.q} variants={fadeUp}>
              <GlassCard onClick={() => setExpanded(expanded === idx ? -1 : idx)} className="cursor-pointer">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="flex-1 font-semibold text-white">{faq.q}</h3>
                  <span className="flex-shrink-0 text-orange-300">{expanded === idx ? "−" : "+"}</span>
                </div>

                {expanded === idx && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-slate-300">{faq.a}</p>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
};
