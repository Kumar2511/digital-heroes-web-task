import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Heart, Package, Share2, Star, MapPin, CheckCircle2, Calendar, Tag,
} from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { ProductCard } from '@/components/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useCollection } from '@/context/CollectionContext';
import { useToast } from '@/context/ToastContext';
import { fetchProductById } from '@/services/api';
import { getRelatedProducts } from '@/data/products';
import type { Product } from '@/types';
import { formatPrice, formatDate, cn } from '@/utils/cn';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { isInCollection, addToCollection } = useCollection();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    fetchProductById(id)
      .then((data) => {
        if (active) {
          setProduct(data);
          setActiveImage(0);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  function handleShare() {
    if (!product) return;
    if (navigator.share) {
      navigator.share({ title: product.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied', description: 'Share link copied to clipboard.', variant: 'success' });
    }
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Skeleton className="h-5 w-24" />
          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            <Skeleton className="aspect-square w-full" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!product) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="Product not found"
            description="This item may have been sold or removed."
            action={<Link to="/marketplace" className="btn-primary h-10 px-4 text-sm">Back to Marketplace</Link>}
          />
        </div>
      </PageTransition>
    );
  }

  const related = getRelatedProducts(product);
  const inWishlist = isInCollection(product.id, 'wishlist');
  const inOwned = isInCollection(product.id, 'owned');

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Marketplace
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.4, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden rounded-3xl border border-border"
            >
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="aspect-square w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" font-size="16" fill="%239ca3af" text-anchor="middle">No image</text></svg>';
                }}
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={activeImage === i}
                    className={cn(
                      'overflow-hidden rounded-xl border-2 transition-colors',
                      activeImage === i ? 'border-primary' : 'border-transparent hover:border-border'
                    )}
                  >
                    <img src={src} alt="" loading="lazy" className="h-20 w-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">{product.condition}</Badge>
                <Badge variant={rarityVariant(product.rarity)}>{product.rarity}</Badge>
              </div>
              <h1 className="text-2xl font-bold sm:text-3xl">{product.title}</h1>
              <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
              <p className="text-sm text-muted-foreground">
                Estimated value: <span className="font-semibold text-foreground">{formatPrice(product.estimatedValue)}</span>
              </p>
            </div>

            <p className="leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5">
              <InfoRow icon={Tag} label="Rarity" value={product.rarity} />
              <InfoRow icon={Calendar} label="Listed" value={formatDate(product.listedAt)} />
              <InfoRow icon={MapPin} label="Location" value={product.location} />
              <InfoRow icon={CheckCircle2} label="Condition" value={product.condition} />
            </div>

            {/* Seller */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Seller</h2>
              <div className="mt-3 flex items-center gap-4">
                <img src={product.seller.avatar} alt="" className="h-14 w-14 rounded-full object-cover" loading="lazy" />
                <div className="flex flex-col">
                  <span className="font-semibold">{product.seller.name}</span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    {product.seller.rating} &middot; {product.seller.sales} sales &middot; Since {product.seller.joinedYear}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                variant={inOwned ? 'secondary' : 'primary'}
                onClick={() => addToCollection(product, 'owned')}
                disabled={inOwned}
                className="flex-1"
              >
                <Package className="h-4 w-4" aria-hidden="true" />
                {inOwned ? 'In Collection' : 'Add to Collection'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => addToCollection(product, 'wishlist')}
                disabled={inWishlist}
                className="flex-1"
              >
                <Heart className={cn('h-4 w-4', inWishlist && 'fill-current text-pink-500')} aria-hidden="true" />
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
              <Button size="lg" variant="ghost" onClick={handleShare} aria-label="Share product">
                <Share2 className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold">Related Products</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Tag; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function rarityVariant(rarity: Product['rarity']): 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive' {
  switch (rarity) {
    case 'Legendary':
      return 'warning';
    case 'Very Rare':
      return 'destructive';
    case 'Rare':
      return 'success';
    case 'Uncommon':
      return 'secondary';
    default:
      return 'outline';
  }
}
