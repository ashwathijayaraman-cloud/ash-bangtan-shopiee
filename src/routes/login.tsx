import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import panda from "@/assets/panda-mascot.png";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/login")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Login — Bangtan Shopiee" },
      { name: "description", content: "Sign in to your Bangtan Shopiee account." },
    ],
  }),
  component: LoginPage,
});

const USERNAME_EMAIL_DOMAIN = "bangtanshopiee.local";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cleanUsername = username.trim().toLowerCase();
      if (!cleanUsername) throw new Error("Please enter a username");

      if (mode === "signup") {
        const email = `${cleanUsername}@${USERNAME_EMAIL_DOMAIN}`;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { display_name: displayName || cleanUsername, username: cleanUsername },
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Welcome to Bangtan Shopiee! ♡");
          navigate({ to: "/", replace: true });
        } else {
          toast.success("Account created — please sign in ♡");
          setMode("signin");
        }
      } else {
        // Look up auth info for this username so we can:
        // 1) Block password login on Google-only accounts with a clear message
        // 2) Resolve the actual stored email (works for old email accounts too)
        const { data: infoRows } = await supabase.rpc("get_auth_info_for_username", {
          _username: cleanUsername,
        });
        const info = Array.isArray(infoRows) ? infoRows[0] : infoRows;

        if (info && info.has_google && !info.has_password) {
          throw new Error(
            "This account was created with Google. Please continue with Google Sign-In."
          );
        }

        const email =
          (info && typeof info.email === "string" && info.email) ||
          `${cleanUsername}@${USERNAME_EMAIL_DOMAIN}`;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error("Invalid Username or Password");
        toast.success("welcome back ♡");
        navigate({ to: "/", replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-champagne">
      <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
      <div className="absolute -bottom-20 -left-16 h-80 w-80 rounded-full bg-coffee/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12">
        <img
          src={panda}
          alt="Bangtan Shopiee mascot"
          width={140}
          height={140}
          className="animate-float-soft drop-shadow-[0_10px_20px_rgba(80,50,30,0.25)]"
        />
        <h1 className="mt-3 font-script text-5xl text-coffee">Bangtan Shopiee</h1>
        <p className="mt-1 text-sm text-coffee-light">
          {mode === "signin" ? "welcome back, study bestie ♡" : "join the cozy stationery club ♡"}
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 w-full rounded-3xl border border-coffee/20 bg-cream p-7 shadow-cozy animate-fade-up"
        >
          {mode === "signup" && (
            <>
              <label className="block text-sm font-medium text-coffee-dark">Display name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="your cute name"
                className="mt-1.5 mb-4 w-full rounded-full border-2 border-coffee/30 bg-champagne px-5 py-3 text-coffee-dark placeholder:text-coffee-light/70 focus:border-coffee focus:outline-none"
              />
            </>
          )}

          <label className="block text-sm font-medium text-coffee-dark">Username</label>
          <input
            type="text"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. jiminstan07"
            className="mt-1.5 w-full rounded-full border-2 border-coffee/30 bg-champagne px-5 py-3 text-coffee-dark placeholder:text-coffee-light/70 focus:border-coffee focus:outline-none"
          />

          <label className="mt-4 block text-sm font-medium text-coffee-dark">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-full border-2 border-coffee/30 bg-champagne px-5 py-3 text-coffee-dark placeholder:text-coffee-light/70 focus:border-coffee focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-5 block w-full rounded-full bg-coffee py-3 text-center font-semibold text-cream shadow-soft transition hover:bg-coffee-dark disabled:opacity-60"
          >
            {loading ? "..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>

          <div className="my-4 flex items-center gap-3 text-xs text-coffee-light">
            <span className="h-px flex-1 bg-coffee/20" />
            or
            <span className="h-px flex-1 bg-coffee/20" />
          </div>

          <button
            type="button"
            onClick={onGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-coffee/30 bg-champagne py-3 font-semibold text-coffee-dark transition hover:bg-blush disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.61z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.97 10.71A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.17.29-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3.01-2.33z"/>
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-5 text-center text-sm text-coffee-light">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-semibold text-coffee hover:underline"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
