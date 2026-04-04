import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { PageTransition } from "./components/common/PageTransition";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { HomePage } from "./pages/HomePage";
import { EventsPage } from "./pages/EventsPage";
import { WhyUsPage } from "./pages/WhyUsPage";
import { MeetTeamPage } from "./pages/MeetTeamPage";
import { FAQPage } from "./pages/FAQPage";
import { JoinUsPage } from "./pages/JoinUsPage";

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/team" element={<MeetTeamPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/join" element={<JoinUsPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <Toaster position="top-right" toastOptions={{ style: { background: "#0f172a", color: "#f8fafc" } }} />
    </div>
  );
};

export default App;
