export type Category =
  | 'Vinyl Records'
  | 'Comic Books'
  | 'Coins'
  | 'Cameras'
  | 'Trading Cards'
  | 'Books'
  | 'Watches'
  | 'Action Figures'
  | 'Stamps'
  | 'Video Games';

export type Condition = 'Mint' | 'Near Mint' | 'Excellent' | 'Good' | 'Fair';

export type CollectionBucket = 'owned' | 'wishlist' | 'selling';

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  sales: number;
  location: string;
  joinedYear: number;
}

export interface Product {
  id: string;
  title: string;
  category: Category;
  condition: Condition;
  price: number;
  description: string;
  images: string[];
  seller: Seller;
  location: string;
  listedAt: string;
  estimatedValue: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary';
}

export interface Comment {
  id: string;
  user: { name: string; avatar: string };
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  user: { name: string; username: string; avatar: string };
  image: string;
  caption: string;
  category: Category;
  likes: number;
  liked: boolean;
  saved: boolean;
  comments: Comment[];
  createdAt: string;
  productId?: string;
}

export interface CollectionItem {
  id: string;
  productId: string;
  title: string;
  category: Category;
  image: string;
  estimatedValue: number;
  addedAt: string;
  bucket: CollectionBucket;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: 'success' | 'warning' | 'error' | 'info';
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc';
