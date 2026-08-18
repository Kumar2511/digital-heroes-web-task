import { NavLink } from 'react-router-dom';
import { Home, Store, Users, Package, TrendingUp, Heart, Bookmark } from 'lucide-react';
import { useCollection } from '@/context/CollectionContext';
import { cn } from '@/utils/cn';

const NAV = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Marketplace', href: '/marketplace', icon: Store },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'My Collection', href: '/collection', icon: Package },
];

export function Sidebar({ className = '' }: { className?: string }) {
  const { owned, wishlist, selling } = useCollection();

  return (
    <aside className={cn('hidden lg:flex w-60 flex-col gap-1', className)} aria-label="Secondary">
      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )
            }
          >
            <item.icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
        <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Your Collection
        </h2>
        <div className="flex flex-col gap-1">
          <CollectionStat icon={Package} label="Owned" count={owned.length} />
          <CollectionStat icon={Heart} label="Wishlist" count={wishlist.length} />
          <CollectionStat icon={TrendingUp} label="Selling" count={selling.length} />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-gradient-to-br from-violet-500/10 to-pink-500/10 p-4">
        <Bookmark className="h-5 w-5 text-fuchsia-500" aria-hidden="true" />
        <p className="mt-2 text-sm font-semibold">Pro Tip</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Use the grid/list toggle on the marketplace to find items faster.
        </p>
      </div>
    </aside>
  );
}

function CollectionStat({ icon: Icon, label, count }: { icon: typeof Home; label: string; count: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2 text-sm">
      <span className="flex items-center gap-2.5 text-muted-foreground">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </span>
      <span className="font-semibold">{count}</span>
    </div>
  );
}
