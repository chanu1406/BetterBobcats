import { format } from "date-fns";

export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface ParsedMeetingSlot {
  day: DayOfWeek;
  start?: string;
  end?: string;
  location?: string;
}

const DAY_ABBREV_MAP: Record<string, DayOfWeek> = {
  mon: "mon",
  monday: "mon",
  tue: "tue",
  tuesday: "tue",
  wed: "wed",
  wednesday: "wed",
  thu: "thu",
  thursday: "thu",
  fri: "fri",
  friday: "fri",
  sat: "sat",
  saturday: "sat",
  sun: "sun",
  sunday: "sun",
};

function parseTimePart(t: string): string {
  if (!t || !/^\d{1,2}(:\d{2})?(\s*(am|pm))?$/i.test(t.trim())) return "";
  const trimmed = t.trim();
  const ampm = /\s*(am|pm)\s*$/i.exec(trimmed);
  let hours: number;
  let mins = 0;
  const numPart = trimmed.replace(/\s*(am|pm)\s*$/i, "").trim();
  if (numPart.includes(":")) {
    [hours, mins] = numPart.split(":").map(Number);
  } else {
    hours = parseInt(numPart, 10);
  }
  if (ampm) {
    const isPm = ampm[1].toLowerCase() === "pm";
    if (hours === 12) hours = isPm ? 12 : 0;
    else if (isPm) hours += 12;
  }
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

export function parseMeetingDays(
  value: string | null | undefined,
  location?: string | null
): ParsedMeetingSlot[] {
  if (!value?.trim()) return [];
  const result: ParsedMeetingSlot[] = [];
  const seen = new Set<string>();

  value.split(",").forEach((part) => {
    const trimmed = part.trim();
    if (!trimmed) return;

    if (trimmed.includes(":")) {
      const colonIdx = trimmed.indexOf(":");
      const dayStr = trimmed.slice(0, colonIdx).trim().toLowerCase();
      const timePart = trimmed.slice(colonIdx + 1).trim();

      const day = DAY_ABBREV_MAP[dayStr];
      if (!day) return;

      const key = day;
      if (seen.has(key)) {
        const existing = result.find((r) => r.day === day);
        if (existing && timePart) {
          if (timePart.includes("-")) {
            const [start, end] = timePart.split("-").map((s) => s.trim());
            existing.start = existing.start || parseTimePart(start);
            existing.end = existing.end || parseTimePart(end);
          }
        }
        return;
      }
      seen.add(key);

      const slot: ParsedMeetingSlot = { day };
      if (timePart) {
        if (timePart.includes("-")) {
          const [start, end] = timePart.split("-").map((s) => s.trim());
          slot.start = parseTimePart(start);
          slot.end = parseTimePart(end);
        } else {
          slot.start = parseTimePart(timePart);
        }
      }
      if (location) slot.location = location.replace(/_/g, " ");
      result.push(slot);
    } else {
      const dayStr = trimmed.toLowerCase();
      const day = DAY_ABBREV_MAP[dayStr];
      if (!day || seen.has(day)) return;
      seen.add(day);
      result.push({
        day,
        ...(location && { location: location.replace(/_/g, " ") }),
      });
    }
  });

  return result;
}

export function formatTimeForDisplay(hhmm: string): string {
  if (!hhmm || !/^\d{1,2}:\d{2}$/.test(hhmm)) return hhmm;
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")}${ampm}`;
}

/**
 * If the URL is a supported video (YouTube or Vimeo), return the embed URL.
 * Otherwise return null (caller should show a link instead).
 */
export function getVideoEmbedUrl(url: string): string | null {
  if (!url?.trim()) return null;
  const u = url.trim();
  // YouTube: watch, youtu.be, embed
  const ytWatch = /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/.exec(u);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
  const ytShort = /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/.exec(u);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
  const ytEmbed = /youtube\.com\/embed\/[a-zA-Z0-9_-]{11}/.test(u);
  if (ytEmbed) return u.startsWith("http") ? u : `https://${u}`;
  // Vimeo
  const vimeo = /vimeo\.com\/(?:video\/)?(\d+)/.exec(u);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

/**
 * Normalize a URL so it can be used in img src or links.
 * Expects a full absolute URL (e.g. from Supabase Storage or any https host).
 *
 * Supported input:
 * - https://example.com/image.jpg  → unchanged
 * - http://example.com/image.jpg   → unchanged
 * - //example.com/image.jpg        → https://example.com/image.jpg
 * - example.com/image.jpg          → https://example.com/image.jpg
 *
 * Does NOT support relative paths like "banner.jpg" or "/uploads/x.jpg" —
 * those would become invalid (https://banner.jpg). Use a full URL including
 * the domain (e.g. from your image host or Supabase Storage public URL).
 */
export function ensureUrl(url: string): string {
  if (!url?.trim()) return "";
  const trimmed = url.trim();
  if (/^https:\/\//i.test(trimmed)) return trimmed;
  if (/^http:\/\//i.test(trimmed)) return trimmed;
  if (/^\/\//.test(trimmed)) return `https:${trimmed}`;
  return `https://${trimmed}`;
}

function formatTimePart(t: string): string {
  if (!t || !/^\d{1,2}:\d{2}$/.test(t)) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")}${ampm}`;
}

export function formatMeetingDays(value: string): string {
  if (!value?.trim()) return "";
  return value
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed) return "";
      if (trimmed.includes(":")) {
        const colonIdx = trimmed.indexOf(":");
        const day = trimmed.slice(0, colonIdx).trim();
        const timePart = trimmed.slice(colonIdx + 1).trim();
        if (!timePart) return day;
        if (timePart.includes("-")) {
          const [start, end] = timePart.split("-").map((s) => s.trim());
          const s = formatTimePart(start);
          const e = formatTimePart(end);
          if (s && e) return `${day} ${s} – ${e}`;
          if (s) return `${day} ${s}`;
        } else if (formatTimePart(timePart)) {
          return `${day} ${formatTimePart(timePart)}`;
        }
        return day;
      }
      return trimmed;
    })
    .filter(Boolean)
    .join(", ");
}

export function formatDues(amountCents: number, frequency: string): string {
  const dollars = amountCents / 100;
  const freq =
    frequency === "one_time"
      ? "one-time"
      : frequency === "semesterly"
        ? "per semester"
        : frequency === "yearly"
          ? "per year"
          : "";
  return freq ? `$${dollars} ${freq}` : `$${dollars}`;
}

export function formatEventDateTime(startsAt: string, endsAt: string | null): string {
  try {
    const start = new Date(startsAt);
    const end = endsAt ? new Date(endsAt) : null;
    const dateStr = format(start, "EEE, MMM d");
    const timeStr = format(start, "h:mm a");
    if (end && format(end, "yyyy-MM-dd") !== format(start, "yyyy-MM-dd")) {
      return `${dateStr}, ${timeStr} – ${format(end, "EEE, MMM d, h:mm a")}`;
    }
    if (end) {
      return `${dateStr}, ${timeStr} – ${format(end, "h:mm a")}`;
    }
    return `${dateStr} at ${timeStr}`;
  } catch {
    return startsAt;
  }
}
