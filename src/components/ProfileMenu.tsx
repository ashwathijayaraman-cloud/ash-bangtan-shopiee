import { useEffect, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Package, Settings, ShoppingCart, Heart, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";

export function ProfileMenu() {
  const navigate = useNavigate();
  const [name, setName] = useState("friend");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !active) return;
      const { data } = await supabase
        .from("profiles")
        .select("display_name, username")
        .eq("id", user.id)
        .maybeSingle();
      if (active) setName(data?.display_name || data?.username || user.email?.split("@")[0] || "friend");
    })();
    return () => { active = false; };
  }, []);

  const onLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-3 rounded-full bg-cream p-1 pr-4 shadow-soft transition hover:shadow-cozy">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-coffee text-cream">
            <User className="h-5 w-5" />
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-xs text-coffee-light">welcome,</span>
            <span className="block text-sm font-semibold text-coffee-dark">{name}</span>
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 rounded-2xl border-coffee/20 bg-cream">
        <DropdownMenuLabel className="font-script text-xl text-coffee">Hi, {name}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="gap-2 cursor-pointer"><Settings className="h-4 w-4" /> Profile & Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/orders" className="gap-2 cursor-pointer"><Package className="h-4 w-4" /> My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/cart" className="gap-2 cursor-pointer"><ShoppingCart className="h-4 w-4" /> Cart</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/wishlist" className="gap-2 cursor-pointer"><Heart className="h-4 w-4" /> Liked Items</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onLogout} className="gap-2 text-coffee-dark">
          <LogOut className="h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
