export const Footer = () => {
  return (
    <footer className="border-t border-white/8 bg-gradient-to-b from-[#0f172a] to-[#0b1220]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 lg:px-8">
        {/* Main grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span className="text-lg">☁️</span>
              </div>
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-orange-400">AWS</p>
                <p className="text-sm font-semibold text-white -mt-1">Cloud Club</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Empowering students through hands-on cloud computing, networking, and real-world AWS projects.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-orange-500/20 text-slate-500 hover:text-orange-400 transition-all group">
                <span className="text-lg">in</span>
              </a>
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-orange-500/20 text-slate-500 hover:text-orange-400 transition-all">
                <span className="text-lg">📷</span>
              </a>
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-orange-500/20 text-slate-500 hover:text-orange-400 transition-all">
                <span className="text-lg">🐙</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
              <p className="font-semibold text-white uppercase text-xs tracking-widest">Quick Links</p>
            </div>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="text-slate-400 hover:text-orange-400 transition duration-200">About Us</a></li>
              <li><a href="/" className="text-slate-400 hover:text-orange-400 transition duration-200">Upcoming Events</a></li>
              <li><a href="/" className="text-slate-400 hover:text-orange-400 transition duration-200">Meet the Team</a></li>
              <li><a href="/faq" className="text-slate-400 hover:text-orange-400 transition duration-200">FAQ</a></li>
            </ul>
          </div>

          {/* Learning Resources */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
              <p className="font-semibold text-white uppercase text-xs tracking-widest">Resources</p>
            </div>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition duration-200">AWS Certification</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition duration-200">Project Guides</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition duration-200">Blog & Insights</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition duration-200">AWS Free Tier</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
              <p className="font-semibold text-white uppercase text-xs tracking-widest">Support</p>
            </div>
            <ul className="space-y-3 text-sm">
              <li><a href="/join" className="text-slate-400 hover:text-orange-400 transition duration-200">Get Involved</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition duration-200">Contact Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition duration-200">Report Issue</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition duration-200">Feedback</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} AWS Cloud Club, DY Patil International University. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <a href="#" className="hover:text-orange-400 transition">Privacy Policy</a>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-orange-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
