import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Package, MapPin, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useCollection } from '@/context/CollectionContext';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/utils/cn';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
  view?: 'grid' | 'list';
}

export function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const { isInCollection, addToCollection } = useCollection();
  const inWishlist = isInCollection(product.id, 'wishlist');
  const inOwned = isInCollection(product.id, 'owned');

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group card-surface overflow-hidden shadow-sm transition-shadow hover:shadow-lg',
        view === 'list' && 'flex flex-col sm:flex-row'
      )}
    >
      <Link
        to={`/marketplace/${product.id}`}
        className={cn('relative block overflow-hidden', view === 'list' ? 'sm:w-56 sm:flex-none' : 'aspect-[4/3]')}
        aria-label={`View ${product.title}`}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className={cn('h-full w-full object-cover transition-transform duration-500 group-hover:scale-105', view === 'grid' && 'aspect-[4/3]')}
        />
        <span className="absolute left-3 top-3">
          <Badge variant="secondary" className="backdrop-blur-md">
            {product.category}
          </Badge>
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <Link to={`/marketplace/${product.id}`}>
              <h3 className="line-clamp-1 font-semibold leading-tight hover:text-primary transition-colors">
                {product.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">{product.condition}</Badge>
              <Badge variant={rarityVariant(product.rarity)}>{product.rarity}</Badge>
            </div>
          </div>
          <span className="flex-none text-lg font-bold">{formatPrice(product.price)}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <img src={product.seller.avatar} alt="" className="h-6 w-6 rounded-full object-cover" loading="lazy" />
          <span className="font-medium text-foreground">{product.seller.name}</span>
          <span className="flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
            {product.seller.rating}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {product.location}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link
            to={`/marketplace/${product.id}`}
            className="btn-outline h-9 flex-1 px-3 text-sm"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={() => addToCollection(product, 'wishlist')}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
              inWishlist
                ? 'border-pink-500 bg-pink-500/10 text-pink-500'
                : 'border-input hover:bg-accent'
            )}
            aria-label={inWishlist ? 'Already in wishlist' : 'Add to wishlist'}
            disabled={inWishlist}
          >
            <Heart className={cn('h-4 w-4', inWishlist && 'fill-current')} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => addToCollection(product, 'owned')}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
              inOwned
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                : 'border-input hover:bg-accent'
            )}
            aria-label={inOwned ? 'Already in collection' : 'Add to collection'}
            disabled={inOwned}
          >
            <Package className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
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
