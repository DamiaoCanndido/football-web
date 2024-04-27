import { Header } from '@/components/owner/header';
import { SideBar } from '@/components/owner/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Header />
      <SideBar />
      {children}
    </div>
  );
}
