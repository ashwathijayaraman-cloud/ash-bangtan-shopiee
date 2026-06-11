import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { ShopHeader } from "@/components/ShopHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Your Profile — Bangtan Shopiee" }] }),
  component: ProfilePage,
});

type ProfileForm = {
  display_name: string;
  email: string;
  phone: string;
  age: string;
  date_of_birth: string;
  gender: string;
  address_line: string;
  city: string;
  state: string;
  postal_code: string;
};

const empty: ProfileForm = {
  display_name: "", email: "", phone: "", age: "", date_of_birth: "",
  gender: "", address_line: "", city: "", state: "", postal_code: "",
};

function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (data) {
        setForm({
          display_name: data.display_name ?? "",
          email: data.email ?? user.email ?? "",
          phone: data.phone ?? "",
          age: data.age?.toString() ?? "",
          date_of_birth: data.date_of_birth ?? "",
          gender: data.gender ?? "",
          address_line: data.address_line ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          postal_code: data.postal_code ?? "",
        });
      } else {
        setForm((f) => ({ ...f, email: user.email ?? "" }));
      }
      setLoading(false);
    })();
  }, []);

  const update = (k: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    const payload = {
      id: userId,
      display_name: form.display_name || null,
      email: form.email || null,
      phone: form.phone || null,
      age: form.age ? Number(form.age) : null,
      date_of_birth: form.date_of_birth || null,
      gender: form.gender || null,
      address_line: form.address_line || null,
      city: form.city || null,
      state: form.state || null,
      postal_code: form.postal_code || null,
    };
    const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved ♡");
  };

  const inputCls = "w-full rounded-2xl border-2 border-coffee/25 bg-champagne px-4 py-2.5 text-coffee-dark placeholder:text-coffee-light/70 focus:border-coffee focus:outline-none";
  const labelCls = "block text-sm font-medium text-coffee-dark";

  return (
    <div className="min-h-screen bg-champagne">
      <ShopHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 md:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-coffee hover:underline">
          <ArrowLeft className="h-4 w-4" /> back to shop
        </Link>
        <h1 className="font-display text-3xl font-bold text-coffee-dark">Your Profile</h1>
        <p className="mt-1 text-coffee-light">Keep your details up to date for faster checkout ♡</p>

        {loading ? (
          <div className="mt-8 rounded-3xl border border-coffee/20 bg-cream p-10 text-center text-coffee-light">Loading…</div>
        ) : (
          <form onSubmit={onSave} className="mt-6 grid gap-4 rounded-3xl border border-coffee/20 bg-cream p-6 shadow-soft md:grid-cols-2">
            <div className="md:col-span-2"><label className={labelCls}>Full name</label>
              <input className={inputCls} value={form.display_name} onChange={update("display_name")} placeholder="Your cute name" /></div>

            <div><label className={labelCls}>Email</label>
              <input type="email" className={inputCls} value={form.email} onChange={update("email")} placeholder="you@example.com" /></div>

            <div><label className={labelCls}>Phone</label>
              <input type="tel" className={inputCls} value={form.phone} onChange={update("phone")} placeholder="+91 9xxxxxxxxx" /></div>

            <div><label className={labelCls}>Age</label>
              <input type="number" min={1} max={120} className={inputCls} value={form.age} onChange={update("age")} placeholder="22" /></div>

            <div><label className={labelCls}>Date of birth</label>
              <input type="date" className={inputCls} value={form.date_of_birth} onChange={update("date_of_birth")} /></div>

            <div><label className={labelCls}>Gender</label>
              <select className={inputCls} value={form.gender} onChange={update("gender")}>
                <option value="">Prefer not to say</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select></div>

            <div className="md:col-span-2"><label className={labelCls}>Address</label>
              <input className={inputCls} value={form.address_line} onChange={update("address_line")} placeholder="House no, street, area" /></div>

            <div><label className={labelCls}>City</label>
              <input className={inputCls} value={form.city} onChange={update("city")} placeholder="Mumbai" /></div>

            <div><label className={labelCls}>State</label>
              <input className={inputCls} value={form.state} onChange={update("state")} placeholder="Maharashtra" /></div>

            <div><label className={labelCls}>Postal code</label>
              <input className={inputCls} value={form.postal_code} onChange={update("postal_code")} placeholder="400001" /></div>

            <div className="md:col-span-2">
              <button disabled={saving} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-coffee py-3 font-semibold text-cream shadow-soft transition hover:bg-coffee-dark disabled:opacity-60">
                <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
