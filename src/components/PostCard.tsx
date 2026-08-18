import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Bookmark, ArrowUpRight } from 'lucide-react';
import type { Post } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatRelative, cn } from '@/utils/cn';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
}

export function PostCard({ post, onLike, onSave }: PostCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="card-surface overflow-hidden shadow-sm"
    >
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-2.5">
          <img src={post.user.avatar} alt="" className="h-9 w-9 rounded-full object-cover" loading="lazy" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">{post.user.name}</span>
            <span className="text-xs text-muted-foreground">@{post.user.username}</span>
          </div>
        </div>
        <Badge variant="secondary">{post.category}</Badge>
      </div>

      <Link to={`/community/${post.id}`} className="block aspect-square overflow-hidden" aria-label={`View post by ${post.user.name}`}>
        <img
          src={post.image}
          alt={post.caption.slice(0, 80)}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onLike(post.id)}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-pink-500"
            aria-label={post.liked ? 'Unlike post' : 'Like post'}
          >
            <Heart className={cn('h-5 w-5', post.liked && 'fill-pink-500 text-pink-500')} aria-hidden="true" />
            {post.likes}
          </button>
          <Link
            to={`/community/${post.id}`}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {post.comments.length}
          </Link>
          <button
            type="button"
            onClick={() => onSave(post.id)}
            className="ml-auto flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label={post.saved ? 'Unsave post' : 'Save post'}
          >
            <Bookmark className={cn('h-5 w-5', post.saved && 'fill-current text-foreground')} aria-hidden="true" />
          </button>
        </div>

        <p className="line-clamp-2 text-sm">{post.caption}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{formatRelative(post.createdAt)}</span>
          <Link
            to={`/community/${post.id}`}
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            View Details
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
