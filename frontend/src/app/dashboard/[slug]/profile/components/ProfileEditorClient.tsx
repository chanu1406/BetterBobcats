"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MeetingDaysBar from "./MeetingDaysBar";
import type {
  ClubProfile,
  ClubProfileLink,
  ClubProfileMedia,
  ClubOfficerPublicProfile,
  ClubProfileLinkType,
  ClubProfileDuesFrequency,
  ClubProfileCommitmentLevel,
  ClubProfileOpenTo,
  ClubProfileRecruitingStatus,
  ClubProfileSizeRange,
  ClubProfileMeetingFrequency,
  ClubProfileMeetingLocation,
} from "@/lib/clubs";

const LINK_TYPES: ClubProfileLinkType[] = [
  "website",
  "instagram",
  "discord",
  "linkedin",
  "github",
  "linktree",
  "other",
];

interface ProfileEditorClientProps {
  clubId: string;
}

export default function ProfileEditorClient({ clubId }: ProfileEditorClientProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [profile, setProfile] = useState<ClubProfile | null>(null);
  const [links, setLinks] = useState<ClubProfileLink[]>([]);
  const [media, setMedia] = useState<ClubProfileMedia[]>([]);
  const [officers, setOfficers] = useState<ClubOfficerPublicProfile[]>([]);

  // Form state mirrors profile
  const [published, setPublished] = useState(false);
  const [tagline, setTagline] = useState("");
  const [mission, setMission] = useState("");
  const [whoFor, setWhoFor] = useState("");
  const [whatDo, setWhatDo] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [introVideoUrl, setIntroVideoUrl] = useState("");
  const [howToJoin, setHowToJoin] = useState("");
  const [duesAmountCents, setDuesAmountCents] = useState<string>("");
  const [duesFrequency, setDuesFrequency] = useState<
    ClubProfileDuesFrequency | "none"
  >("none");
  const [applicationRequired, setApplicationRequired] = useState(false);
  const [applicationUrl, setApplicationUrl] = useState("");
  const [commitmentLevel, setCommitmentLevel] = useState<
    ClubProfileCommitmentLevel | ""
  >("");
  const [openTo, setOpenTo] = useState<ClubProfileOpenTo | "">("");
  const [openToAllMajors, setOpenToAllMajors] = useState(false);
  const [contactEmailGeneral, setContactEmailGeneral] = useState("");
  const [awards, setAwards] = useState("");
  const [partnersSponsors, setPartnersSponsors] = useState("");
  const [supportedCareers, setSupportedCareers] = useState("");
  const [skillsDeveloped, setSkillsDeveloped] = useState("");
  const [pairsWellWithCourses, setPairsWellWithCourses] = useState("");
  const [accessibilityNotes, setAccessibilityNotes] = useState("");
  const [inclusivityStatement, setInclusivityStatement] = useState("");
  const [codeOfConductUrl, setCodeOfConductUrl] = useState("");
  const [yearsActive, setYearsActive] = useState<string>("");
  const [recruitingStatus, setRecruitingStatus] = useState<
    ClubProfileRecruitingStatus | ""
  >("");
  const [clubSizeRange, setClubSizeRange] = useState<
    ClubProfileSizeRange | ""
  >("");
  const [meetingFrequency, setMeetingFrequency] = useState<
    ClubProfileMeetingFrequency | ""
  >("");
  const [meetingLocation, setMeetingLocation] = useState<
    ClubProfileMeetingLocation | ""
  >("");
  const [meetingDays, setMeetingDays] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [upcomingHighlights, setUpcomingHighlights] = useState("");
  const [recognizedByUniversity, setRecognizedByUniversity] = useState(true);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [profileRes, linksRes, mediaRes, officersRes] = await Promise.all([
        supabase
          .from("club_profiles")
          .select("*")
          .eq("club_id", clubId)
          .maybeSingle(),
        supabase
          .from("club_profile_links")
          .select("*")
          .eq("club_id", clubId)
          .order("sort_order"),
        supabase
          .from("club_profile_media")
          .select("*")
          .eq("club_id", clubId)
          .order("sort_order"),
        supabase
          .from("club_officer_public_profiles")
          .select("*")
          .eq("club_id", clubId)
          .order("sort_order"),
      ]);

      if (profileRes.error) throw profileRes.error;
      if (linksRes.error) throw linksRes.error;
      if (mediaRes.error) throw mediaRes.error;
      if (officersRes.error) throw officersRes.error;

      let p = profileRes.data as ClubProfile | null;
      if (!p) {
        const { data: inserted, error: insertErr } = await supabase
          .from("club_profiles")
          .insert({ club_id: clubId, published: false })
          .select()
          .single();
        if (insertErr) throw insertErr;
        p = inserted as ClubProfile;
      }

      setProfile(p);
      setPublished(p.published);
      setTagline(p.tagline ?? "");
      setMission(p.mission ?? "");
      setWhoFor(p.who_for ?? "");
      setWhatDo(p.what_do ?? "");
      setThumbnailUrl(p.thumbnail_url ?? "");
      setIntroVideoUrl(p.intro_video_url ?? "");
      setHowToJoin(p.how_to_join ?? "");
      setDuesAmountCents(
        p.dues_amount_cents != null ? String(p.dues_amount_cents) : ""
      );
      setDuesFrequency(
        (p.dues_frequency as ClubProfileDuesFrequency) ?? "none"
      );
      setApplicationRequired(p.application_required ?? false);
      setApplicationUrl(p.application_url ?? "");
      setCommitmentLevel((p.commitment_level as ClubProfileCommitmentLevel) ?? "");
      setOpenTo((p.open_to as ClubProfileOpenTo) ?? "");
      setOpenToAllMajors(p.open_to_all_majors ?? false);
      setContactEmailGeneral(p.contact_email_general ?? "");
      setAwards(p.awards ?? "");
      setPartnersSponsors(p.partners_sponsors ?? "");
      setSupportedCareers(p.supported_careers?.join(", ") ?? "");
      setSkillsDeveloped(p.skills_developed?.join(", ") ?? "");
      setPairsWellWithCourses(p.pairs_well_with_courses ?? "");
      setAccessibilityNotes(p.accessibility_notes ?? "");
      setInclusivityStatement(p.inclusivity_statement ?? "");
      setCodeOfConductUrl(p.code_of_conduct_url ?? "");
      setYearsActive(
        p.years_active != null ? String(p.years_active) : ""
      );
      setRecruitingStatus(
        (p.recruiting_status as ClubProfileRecruitingStatus) ?? ""
      );
      setClubSizeRange((p.club_size_range as ClubProfileSizeRange) ?? "");
      setMeetingFrequency(
        (p.meeting_frequency as ClubProfileMeetingFrequency) ?? ""
      );
      setMeetingLocation(
        (p.meeting_location as ClubProfileMeetingLocation) ?? ""
      );
      setMeetingDays(p.meeting_days ?? "");
      setOutcomes(p.outcomes ?? "");
      setUpcomingHighlights(p.upcoming_highlights ?? "");
      setRecognizedByUniversity(p.recognized_by_university ?? true);
      setLinks((linksRes.data || []) as ClubProfileLink[]);
      setMedia((mediaRes.data || []) as ClubProfileMedia[]);
      setOfficers((officersRes.data || []) as ClubOfficerPublicProfile[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [clubId]);

  const saveProfile = async (overrides?: Partial<{ published: boolean }>) => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        published: overrides?.published ?? published,
        tagline: tagline || null,
        mission: mission || null,
        who_for: whoFor || null,
        what_do: whatDo || null,
        thumbnail_url: thumbnailUrl || null,
        intro_video_url: introVideoUrl || null,
        how_to_join: howToJoin || null,
        dues_amount_cents: (() => {
          if (!duesAmountCents) return null;
          const cents = Math.round(parseFloat(duesAmountCents) * 100);
          return Number.isNaN(cents) ? null : cents;
        })(),
        dues_frequency:
          duesFrequency === "none" || !duesFrequency ? null : duesFrequency,
        application_required: applicationRequired,
        application_url: applicationUrl || null,
        commitment_level: commitmentLevel || null,
        open_to: openTo || null,
        open_to_all_majors: openToAllMajors,
        contact_email_general: contactEmailGeneral || null,
        awards: awards || null,
        partners_sponsors: partnersSponsors || null,
        supported_careers: supportedCareers
          ? supportedCareers.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        skills_developed: skillsDeveloped
          ? skillsDeveloped.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        pairs_well_with_courses: pairsWellWithCourses || null,
        accessibility_notes: accessibilityNotes || null,
        inclusivity_statement: inclusivityStatement || null,
        code_of_conduct_url: codeOfConductUrl || null,
        years_active: yearsActive
          ? (() => {
              const n = parseInt(yearsActive, 10);
              return Number.isNaN(n) ? null : n;
            })()
          : null,
        recruiting_status: recruitingStatus || null,
        club_size_range: clubSizeRange || null,
        meeting_frequency: meetingFrequency || null,
        meeting_location: meetingLocation || null,
        meeting_days: meetingDays || null,
        outcomes: outcomes || null,
        upcoming_highlights: upcomingHighlights || null,
        recognized_by_university: recognizedByUniversity,
      };

      const { error: updateErr } = await supabase
        .from("club_profiles")
        .update(payload)
        .eq("club_id", clubId);

      if (updateErr) throw updateErr;
      setSuccess("Profile saved.");
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : typeof e === "object" && e !== null && "message" in e
            ? String((e as { message: unknown }).message)
            : "Failed to save profile";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const addLink = async () => {
    const { data, error: insertErr } = await supabase
      .from("club_profile_links")
      .insert({
        club_id: clubId,
        link_type: "other",
        url: "https://",
        sort_order: links.length,
      })
      .select()
      .single();
    if (insertErr) {
      setError(insertErr.message);
      return;
    }
    setLinks([...links, data as ClubProfileLink]);
  };

  const updateLink = async (
    id: string,
    updates: Partial<Pick<ClubProfileLink, "link_type" | "url" | "sort_order">>
  ) => {
    const { error: updateErr } = await supabase
      .from("club_profile_links")
      .update(updates)
      .eq("id", id);
    if (updateErr) {
      setError(updateErr.message);
      return;
    }
    setLinks(
      links.map((l) => (l.id === id ? { ...l, ...updates } : l))
    );
  };

  const removeLink = async (id: string) => {
    const { error: delErr } = await supabase
      .from("club_profile_links")
      .delete()
      .eq("id", id);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    setLinks(links.filter((l) => l.id !== id));
  };

  const addMedia = async () => {
    const { data, error: insertErr } = await supabase
      .from("club_profile_media")
      .insert({
        club_id: clubId,
        url: "https://",
        sort_order: media.length,
      })
      .select()
      .single();
    if (insertErr) {
      setError(insertErr.message);
      return;
    }
    setMedia([...media, data as ClubProfileMedia]);
  };

  const updateMedia = async (
    id: string,
    updates: Partial<Pick<ClubProfileMedia, "url" | "caption" | "sort_order">>
  ) => {
    const { error: updateErr } = await supabase
      .from("club_profile_media")
      .update(updates)
      .eq("id", id);
    if (updateErr) {
      setError(updateErr.message);
      return;
    }
    setMedia(
      media.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const removeMedia = async (id: string) => {
    const { error: delErr } = await supabase
      .from("club_profile_media")
      .delete()
      .eq("id", id);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    setMedia(media.filter((m) => m.id !== id));
  };

  const addOfficer = async () => {
    const { data, error: insertErr } = await supabase
      .from("club_officer_public_profiles")
      .insert({
        club_id: clubId,
        display_name: "",
        role: "Officer",
        sort_order: officers.length,
      })
      .select()
      .single();
    if (insertErr) {
      setError(insertErr.message);
      return;
    }
    setOfficers([...officers, data as ClubOfficerPublicProfile]);
  };

  const updateOfficer = async (
    id: string,
    updates: Partial<
      Pick<
        ClubOfficerPublicProfile,
        | "display_name"
        | "role"
        | "major"
        | "year"
        | "bio"
        | "headshot_url"
        | "sort_order"
      >
    >
  ) => {
    const { error: updateErr } = await supabase
      .from("club_officer_public_profiles")
      .update(updates)
      .eq("id", id);
    if (updateErr) {
      setError(updateErr.message);
      return;
    }
    setOfficers(
      officers.map((o) => (o.id === id ? { ...o, ...updates } : o))
    );
  };

  const removeOfficer = async (id: string) => {
    const { error: delErr } = await supabase
      .from("club_officer_public_profiles")
      .delete()
      .eq("id", id);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    setOfficers(officers.filter((o) => o.id !== id));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Loading profile...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Publish toggle */}
      <Card className={published ? "border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30" : "border-amber-300 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/30"}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${published ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"}`}>
                {published ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div>
                <CardTitle className="text-base">
                  {published ? "Profile is Live" : "Profile is in Draft Mode"}
                </CardTitle>
                <CardDescription className="text-sm mt-0.5">
                  {published 
                    ? "Your enriched profile is visible to everyone on the public club page." 
                    : "Only basic club info is shown. Toggle to publish your full profile."}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={published}
                onCheckedChange={(v) => {
                  setPublished(v);
                  saveProfile({ published: v });
                }}
              />
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${published ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200" : "bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200"}`}>
                {published ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="identity" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="identity">Identity</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Identity & story</CardTitle>
              <CardDescription>Tagline, mission, who this club is for, what you&apos;ll do</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tagline">Tagline (1 sentence)</Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Build robots, compete, and make friends"
                />
              </div>
              <div>
                <Label htmlFor="mission">Mission (2–4 sentences)</Label>
                <Textarea
                  id="mission"
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  placeholder="Describe your club's mission and goals"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="who_for">Who this club is for</Label>
                <Textarea
                  id="who_for"
                  value={whoFor}
                  onChange={(e) => setWhoFor(e.target.value)}
                  placeholder="Describe your target audience"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="what_do">What you&apos;ll do</Label>
                <Textarea
                  id="what_do"
                  value={whatDo}
                  onChange={(e) => setWhatDo(e.target.value)}
                  placeholder="Activities, meetings, events"
                  rows={3}
                />
              </div>
              <Button onClick={() => saveProfile()} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual presence</CardTitle>
              <CardDescription>Thumbnail and intro video URLs (logo/banner are managed by platform admins)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Use a full image URL starting with https:// (e.g. from Supabase Storage, Imgur, or your host). 
                  Relative paths or incomplete URLs will not load. This image is used as the club banner when no admin-set banner exists.
                </p>
              </div>
              <div>
                <Label htmlFor="intro_video">Intro video URL</Label>
                <Input
                  id="intro_video"
                  type="url"
                  value={introVideoUrl}
                  onChange={(e) => setIntroVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div>
                <Label>Media gallery</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Add photo URLs for the gallery (one per row)
                </p>
                <div className="space-y-2">
                  {media.map((m, i) => (
                    <div key={m.id} className="flex gap-2 items-center">
                      <Input
                        value={m.url}
                        onChange={(e) =>
                          updateMedia(m.id, { url: e.target.value })
                        }
                        placeholder="Image URL"
                        className="flex-1"
                      />
                      <Input
                        value={m.caption ?? ""}
                        onChange={(e) =>
                          updateMedia(m.id, { caption: e.target.value || null })
                        }
                        placeholder="Caption (optional)"
                        className="w-32"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeMedia(m.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addMedia}>
                    Add photo
                  </Button>
                </div>
              </div>
              <Button onClick={() => saveProfile()} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leadership" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Officer roster</CardTitle>
              <CardDescription>Public officer profiles (name, role, bio, headshot)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {officers.map((o) => (
                <div
                  key={o.id}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Input
                      placeholder="Display name"
                      value={o.display_name}
                      onChange={(e) =>
                        updateOfficer(o.id, { display_name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Role (e.g. President)"
                      value={o.role}
                      onChange={(e) =>
                        updateOfficer(o.id, { role: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Input
                      placeholder="Major (optional)"
                      value={o.major ?? ""}
                      onChange={(e) =>
                        updateOfficer(o.id, { major: e.target.value || null })
                      }
                    />
                    <Input
                      placeholder="Year (optional)"
                      value={o.year ?? ""}
                      onChange={(e) =>
                        updateOfficer(o.id, { year: e.target.value || null })
                      }
                    />
                  </div>
                  <Input
                    placeholder="Headshot URL (optional)"
                    value={o.headshot_url ?? ""}
                    onChange={(e) =>
                      updateOfficer(o.id, { headshot_url: e.target.value || null })
                    }
                  />
                  <Textarea
                    placeholder="Bio (optional)"
                    value={o.bio ?? ""}
                    onChange={(e) =>
                      updateOfficer(o.id, { bio: e.target.value || null })
                    }
                    rows={2}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeOfficer(o.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addOfficer}>
                Add officer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logistics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meeting & logistics</CardTitle>
              <CardDescription>
                Help students visualize commitment with meeting frequency, location, and days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Meeting frequency</Label>
                  <Select
                    value={meetingFrequency}
                    onValueChange={(v) =>
                      setMeetingFrequency(v as ClubProfileMeetingFrequency)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Biweekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="varies">Varies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Typical meeting location</Label>
                  <Select
                    value={meetingLocation}
                    onValueChange={(v) =>
                      setMeetingLocation(v as ClubProfileMeetingLocation)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="on_campus">On-campus</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Meeting day(s)</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Select which days your club typically meets
                </p>
                <MeetingDaysBar
                  value={meetingDays}
                  onChange={setMeetingDays}
                />
              </div>
              <div>
                <Label htmlFor="outcomes">What you&apos;ll leave with</Label>
                <Textarea
                  id="outcomes"
                  value={outcomes}
                  onChange={(e) => setOutcomes(e.target.value)}
                  placeholder="e.g. Portfolios, projects, competitions, certifications, leadership experience"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="upcoming_highlights">Upcoming highlights</Label>
                <Textarea
                  id="upcoming_highlights"
                  value={upcomingHighlights}
                  onChange={(e) => setUpcomingHighlights(e.target.value)}
                  placeholder="e.g. Spring Hackathon, Industry Speaker Series, Resume Workshops"
                  rows={2}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={recognizedByUniversity}
                  onCheckedChange={setRecognizedByUniversity}
                />
                <Label>Recognized by university</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Helps distinguish official organizations vs informal groups
              </p>
              <Button onClick={() => saveProfile()} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="membership" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Membership experience</CardTitle>
              <CardDescription>How to join, dues, application, commitment level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="how_to_join">How to join</Label>
                <Textarea
                  id="how_to_join"
                  value={howToJoin}
                  onChange={(e) => setHowToJoin(e.target.value)}
                  placeholder="Describe how students can join"
                  rows={4}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Dues amount ($)</Label>
                  <Input
                    type="number"
                    min={0}
                    step={0.01}
                    value={
                      duesAmountCents && !isNaN(parseFloat(duesAmountCents))
                        ? String(Number(duesAmountCents) / 100)
                        : ""
                    }
                    onChange={(e) => {
                      const v = e.target.value;
                      if (!v) setDuesAmountCents("");
                      else
                        setDuesAmountCents(
                          String(Math.round(parseFloat(v) * 100))
                        );
                    }}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label>Dues frequency</Label>
                  <Select
                    value={duesFrequency}
                    onValueChange={(v) =>
                      setDuesFrequency(v as ClubProfileDuesFrequency | "none")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No dues</SelectItem>
                      <SelectItem value="one_time">One-time</SelectItem>
                      <SelectItem value="semesterly">Per semester</SelectItem>
                      <SelectItem value="yearly">Per year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={applicationRequired}
                  onCheckedChange={setApplicationRequired}
                />
                <Label>Application/interview required</Label>
              </div>
              {applicationRequired && (
                <div>
                  <Label htmlFor="application_url">Application URL</Label>
                  <Input
                    id="application_url"
                    type="url"
                    value={applicationUrl}
                    onChange={(e) => setApplicationUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Commitment level</Label>
                  <Select
                    value={commitmentLevel}
                    onValueChange={(v) =>
                      setCommitmentLevel(v as ClubProfileCommitmentLevel)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Open to</Label>
                  <Select
                    value={openTo}
                    onValueChange={(v) => setOpenTo(v as ClubProfileOpenTo)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergrad">Undergrad</SelectItem>
                      <SelectItem value="grad">Grad</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={openToAllMajors}
                  onCheckedChange={setOpenToAllMajors}
                />
                <Label>Open to all majors</Label>
              </div>
              <div>
                <Label htmlFor="contact_email">General contact email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={contactEmailGeneral}
                  onChange={(e) => setContactEmailGeneral(e.target.value)}
                  placeholder="club@university.edu"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label>Years active</Label>
                  <Input
                    type="number"
                    min={0}
                    value={yearsActive}
                    onChange={(e) => setYearsActive(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Recruiting status</Label>
                  <Select
                    value={recruitingStatus}
                    onValueChange={(v) =>
                      setRecruitingStatus(v as ClubProfileRecruitingStatus)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="by_invite">By invite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Club size</Label>
                  <Select
                    value={clubSizeRange}
                    onValueChange={(v) =>
                      setClubSizeRange(v as ClubProfileSizeRange)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => saveProfile()} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social & external links</CardTitle>
              <CardDescription>Website, Instagram, Discord, LinkedIn, GitHub, Linktree</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {links.map((l) => (
                <div key={l.id} className="flex gap-2 items-center flex-wrap">
                  <Select
                    value={l.link_type}
                    onValueChange={(v) =>
                      updateLink(l.id, {
                        link_type: v as ClubProfileLinkType,
                      })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LINK_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={l.url}
                    onChange={(e) => updateLink(l.id, { url: e.target.value })}
                    placeholder="URL"
                    className="flex-1 min-w-48"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeLink(l.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addLink}>
                Add link
              </Button>
              <Button onClick={() => saveProfile()} disabled={saving} className="ml-4">
                {saving ? "Saving..." : "Save profile"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic & conduct</CardTitle>
              <CardDescription>Careers, skills, awards, accessibility, code of conduct</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="supported_careers">Supported careers (comma-separated)</Label>
                <Input
                  id="supported_careers"
                  value={supportedCareers}
                  onChange={(e) => setSupportedCareers(e.target.value)}
                  placeholder="e.g. Software Engineer, Data Scientist"
                />
              </div>
              <div>
                <Label htmlFor="skills_developed">Skills developed (comma-separated)</Label>
                <Input
                  id="skills_developed"
                  value={skillsDeveloped}
                  onChange={(e) => setSkillsDeveloped(e.target.value)}
                  placeholder="e.g. Leadership, Public speaking"
                />
              </div>
              <div>
                <Label htmlFor="pairs_well">Pairs well with courses</Label>
                <Textarea
                  id="pairs_well"
                  value={pairsWellWithCourses}
                  onChange={(e) => setPairsWellWithCourses(e.target.value)}
                  placeholder="Relevant courses or majors"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="awards">Awards</Label>
                <Textarea
                  id="awards"
                  value={awards}
                  onChange={(e) => setAwards(e.target.value)}
                  placeholder="Awards and recognition"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="partners">Partners & sponsors</Label>
                <Textarea
                  id="partners"
                  value={partnersSponsors}
                  onChange={(e) => setPartnersSponsors(e.target.value)}
                  placeholder="Sponsors or partner organizations"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="accessibility">Accessibility notes</Label>
                <Textarea
                  id="accessibility"
                  value={accessibilityNotes}
                  onChange={(e) => setAccessibilityNotes(e.target.value)}
                  placeholder="Accessibility accommodations"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="inclusivity">Inclusivity statement</Label>
                <Textarea
                  id="inclusivity"
                  value={inclusivityStatement}
                  onChange={(e) => setInclusivityStatement(e.target.value)}
                  placeholder="Your club's commitment to inclusivity"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="code_of_conduct">Code of conduct URL</Label>
                <Input
                  id="code_of_conduct"
                  type="url"
                  value={codeOfConductUrl}
                  onChange={(e) => setCodeOfConductUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <Button onClick={() => saveProfile()} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
