import ClientWrapper from "@/components/baselayout/Wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientWrapper>{children}</ClientWrapper>;
}
