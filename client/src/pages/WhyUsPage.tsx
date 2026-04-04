import { motion } from "framer-motion";
import { GlassCard } from "../components/common/GlassCard";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

const whyUsItems = [
  {
    title: "Learn by Doing",
    description:
      "Spin up real AWS infrastructure, deploy apps, and break things safely. Every session is a lab, not a lecture.",
    icon: "⚙️",
    color: "from-orange-500/20 to-orange-600/10"
  },
  {
    title: "Find Your Tribe",
    description:
      "Late-night debugging, shared wins on certification day, and a group chat that actually helps. Peers become collaborators.",
    icon: "👥",
    color: "from-blue-500/20 to-blue-600/10"
  },
  {
    title: "Career-Ready",
    description: "Resume reviews, mock interviews, AWS certifications, and internship leads. We share opportunities.",
    icon: "🚀",
    color: "from-purple-500/20 to-purple-600/10"
  }
];

export const WhyUsPage = () => {
  const section = useInViewAnimation<HTMLDivElement>(0.2);
  const cardsSection = useInViewAnimation<HTMLDivElement>(0.15);

  return (
    <main className="pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-32 pb-24 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tl from-blue-500/5 to-transparent blur-3xl"></div>
        </div>

        <div className="mx-auto w-full max-w-7xl relative z-10">
          <motion.div
            ref={section.ref}
            initial={{ opacity: 0, y: 20 }}
            animate={section.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-orange-400">Our Mission</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              More than just a{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                club
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-400 leading-relaxed">
              We're building the cloud community we wished existed when we started. A space where beginners feel welcome, learners become leaders, and everyone has the tools to launch their career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Us Cards */}
      <section ref={cardsSection.ref} className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={cardsSection.isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {whyUsItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={cardsSection.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col hover:border-orange-500/50 transition">
                <div className={`h-16 w-16 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-slate-400 leading-relaxed flex-grow">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Additional Info Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-orange-400">What We Offer</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Everything you need to succeed</h2>
            <div className="mt-8 space-y-4">
              {[
                "Hands-on technical workshops every week",
                "1-on-1 mentorship from AWS certified professionals",
                "AWS Free Tier credits and learning resources",
                "Career guidance and internship opportunities",
                "Peer networking and collaboration",
                "Certification prep and study groups"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Active Members", value: "500+" },
              { label: "Certifications Earned", value: "150+" },
              { label: "Projects Completed", value: "50+" },
              { label: "Mentor Network", value: "12+" }
            ].map((stat, idx) => (
              <GlassCard key={idx} className="text-center border-orange-500/20">
                <p className="text-3xl font-bold text-orange-400">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};
