import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';

const Product = lazy(() => import('@/pages/Product').then((m) => ({ default: m.Product })));
const Pricing = lazy(() => import('@/pages/Pricing').then((m) => ({ default: m.Pricing })));
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })));
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const Privacy = lazy(() => import('@/pages/Privacy').then((m) => ({ default: m.Privacy })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-ink-200 border-t-brand-600" aria-hidden="true" />
      <span className="sr-only">Loading page...</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="product"
            element={
              <Suspense fallback={<PageFallback />}>
                <Product />
              </Suspense>
            }
          />
          <Route
            path="pricing"
            element={
              <Suspense fallback={<PageFallback />}>
                <Pricing />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageFallback />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageFallback />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="privacy"
            element={
              <Suspense fallback={<PageFallback />}>
                <Privacy />
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
  );
}
