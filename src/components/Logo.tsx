import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 font-bold ${className}`} aria-label="Collector's Hub home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-md">
        <Hexagon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-lg tracking-tight">Collector's Hub</span>
    </Link>
  );
}
