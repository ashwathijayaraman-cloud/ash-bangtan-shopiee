import { createFileRoute, Link } from "@tanstack/react-router";
import panda from "@/assets/panda-mascot.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Bangtan Shopiee" },
      { name: "description", content: "Sign in to your Bangtan Shopiee account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
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
        <p className="mt-1 text-sm text-coffee-light">welcome back, study bestie ♡</p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 w-full rounded-3xl border border-coffee/20 bg-cream p-7 shadow-cozy animate-fade-up"
        >
          <label className="block text-sm font-medium text-coffee-dark">Username</label>
          <input
            type="text"
            placeholder="your cute username"
            className="mt-1.5 w-full rounded-full border-2 border-coffee/30 bg-champagne px-5 py-3 text-coffee-dark placeholder:text-coffee-light/70 focus:border-coffee focus:outline-none"
          />

          <label className="mt-4 block text-sm font-medium text-coffee-dark">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-full border-2 border-coffee/30 bg-champagne px-5 py-3 text-coffee-dark placeholder:text-coffee-light/70 focus:border-coffee focus:outline-none"
          />

          <div className="mt-2 flex justify-end">
            <button type="button" className="text-xs font-medium text-coffee hover:underline">
              Forgot password?
            </button>
          </div>

          <Link
            to="/"
            className="mt-5 block rounded-full bg-coffee py-3 text-center font-semibold text-cream shadow-soft transition hover:bg-coffee-dark"
          >
            Sign in
          </Link>

          <p className="mt-5 text-center text-sm text-coffee-light">
            New here?{" "}
            <button className="font-semibold text-coffee hover:underline">Sign up</button>
          </p>
        </form>
      </div>
    </div>
  );
}
