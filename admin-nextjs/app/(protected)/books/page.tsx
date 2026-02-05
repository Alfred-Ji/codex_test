import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const books = [
  {
    id: "BK-2026-01",
    name: "High-Frequency Grad Exam Vocabulary",
    words: 3200,
    level: "Advanced",
    status: "Published",
  },
  {
    id: "BK-2026-02",
    name: "IELTS Core Vocabulary",
    words: 1800,
    level: "Intermediate",
    status: "Published",
  },
  {
    id: "BK-2026-03",
    name: "Kids Starter Vocabulary",
    words: 800,
    level: "Beginner",
    status: "Draft",
  },
];

const statusVariant = (status: string) => {
  if (status === "Published") {
    return "default" as const;
  }
  return "secondary" as const;
};

export default function BooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Vocabulary Book Management</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage vocabulary book catalogs, statuses, and statistics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Bulk Import</Button>
          <Button>New Vocabulary Book</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Books</CardTitle>
            <CardDescription>
              Number of vocabulary books available in the library
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
            <CardDescription>Books available to learners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">9</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Drafts</CardTitle>
            <CardDescription>Books currently in editing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vocabulary Book List</CardTitle>
          <CardDescription>Recently updated books</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-zinc-200">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-50">
                <tr className="text-left text-zinc-500">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Word Count</th>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white">
                {books.map((book) => (
                  <tr key={book.id} className="text-zinc-700">
                    <td className="px-4 py-3 font-medium text-zinc-900">
                      {book.id}
                    </td>
                    <td className="px-4 py-3">{book.name}</td>
                    <td className="px-4 py-3">{book.words.toLocaleString()}</td>
                    <td className="px-4 py-3">{book.level}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(book.status)}>
                        {book.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" className="px-2">
                        View
                      </Button>
                      <Button variant="ghost" className="px-2">
                        Edit
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
