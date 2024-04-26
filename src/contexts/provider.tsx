import { AuthContextProvider } from '@/contexts/auth';

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
