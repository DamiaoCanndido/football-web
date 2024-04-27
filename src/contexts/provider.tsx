import { AuthContextProvider } from '@/contexts/auth';
import { SideBarContextProvider } from '@/contexts/sidebar';

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <SideBarContextProvider>{children}</SideBarContextProvider>
    </AuthContextProvider>
  );
}
