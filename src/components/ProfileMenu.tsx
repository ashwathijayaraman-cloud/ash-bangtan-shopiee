import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Settings, ShoppingCart, Heart, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-3 rounded-full bg-cream p-1 pr-4 shadow-soft transition hover:shadow-cozy">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-coffee text-cream">
            <User className="h-5 w-5" />
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-xs text-coffee-light">welcome,</span>
            <span className="block text-sm font-semibold text-coffee-dark">Mochi</span>
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 rounded-2xl border-coffee/20 bg-cream">
        <DropdownMenuLabel className="font-script text-xl text-coffee">Hi, Mochi!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2"><LayoutDashboard className="h-4 w-4" /> Dashboard</DropdownMenuItem>
        <DropdownMenuItem className="gap-2"><Settings className="h-4 w-4" /> Settings</DropdownMenuItem>
        <DropdownMenuItem className="gap-2"><ShoppingCart className="h-4 w-4" /> Cart</DropdownMenuItem>
        <DropdownMenuItem className="gap-2"><Heart className="h-4 w-4" /> Liked Items</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="gap-2 text-coffee-dark">
          <Link to="/login"><LogOut className="h-4 w-4" /> Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
