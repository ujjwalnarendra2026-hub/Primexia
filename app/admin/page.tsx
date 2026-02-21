import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin",
  description: "Secure admin dashboard for contact submissions.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/admin",
  },
};

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  return <AdminDashboard initiallyAuthenticated={authenticated} />;
}
