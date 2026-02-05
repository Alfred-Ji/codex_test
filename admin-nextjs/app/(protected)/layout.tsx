import { AuthGuard } from "@/components/auth/auth-guard";
import { Sidebar } from "@/components/layout/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-zinc-50 text-zinc-900">
        <Sidebar />
        <main className="flex-1 px-10 py-8">{children}</main>
      </div>
    </AuthGuard>
  );
}