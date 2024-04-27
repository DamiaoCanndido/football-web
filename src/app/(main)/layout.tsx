import { Header } from '@/components/owner/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Header />
      {children}
    </div>
  );
}
