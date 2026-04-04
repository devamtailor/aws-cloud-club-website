import { useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "../components/common/GlassCard";
import { adminService } from "../services/adminService";
import { useAuthStore } from "../store/authStore";

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const setCredentials = useAuthStore((state) => state.setCredentials);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const data = await adminService.login({ email, password });
      setCredentials(data.token, data.admin);
      toast.success("Welcome back");
      navigate("/admin/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[75vh] w-full max-w-5xl items-center justify-center px-5 py-16 lg:px-8">
      <GlassCard className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-300">Sign in to manage announcements.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Admin email"
            className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-[#FF9900]"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-[#FF9900]"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-[#FF9900] px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </GlassCard>
    </main>
  );
};
