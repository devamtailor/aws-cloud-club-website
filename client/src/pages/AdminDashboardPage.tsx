import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AnnouncementCard } from "../components/announcements/AnnouncementCard";
import { AnnouncementForm } from "../components/announcements/AnnouncementForm";
import { GlassCard } from "../components/common/GlassCard";
import { announcementService } from "../services/announcementService";
import { useAuthStore } from "../store/authStore";
import type { Announcement, AnnouncementPayload } from "../types/announcement";

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { token, admin, logout } = useAuthStore();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await announcementService.getAll();
        setAnnouncements(data);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [navigate, token]);

  const dashboardTitle = useMemo(() => {
    if (!admin?.email) {
      return "Admin Dashboard";
    }

    return `Admin Dashboard - ${admin.email}`;
  }, [admin?.email]);

  const handleCreateOrUpdate = async (payload: AnnouncementPayload) => {
    try {
      setSubmitting(true);

      if (editing) {
        const updated = await announcementService.update(editing.id, payload);
        setAnnouncements((current) => current.map((item) => (item.id === editing.id ? updated : item)));
        setEditing(null);
        toast.success("Announcement updated");
        return;
      }

      const created = await announcementService.create(payload);
      setAnnouncements((current) => [created, ...current]);
      toast.success("Announcement created");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: Announcement) => {
    const shouldDelete = window.confirm(`Delete announcement: ${item.title}?`);

    if (!shouldDelete) {
      return;
    }

    await announcementService.remove(item.id);
    setAnnouncements((current) => current.filter((entry) => entry.id !== item.id));
    toast.success("Announcement deleted");
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Control Panel</h2>
            <p className="mt-2 text-sm text-slate-300">Manage all home page announcements.</p>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="mt-4 w-full rounded-md border border-white/20 px-3 py-2 text-sm text-slate-100"
            >
              New Announcement
            </button>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
              className="mt-2 w-full rounded-md border border-red-300/30 px-3 py-2 text-sm text-red-200"
            >
              Logout
            </button>
          </GlassCard>
        </aside>

        <section className="space-y-6">
          <h1 className="text-2xl font-semibold text-white">{dashboardTitle}</h1>

          <AnnouncementForm initialValue={editing} onSubmit={handleCreateOrUpdate} submitting={submitting} />

          <div className="grid gap-5 md:grid-cols-2">
            {!loading &&
              announcements.map((item) => (
                <AnnouncementCard
                  key={item.id}
                  announcement={item}
                  adminMode
                  onEdit={(value) => setEditing(value)}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
};
