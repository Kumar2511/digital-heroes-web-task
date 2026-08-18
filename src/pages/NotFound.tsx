import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

export function NotFound() {
  return (
    <PageTransition>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 to-pink-500/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-pink-600 text-white shadow-lg">
              <Compass className="h-10 w-10" aria-hidden="true" />
            </span>
          </motion.div>
          <p className="text-7xl font-bold text-gradient sm:text-8xl">404</p>
          <h1 className="text-3xl font-bold sm:text-4xl">This item isn't in the catalog</h1>
          <p className="max-w-md text-muted-foreground">
            The page you're looking for may have been sold, moved, or never existed. Let's get you back to the good stuff.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/" className="btn-primary h-12 px-6 text-base">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
            <Link to="/marketplace" className="btn-outline h-12 px-6 text-base">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
