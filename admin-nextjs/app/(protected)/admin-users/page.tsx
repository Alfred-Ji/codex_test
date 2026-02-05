import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const admins = [
  {
    id: "AD-1001",
    name: "Lin Qian",
    email: "linqian@example.com",
    role: "Super Admin",
    status: "Active",
  },
  {
    id: "AD-1002",
    name: "Zhou Yan",
    email: "zhouyan@example.com",
    role: "Content Admin",
    status: "Active",
  },
  {
    id: "AD-1003",
    name: "Liu Shan",
    email: "liushan@example.com",
    role: "Operations Admin",
    status: "Disabled",
  },
];

const statusVariant = (status: string) => {
  if (status === "Active") {
    return "default" as const;
  }
  return "secondary" as const;
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Users</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Configure admin accounts, roles, and permissions.
          </p>
        </div>
        <Button>Add Admin</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Admins</CardTitle>
            <CardDescription>Number of admins in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">6</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Added This Week</CardTitle>
            <CardDescription>Admins added in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">2</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin List</CardTitle>
          <CardDescription>Admin accounts you can manage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-zinc-200">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-50">
                <tr className="text-left text-zinc-500">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white">
                {admins.map((admin) => (
                  <tr key={admin.id} className="text-zinc-700">
                    <td className="px-4 py-3 font-medium text-zinc-900">
                      {admin.id}
                    </td>
                    <td className="px-4 py-3">{admin.name}</td>
                    <td className="px-4 py-3">{admin.email}</td>
                    <td className="px-4 py-3">{admin.role}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(admin.status)}>
                        {admin.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" className="px-2">
                        Edit
                      </Button>
                      <Button variant="ghost" className="px-2">
                        Permissions
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
