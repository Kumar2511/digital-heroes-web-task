import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid, Rows3, SearchX, Store } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { SortDropdown } from '@/components/SortDropdown';
import { ProductCard } from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchProducts } from '@/services/api';
import type { Category, Condition, Product, SortOption } from '@/types';
import { cn } from '@/utils/cn';

export function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [categories, setCategories] = useState<Category[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [sort, setSort] = useState<SortOption>('newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    fetchProducts()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function toggleCategory(cat: Category) {
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }
  function toggleCondition(cond: Condition) {
    setConditions((prev) => (prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]));
  }
  function clearFilters() {
    setCategories([]);
    setConditions([]);
  }

  const filtered = useMemo(() => {
    let result = products;
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.seller.name.toLowerCase().includes(q)
      );
    }
    if (categories.length) result = result.filter((p) => categories.includes(p.category));
    if (conditions.length) result = result.filter((p) => conditions.includes(p.condition));
    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        result = [...result].sort((a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime());
    }
    return result;
  }, [products, debouncedSearch, categories, conditions, sort]);

  return (
    <PageTransition>
      <section className="border-b border-border bg-gradient-to-br from-violet-500/10 to-pink-500/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Store className="h-4 w-4" aria-hidden="true" />
              Marketplace
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">Browse the Marketplace</h1>
            <p className="max-w-2xl text-muted-foreground">
              Discover rare and collectible items from trusted sellers worldwide. Filter by category,
              condition, and price to find your next grail.
            </p>
            <div className="mt-2 max-w-xl">
              <SearchBar value={search} onChange={setSearch} placeholder="Search by title, category, or seller..." />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-72 lg:flex-none">
            <div className="lg:sticky lg:top-20">
              <FilterPanel
                selectedCategories={categories}
                selectedConditions={conditions}
                onCategoryToggle={toggleCategory}
                onConditionToggle={toggleCondition}
                onClear={clearFilters}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {loading ? 'Loading...' : `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'} found`}
              </p>
              <div className="flex items-center gap-2">
                <SortDropdown value={sort} onChange={setSort} />
                <div className="flex items-center rounded-lg border border-input p-0.5" role="group" aria-label="View toggle">
                  <button
                    type="button"
                    onClick={() => setView('grid')}
                    aria-pressed={view === 'grid'}
                    aria-label="Grid view"
                    className={cn('rounded-md p-1.5 transition-colors', view === 'grid' ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:text-foreground')}
                  >
                    <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('list')}
                    aria-pressed={view === 'list'}
                    aria-label="List view"
                    className={cn('rounded-md p-1.5 transition-colors', view === 'list' ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:text-foreground')}
                  >
                    <Rows3 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {error ? (
                <EmptyState
                  icon={<SearchX className="h-7 w-7" />}
                  title="Something went wrong"
                  description="We couldn't load products. Please try again."
                  action={<Button onClick={() => window.location.reload()}>Retry</Button>}
                />
              ) : loading ? (
                <div className={cn('grid gap-6', view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProductSkeleton key={i} view={view} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <EmptyState
                  icon={<SearchX className="h-7 w-7" />}
                  title="No items found"
                  description="Try adjusting your search or filters to find what you're looking for."
                  action={<Button variant="outline" onClick={() => { setSearch(''); clearFilters(); }}>Clear all filters</Button>}
                />
              ) : (
                <AnimatePresence mode="popLayout">
                  <motion.div
                    layout
                    className={cn('grid gap-6', view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}
                  >
                    {filtered.map((product) => (
                      <ProductCard key={product.id} product={product} view={view} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function ProductSkeleton({ view }: { view: 'grid' | 'list' }) {
  return (
    <div className={cn('card-surface overflow-hidden', view === 'list' && 'flex flex-col sm:flex-row')}>
      <Skeleton className={cn('aspect-[4/3]', view === 'list' && 'sm:w-56 sm:flex-none')} />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
        <div className="mt-auto flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
}
