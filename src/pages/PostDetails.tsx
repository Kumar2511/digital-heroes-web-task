import { useEffect, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Bookmark, Send, Users } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { PostCard } from '@/components/PostCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { fetchPostById } from '@/services/api';
import { getRelatedPosts } from '@/data/posts';
import type { Comment, Post } from '@/types';
import { formatRelative, cn } from '@/utils/cn';

export function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | undefined>();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    fetchPostById(id)
      .then((data) => {
        if (active) setPost(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  function handleLike() {
    setPost((prev) => (prev ? { ...prev, liked: !prev.liked, likes: prev.liked ? prev.likes - 1 : prev.likes + 1 } : prev));
  }
  function handleSave() {
    setPost((prev) => (prev ? { ...prev, saved: !prev.saved } : prev));
  }
  function handleAddComment(e: FormEvent) {
    e.preventDefault();
    if (!comment.trim() || !post) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      user: { name: 'You', avatar: 'https://images.pexels.com/photos/2341350/pexels-photo-2341350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
      text: comment.trim(),
      createdAt: new Date().toISOString(),
    };
    setPost((prev) => (prev ? { ...prev, comments: [...prev.comments, newComment] } : prev));
    setComment('');
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Skeleton className="h-5 w-24" />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <Skeleton className="aspect-square w-full" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!post) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="Post not found"
            description="This post may have been removed."
            action={<Link to="/community" className="btn-primary h-10 px-4 text-sm">Back to Community</Link>}
          />
        </div>
      </PageTransition>
    );
  }

  const related = getRelatedPosts(post);

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/community" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Community
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0.4, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-3xl border border-border"
          >
            <img src={post.image} alt={post.caption.slice(0, 80)} className="aspect-square w-full object-cover" />
          </motion.div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img src={post.user.avatar} alt="" className="h-11 w-11 rounded-full object-cover" loading="lazy" />
              <div className="flex flex-col">
                <span className="font-semibold">{post.user.name}</span>
                <span className="text-sm text-muted-foreground">@{post.user.username}</span>
              </div>
              <Badge variant="secondary" className="ml-auto">{post.category}</Badge>
            </div>

            <p className="leading-relaxed">{post.caption}</p>

            <div className="flex items-center gap-4 border-y border-border py-3">
              <button
                type="button"
                onClick={handleLike}
                className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-pink-500"
                aria-label={post.liked ? 'Unlike post' : 'Like post'}
              >
                <Heart className={cn('h-5 w-5', post.liked && 'fill-pink-500 text-pink-500')} aria-hidden="true" />
                {post.likes}
              </button>
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {post.comments.length}
              </span>
              <button
                type="button"
                onClick={handleSave}
                className="ml-auto flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                aria-label={post.saved ? 'Unsave post' : 'Save post'}
              >
                <Bookmark className={cn('h-5 w-5', post.saved && 'fill-current text-foreground')} aria-hidden="true" />
                {post.saved ? 'Saved' : 'Save'}
              </button>
            </div>

            <span className="text-xs text-muted-foreground">{formatRelative(post.createdAt)}</span>

            {/* Comments */}
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Comments</h2>
              <ul className="flex flex-col gap-4">
                {post.comments.map((c) => (
                  <li key={c.id} className="flex gap-3">
                    <img src={c.user.avatar} alt="" className="h-8 w-8 flex-none rounded-full object-cover" loading="lazy" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold">{c.user.name}</span>
                      <span className="text-sm text-muted-foreground">{c.text}</span>
                      <span className="text-xs text-muted-foreground">{formatRelative(c.createdAt)}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleAddComment} className="flex gap-2">
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  aria-label="Add a comment"
                />
                <Button type="submit" size="icon" aria-label="Post comment" disabled={!comment.trim()}>
                  <Send className="h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="flex items-center gap-2 text-2xl font-bold">
              <Users className="h-5 w-5 text-fuchsia-500" aria-hidden="true" />
              Related Posts
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <PostCard key={p.id} post={p} onLike={() => {}} onSave={() => {}} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
