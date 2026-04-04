import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, staggerContainer } from "../animations/variants";
import { GlassCard } from "../components/common/GlassCard";

interface Department {
  name: string;
  lead: string;
  coLead: string;
  members: Member[];
  focus: string;
}

interface Member {
  name: string;
  role?: string;
  photo?: string;
}

const departments: Department[] = [
  {
    name: "Tech Department",
    lead: ":Chaitanya Sambhaji Bhosale",
    coLead: "Devam Tailor",
    members: [
      { name: "Prince Vaya", photo: "/team/prince.jpeg" },
      { name: "Vedansh Dhomane",photo: "/team/vedansh.jpeg" },
      { name: "Shitanshu Poreddiwar",photo: "/team/member-1.jpg"  },
      { name: " Vidhi Krishna Mandhana",photo: "/team/member-1.jpg"  },
      { name: "Nikhil Kumar Baranwal",photo: "/team/member-1.jpg" },
      { name: "Shivam Gopani",photo: "/team/member-1.jpg" },
      { name: "Garv Iyengar",photo: "/team/member-1.jpg" }
    ],
    focus: "Running hands-on AWS labs, guiding technical projects, and supporting peers with cloud queries."
  },
  {
    name: "Management Department",
    lead: "Operations Lead",
    coLead: "Co-Lead",
    members: [
      { name: "Member 1", role: "Operations" },
      { name: "Member 2", role: "Events" },
      { name: "Member 3", role: "Coordination" },
      { name: "Member 4" },
      { name: "Member 5" },
      { name: "Member 6" },
      { name: "Member 7" }
    ],
    focus: "Organizing events, handling logistics, and ensuring smooth execution of workshops and hackathons."
  },
  {
    name: "Social Media Department",
    lead: "Community Manager",
    coLead: "Co-Lead",
    members: [
      { name: "Member 1", role: "Content" },
      { name: "Member 2", role: "Design" },
      { name: "Member 3", role: "Video" },
      { name: "Member 4" },
      { name: "Member 5" },
      { name: "Member 6" },
      { name: "Member 7" }
    ],
    focus: "Designing posts, managing Instagram/LinkedIn, and showcasing student achievements and events."
  },
  {
    name: "Public Relations (PR) Department",
    lead: "PR Lead",
    coLead: "Co-Lead",
    members: [
      { name: "Member 1", role: "Partnerships" },
      { name: "Member 2", role: "Outreach" },
      { name: "Member 3", role: "Industry Connect" },
      { name: "Member 4" },
      { name: "Member 5" },
      { name: "Member 6" },
      { name: "Member 7" }
    ],
    focus: "Networking with industry mentors, handling collaborations, and promoting AWS Cloud Club DYPiu."
  }
];

export const MeetTeamPage = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-5 py-20 lg:px-8">
        <h1 className="text-4xl font-bold text-white md:text-5xl">Meet the Team</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          Meet the passionate students behind AWS Cloud Club DYPiu, organized by department.
        </p>
      </section>

      <section className="mx-auto w-full max-w-4xl px-5 py-12 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          {departments.map((dept, idx) => (
            <motion.div key={dept.name} variants={fadeUp}>
              <GlassCard onClick={() => setExpanded(expanded === idx ? null : idx)} className="cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{dept.name}</h3>
                    <p className="text-sm text-slate-300">
                      {dept.lead} • {dept.coLead}
                    </p>
                  </div>
                  <span className="text-orange-300">{expanded === idx ? "−" : "+"}</span>
                </div>

                {expanded === idx && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-3 border-t border-white/10 pt-4">
                    <p className="text-slate-300">{dept.focus}</p>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Members</p>
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {dept.members.map((member) => (
                          <div key={`${dept.name}-${member.name}`} className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-900/40 p-3">
                            {member.photo ? (
                              <img
                                src={member.photo}
                                alt={member.name}
                                className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-400/30"
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-200">
                                {member.name.charAt(0).toUpperCase()}
                              </div>
                            )}

                            <div>
                              <p className="text-sm font-medium text-slate-100">{member.name}</p>
                              {member.role && <p className="text-xs text-slate-400">{member.role}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
