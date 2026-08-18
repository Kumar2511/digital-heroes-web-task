import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { CollectionProvider } from '@/context/CollectionContext';
import { RootLayout } from '@/layouts/RootLayout';
import { Toaster } from '@/components/ui/Toaster';
import { Home } from '@/pages/Home';

const Marketplace = lazy(() => import('@/pages/Marketplace').then((m) => ({ default: m.Marketplace })));
const ProductDetails = lazy(() => import('@/pages/ProductDetails').then((m) => ({ default: m.ProductDetails })));
const Community = lazy(() => import('@/pages/Community').then((m) => ({ default: m.Community })));
const PostDetails = lazy(() => import('@/pages/PostDetails').then((m) => ({ default: m.PostDetails })));
const Collection = lazy(() => import('@/pages/Collection').then((m) => ({ default: m.Collection })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-foreground" aria-hidden="true" />
      <span className="sr-only">Loading page...</span>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CollectionProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route
                  path="marketplace"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <Marketplace />
                    </Suspense>
                  }
                />
                <Route
                  path="marketplace/:id"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <ProductDetails />
                    </Suspense>
                  }
                />
                <Route
                  path="community"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <Community />
                    </Suspense>
                  }
                />
                <Route
                  path="community/:id"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <PostDetails />
                    </Suspense>
                  }
                />
                <Route
                  path="collection"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <Collection />
                    </Suspense>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <NotFound />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster />
        </CollectionProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
