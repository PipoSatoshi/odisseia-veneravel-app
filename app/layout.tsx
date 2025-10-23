import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import LogoutButton from './components/auth/LogoutButton';
import BackButton from './components/ui/BackButton';
import { headers } from 'next/headers';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Odisseia Venerável',
  description: 'Luxury Transportation Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const heads = headers();
  // O 'next-url' é uma informação que o nosso middleware.ts está a passar
  const pathname = heads.get('next-url') || '';
  
  // Só mostra os botões globais se não estivermos na página de login ('/')
  const showGlobalButtons = pathname !== '/';

  return (
    <html lang="pt-PT" className={`${poppins.variable}`}>
      <body className="bg-[#1D1D1B] font-poppins text-white">
        {/* Renderização condicional dos botões */}
        {showGlobalButtons && <LogoutButton />}
        {children}
        {showGlobalButtons && <BackButton />}
      </body>
    </html>
  );
}