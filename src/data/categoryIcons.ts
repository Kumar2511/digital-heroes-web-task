import {
  Disc3,
  BookOpen,
  Coins,
  Camera,
  Layers,
  Library,
  Watch,
  ToyBrick,
  Mail,
  Gamepad2,
  Package,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '@/types';

export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  'Vinyl Records': Disc3,
  'Comic Books': BookOpen,
  'Coins': Coins,
  'Cameras': Camera,
  'Trading Cards': Layers,
  'Books': Library,
  'Watches': Watch,
  'Action Figures': ToyBrick,
  'Stamps': Mail,
  'Video Games': Gamepad2,
};

export const FALLBACK_ICON: LucideIcon = Package;
