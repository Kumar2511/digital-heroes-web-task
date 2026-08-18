import { motion } from 'framer-motion';
import { Trash2, ArrowRightLeft, Calendar } from 'lucide-react';
import type { CollectionBucket, CollectionItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDate, cn } from '@/utils/cn';

interface CollectionCardProps {
  item: CollectionItem;
  onRemove: (id: string) => void;
  onMove: (id: string, bucket: CollectionBucket) => void;
}

const BUCKETS: CollectionBucket[] = ['owned', 'wishlist', 'selling'];

export function CollectionCard({ item, onRemove, onMove }: CollectionCardProps) {
  return (
    <motion.article
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group card-surface overflow-hidden shadow-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" font-size="14" fill="%239ca3af" text-anchor="middle">No image</text></svg>';
          }}
        />
        <span className="absolute left-3 top-3">
          <Badge variant="secondary" className="backdrop-blur-md">{item.category}</Badge>
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <h3 className="line-clamp-1 font-semibold leading-tight">{item.title}</h3>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          Added {formatDate(item.addedAt)}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Est. value</span>
          <span className="font-bold">{formatPrice(item.estimatedValue)}</span>
        </div>

        <div className="mt-1 flex items-center gap-2 pt-1">
          <label className="sr-only" htmlFor={`move-${item.id}`}>Move item to</label>
          <div className="relative flex-1">
            <ArrowRightLeft className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <select
              id={`move-${item.id}`}
              value={item.bucket}
              onChange={(e) => onMove(item.id, e.target.value as CollectionBucket)}
              className={cn(
                'h-9 w-full appearance-none rounded-lg border border-input bg-background pl-8 pr-3 text-xs font-medium',
                'focus:outline-none focus:ring-2 focus:ring-ring'
              )}
            >
              {BUCKETS.map((b) => (
                <option key={b} value={b}>Move to {b}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-input text-muted-foreground hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30"
            aria-label={`Remove ${item.title}`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
