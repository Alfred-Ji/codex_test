"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/use-auth";

const navItems = [
  { href: "/books", label: "Word Book Management", icon: BookIcon },
  { href: "/admin-users", label: "Admin Users", icon: UserGroupIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-white px-4 py-6">
      <div className="px-2">
        <div className="text-lg font-semibold text-zinc-900">Vocabulary Admin Dashboard</div>
        <p className="mt-1 text-sm text-zinc-500">shadcn/ui + Tailwind</p>
      </div>

      <nav className="mt-8 flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-100"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-zinc-500")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator className="my-4" />

      <div className="flex items-center justify-between gap-2 px-2">
        <div className="min-w-0">
          <div className="text-xs text-zinc-500">Signed in as</div>
          <div className="truncate text-sm font-medium text-zinc-900">
            {user?.email ?? "-"}
          </div>
        </div>
        <Button
          variant="ghost"
          className="h-9 w-9 rounded-full p-0"
          onClick={logout}
          title="Sign out"
          aria-label="Sign out"
        >
          <LogoutIcon className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5c0-1.1.9-2 2-2h9.5c1.4 0 2.5 1.1 2.5 2.5V20" />
      <path d="M4 5.5V20c0 1.1.9 2 2 2h12" />
      <path d="M8 7h7" />
      <path d="M8 11h7" />
    </svg>
  );
}

function UserGroupIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 14a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
      <path d="M2 20a6 6 0 0 1 12 0" />
      <path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" />
      <path d="M14 20a5 5 0 0 1 8 0" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}
