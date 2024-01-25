import { Inter } from 'next/font/google';
import "../globals.css";

export const metadata = {
  title: 'Social',
  description: 'A social media application',
};

const inter = Inter({ subsets: ['latin'] });

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-dark-1`}>
        <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black to-slate-800">
          {children}
        </div>
      </body>
    </html>
  );
};

export default AuthLayout;
