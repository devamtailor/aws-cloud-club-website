import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { Announcement, AnnouncementPayload } from "../../types/announcement";

interface AnnouncementFormProps {
  initialValue?: Announcement | null;
  onSubmit: (payload: AnnouncementPayload) => Promise<void>;
  submitting: boolean;
}

export const AnnouncementForm = ({ initialValue, onSubmit, submitting }: AnnouncementFormProps) => {
  const [title, setTitle] = useState(initialValue?.title ?? "");
  const [description, setDescription] = useState(initialValue?.description ?? "");
  const [eventDate, setEventDate] = useState(initialValue ? initialValue.eventDate.slice(0, 10) : "");
  const [ctaLabel, setCtaLabel] = useState(initialValue?.ctaLabel ?? "");
  const [ctaUrl, setCtaUrl] = useState(initialValue?.ctaUrl ?? "");
  const [poster, setPoster] = useState<File | undefined>(undefined);

  const heading = useMemo(() => (initialValue ? "Edit Announcement" : "Create Announcement"), [initialValue]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit({
      title,
      description,
      eventDate,
      ctaLabel,
      ctaUrl,
      poster
    });

    if (!initialValue) {
      setTitle("");
      setDescription("");
      setEventDate("");
      setCtaLabel("");
      setCtaUrl("");
      setPoster(undefined);
      event.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-4 rounded-2xl border border-white/10 p-5">
      <h3 className="text-lg font-semibold text-white">{heading}</h3>
      <input
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-[#FF9900]"
      />
      <textarea
        required
        rows={4}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-[#FF9900]"
      />
      <div className="grid gap-3 md:grid-cols-2">
        <input
          required
          type="date"
          value={eventDate}
          onChange={(event) => setEventDate(event.target.value)}
          className="rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-[#FF9900]"
        />
        <input
          required
          value={ctaLabel}
          onChange={(event) => setCtaLabel(event.target.value)}
          placeholder="CTA label"
          className="rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-[#FF9900]"
        />
      </div>
      <input
        required
        type="url"
        value={ctaUrl}
        onChange={(event) => setCtaUrl(event.target.value)}
        placeholder="https://"
        className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none focus:border-[#FF9900]"
      />
      <input
        type="file"
        accept="image/*"
        required={!initialValue}
        onChange={(event) => {
          const file = event.target.files?.[0];
          setPoster(file);
        }}
        className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 outline-none focus:border-[#FF9900]"
      />
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-[#FF9900] px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Saving..." : initialValue ? "Update" : "Create"}
      </button>
    </form>
  );
};
