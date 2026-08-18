import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, Store, Users, Package, TrendingUp, Search as SearchIcon,
} from 'lucide-react';
import { products } from '@/data/products';
import { posts } from '@/data/posts';
import { CATEGORIES } from '@/data/categories';
import { CATEGORY_ICONS, FALLBACK_ICON } from '@/data/categoryIcons';
import { PageTransition } from '@/components/PageTransition';
import { ProductCard } from '@/components/ProductCard';
import { PostCard } from '@/components/PostCard';
import { Badge } from '@/components/ui/Badge';
import { useState } from 'react';

const STATS = [
  { label: 'Active Listings', value: '12,000+', icon: Store },
  { label: 'Community Members', value: '48,000+', icon: Users },
  { label: 'Items Collected', value: '2.4M+', icon: Package },
  { label: 'Trades This Month', value: '18,500+', icon: TrendingUp },
];

export function Home() {
  const [postState, setPostState] = useState(posts);
  const trending = products.slice(0, 8);
  const latestPosts = postState.slice(0, 4);

  function handleLike(id: string) {
    setPostState((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p)));
  }
  function handleSave(id: string) {
    setPostState((prev) => prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-pink-500/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-40 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-40 top-20 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-500" aria-hidden="true" />
              The marketplace for passionate collectors
            </Badge>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl lg:leading-[1.02]">
              Discover. Collect. <span className="text-gradient">Trade.</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              The premium marketplace for collectors of vinyl, comics, coins, cards, watches, and more.
              Find rare pieces, connect with fellow collectors, and build a collection worth showing off.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/marketplace" className="btn-primary h-12 px-6 text-base">
                Explore Marketplace
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/community" className="btn-outline h-12 px-6 text-base">
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card" aria-label="Platform statistics">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden border-x border-border lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-1 border-b border-border px-6 py-10 text-center lg:border-b-0 lg:border-r last:border-r-0"
            >
              <stat.icon className="h-6 w-6 text-fuchsia-500" aria-hidden="true" />
              <div className="text-2xl font-bold sm:text-3xl">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="categories-heading">
        <div className="flex flex-col items-center gap-2 text-center">
          <Badge variant="secondary">Categories</Badge>
          <h2 id="categories-heading" className="text-3xl font-bold sm:text-4xl">Popular Categories</h2>
          <p className="max-w-xl text-muted-foreground">Explore collectibles across every category you love.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat] ?? FALLBACK_ICON;
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.06 }}
              >
                <Link
                  to="/marketplace"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-pink-500/15 text-fuchsia-500 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">{cat}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trending Products */}
      <section className="border-y border-border bg-card" aria-labelledby="trending-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Badge variant="secondary" className="gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                Trending
              </Badge>
              <h2 id="trending-heading" className="mt-2 text-3xl font-bold sm:text-4xl">Trending Products</h2>
            </div>
            <Link to="/marketplace" className="hidden items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex">
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="featured-heading">
        <div className="flex flex-col items-center gap-2 text-center">
          <Badge variant="secondary">Curated</Badge>
          <h2 id="featured-heading" className="text-3xl font-bold sm:text-4xl">Featured Collections</h2>
          <p className="max-w-xl text-muted-foreground">Hand-picked collections from our most trusted sellers.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: 'Vintage Vinyl Vault', count: 142, image: products[0].images[0], tag: 'Vinyl Records' },
            { title: 'Golden Age Comics', count: 87, image: products[3].images[0], tag: 'Comic Books' },
            { title: 'Grail Card Gallery', count: 56, image: products[14].images[0], tag: 'Trading Cards' },
          ].map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to="/marketplace" className="group relative block overflow-hidden rounded-3xl border border-border">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={col.image} alt={col.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <Badge className="mb-2 backdrop-blur-md">{col.tag}</Badge>
                  <h3 className="text-xl font-bold">{col.title}</h3>
                  <p className="text-sm text-white/80">{col.count} items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Community Posts */}
      <section className="border-y border-border bg-card" aria-labelledby="posts-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Badge variant="secondary" className="gap-1.5">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Community
              </Badge>
              <h2 id="posts-heading" className="mt-2 text-3xl font-bold sm:text-4xl">Latest from the Community</h2>
            </div>
            <Link to="/community" className="hidden items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex">
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} onSave={handleSave} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 px-6 py-16 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden="true" />
          <div className="relative flex flex-col items-center gap-6 text-white">
            <SearchIcon className="h-10 w-10" aria-hidden="true" />
            <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">Start your collection today</h2>
            <p className="max-w-xl text-white/90">Join thousands of collectors discovering, trading, and showcasing rare finds every day.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/marketplace" className="btn h-12 bg-white px-6 text-base text-violet-700 hover:bg-white/90">
                Browse Marketplace
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/collection" className="btn h-12 border border-white/30 bg-white/10 px-6 text-base text-white hover:bg-white/20">
                View My Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
