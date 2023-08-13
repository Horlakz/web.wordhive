import AdminWrapper from "@/components/admin/Wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminWrapper>{children}</AdminWrapper>;
}
