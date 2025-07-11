import Navigasi from "@/components/navigasi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigasi />
        {children}
      </body>
    </html>
  );
}
