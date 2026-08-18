import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/context/ToastContext';
import { initialCollection } from '@/data/collection';
import type { CollectionBucket, CollectionItem, Product } from '@/types';

interface CollectionContextValue {
  items: CollectionItem[];
  owned: CollectionItem[];
  wishlist: CollectionItem[];
  selling: CollectionItem[];
  isInCollection: (productId: string, bucket: CollectionBucket) => boolean;
  addToCollection: (product: Product, bucket: CollectionBucket) => void;
  removeFromCollection: (itemId: string) => void;
  moveItem: (itemId: string, bucket: CollectionBucket) => void;
  totalValue: number;
}

const CollectionContext = createContext<CollectionContextValue | undefined>(undefined);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CollectionItem[]>('ch-collection', initialCollection);
  const { toast } = useToast();

  const isInCollection = useCallback(
    (productId: string, bucket: CollectionBucket) =>
      items.some((i) => i.productId === productId && i.bucket === bucket),
    [items]
  );

  const addToCollection = useCallback(
    (product: Product, bucket: CollectionBucket) => {
      setItems((prev) => {
        if (prev.some((i) => i.productId === product.id && i.bucket === bucket)) {
          toast({
            title: 'Already in your collection',
            description: `"${product.title}" is already in your ${bucket} list.`,
            variant: 'warning',
          });
          return prev;
        }
        toast({
          title: bucket === 'owned' ? 'Added to collection' : bucket === 'wishlist' ? 'Added to wishlist' : 'Listed for sale',
          description: `"${product.title}" is now in your ${bucket} list.`,
          variant: 'success',
        });
        const newItem: CollectionItem = {
          id: `col-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          productId: product.id,
          title: product.title,
          category: product.category,
          image: product.images[0],
          estimatedValue: product.estimatedValue,
          addedAt: new Date().toISOString(),
          bucket,
        };
        return [newItem, ...prev];
      });
    },
    [setItems, toast]
  );

  const removeFromCollection = useCallback(
    (itemId: string) => {
      setItems((prev) => {
        const item = prev.find((i) => i.id === itemId);
        if (item) {
          toast({ title: 'Removed', description: `"${item.title}" was removed.`, variant: 'info' });
        }
        return prev.filter((i) => i.id !== itemId);
      });
    },
    [setItems, toast]
  );

  const moveItem = useCallback(
    (itemId: string, bucket: CollectionBucket) => {
      setItems((prev) => {
        const item = prev.find((i) => i.id === itemId);
        if (!item) return prev;
        if (item.bucket === bucket) return prev;
        toast({
          title: 'Item moved',
          description: `"${item.title}" moved to ${bucket}.`,
          variant: 'success',
        });
        return prev.map((i) => (i.id === itemId ? { ...i, bucket } : i));
      });
    },
    [setItems, toast]
  );

  const value = useMemo<CollectionContextValue>(() => {
    const owned = items.filter((i) => i.bucket === 'owned');
    const wishlist = items.filter((i) => i.bucket === 'wishlist');
    const selling = items.filter((i) => i.bucket === 'selling');
    const totalValue = owned.reduce((sum, i) => sum + i.estimatedValue, 0);
    return { items, owned, wishlist, selling, isInCollection, addToCollection, removeFromCollection, moveItem, totalValue };
  }, [items, isInCollection, addToCollection, removeFromCollection, moveItem]);

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection(): CollectionContextValue {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error('useCollection must be used within a CollectionProvider');
  return ctx;
}
