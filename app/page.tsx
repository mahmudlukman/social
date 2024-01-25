import { LoginButton } from '@/components/auth/LoginButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black to-slate-800">
      <div className="space-y-6 text-center">
        <div className="flex gap-4">
          <Image src="/logo.svg" alt="logo" width={68} height={68} />
          <h1
            className={cn(
              'text-6xl font-semibold text-white drop-shadow-md',
              font.className
            )}
          >
            Socials
          </h1>
        </div>
        <p className="text-white text-lg">A The best social media app</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
