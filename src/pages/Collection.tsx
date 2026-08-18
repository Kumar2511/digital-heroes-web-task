import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Package, Heart, TrendingUp, Wallet } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { SearchBar } from '@/components/SearchBar';
import { SortDropdown } from '@/components/SortDropdown';
import { CollectionCard } from '@/components/CollectionCard';
import { Tabs, type TabItem } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useCollection } from '@/context/CollectionContext';
import { useDebounce } from '@/hooks/useDebounce';
import { CATEGORIES } from '@/data/categories';
import type { Category, CollectionBucket, SortOption } from '@/types';
import { formatPrice, cn } from '@/utils/cn';

export function Collection() {
  const { items, owned, wishlist, selling, removeFromCollection, moveItem, totalValue } = useCollection();
  const [tab, setTab] = useState<CollectionBucket>('owned');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [sort, setSort] = useState<SortOption>('newest');
  const [category, setCategory] = useState<Category | 'All'>('All');

  const tabs: TabItem[] = [
    { id: 'owned', label: 'Owned', count: owned.length },
    { id: 'wishlist', label: 'Wishlist', count: wishlist.length },
    { id: 'selling', label: 'Selling', count: selling.length },
  ];

  const current = useMemo(() => items.filter((i) => i.bucket === tab), [items, tab]);

  const filtered = useMemo(() => {
    let result = current;
    if (category !== 'All') result = result.filter((i) => i.category === category);
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    }
    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.estimatedValue - b.estimatedValue);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.estimatedValue - a.estimatedValue);
        break;
      default:
        result = [...result].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    }
    return result;
  }, [current, category, debouncedSearch, sort]);

  const availableCategories = useMemo(() => {
    const set = new Set(current.map((i) => i.category));
    return CATEGORIES.filter((c) => set.has(c));
  }, [current]);

  const tabIcon = { owned: Package, wishlist: Heart, selling: TrendingUp } as const;
  const TabIcon = tabIcon[tab];

  return (
    <PageTransition>
      <section className="border-b border-border bg-gradient-to-br from-violet-500/10 to-pink-500/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" aria-hidden="true" />
            My Collection
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl">My Collection</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Manage your owned items, wishlist, and listings. Track value, move items between lists, and keep your collection organized.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
              <Wallet className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">Collection value</span>
              <span className="font-bold">{formatPrice(totalValue)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Tabs tabs={tabs} active={tab} onChange={(id) => setTab(id as CollectionBucket)} />
          <div className="flex flex-1 items-center gap-2 lg:justify-end">
            <div className="flex-1 lg:max-w-xs">
              <SearchBar value={search} onChange={setSearch} placeholder="Search your collection..." />
            </div>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        {availableCategories.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Category filter">
            <button
              type="button"
              onClick={() => setCategory('All')}
              aria-pressed={category === 'All'}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                category === 'All' ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-accent'
              )}
            >
              All
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                  category === cat ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-accent'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </p>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<TabIcon className="h-7 w-7" />}
              title={tab === 'owned' ? 'No owned items yet' : tab === 'wishlist' ? 'Your wishlist is empty' : 'Nothing listed for sale'}
              description={
                search || category !== 'All'
                  ? 'Try adjusting your search or filters.'
                  : tab === 'owned'
                    ? 'Browse the marketplace and add items to your collection.'
                    : tab === 'wishlist'
                      ? 'Save items you love from the marketplace to find them here.'
                      : 'List items from your collection to sell them.'
              }
              action={
                search || category !== 'All' ? (
                  <Button variant="outline" onClick={() => { setSearch(''); setCategory('All'); }}>Clear filters</Button>
                ) : (
                  <a href="/marketplace" className="btn-primary h-10 px-4 text-sm">Browse Marketplace</a>
                )
              }
            />
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((item) => (
                  <CollectionCard key={item.id} item={item} onRemove={removeFromCollection} onMove={moveItem} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
