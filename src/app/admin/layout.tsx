import AdminWrapper from "@/components/admin/Wrapper";

export const metadata = {
  title: "Admin",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminWrapper>{children}</AdminWrapper>;
}
