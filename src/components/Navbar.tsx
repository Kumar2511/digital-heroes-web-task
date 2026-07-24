import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { NAV_LINKS } from '@/utils/constants';
import { cx } from '@/utils/format';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cx(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-ink-200/70 bg-white/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-18">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cx(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-ink-900 bg-ink-100'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button to="/contact" variant="ghost" className="text-sm">
  Book Demo
          </Button>
          <Button to="/contact" variant="primary">
  Get Started
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-ink-200 bg-white"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-ink-700 hover:bg-ink-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-ink-100 pt-4">
              <Button to="/contact" variant="secondary" className="w-full">
                  Book Demo

              </Button>
              <Button to="/contact" variant="primary" className="w-full">
                    Get Started


              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
