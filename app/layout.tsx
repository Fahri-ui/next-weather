import Navigasi from "@/components/navigasi";
import '@/app/ui/global.css';

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
