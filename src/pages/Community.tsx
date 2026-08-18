import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Users, SearchX } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { SearchBar } from '@/components/SearchBar';
import { PostCard } from '@/components/PostCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchPosts } from '@/services/api';
import { CATEGORIES } from '@/data/categories';
import type { Category, Post } from '@/types';
import { cn } from '@/utils/cn';

export function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [category, setCategory] = useState<Category | 'All'>('All');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    fetchPosts()
      .then((data) => {
        if (active) setPosts(data);
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

  function handleLike(id: string) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p)));
  }
  function handleSave(id: string) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));
  }

  const filtered = useMemo(() => {
    let result = posts;
    if (category !== 'All') result = result.filter((p) => p.category === category);
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) => p.caption.toLowerCase().includes(q) || p.user.name.toLowerCase().includes(q) || p.user.username.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, category, debouncedSearch]);

  return (
    <PageTransition>
      <section className="border-b border-border bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" aria-hidden="true" />
            Community
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl">Community Feed</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            See what fellow collectors are finding, trading, and sharing. Like, save, and join the conversation.
          </p>
          <div className="mt-4 max-w-xl">
            <SearchBar value={search} onChange={setSearch} placeholder="Search posts, people, or captions..." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Category filter">
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
          {CATEGORIES.map((cat) => (
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

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {loading ? 'Loading...' : `${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}`}
        </p>

        <div className="mt-6">
          {error ? (
            <EmptyState
              icon={<SearchX className="h-7 w-7" />}
              title="Something went wrong"
              description="We couldn't load posts. Please try again."
              action={<Button onClick={() => window.location.reload()}>Retry</Button>}
            />
          ) : loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card-surface overflow-hidden">
                  <div className="flex items-center gap-2.5 p-4">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-2 w-16" />
                    </div>
                  </div>
                  <Skeleton className="aspect-square w-full" />
                  <div className="flex flex-col gap-3 p-4">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<SearchX className="h-7 w-7" />}
              title="No posts found"
              description="Try a different category or search term."
              action={<Button variant="outline" onClick={() => { setSearch(''); setCategory('All'); }}>Clear filters</Button>}
            />
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((post) => (
                  <PostCard key={post.id} post={post} onLike={handleLike} onSave={handleSave} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
