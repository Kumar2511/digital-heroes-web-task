import { Link } from 'react-router-dom';
import { Hexagon, Twitter, Instagram, Github, Youtube } from 'lucide-react';
import { Logo } from '@/components/Logo';

const FOOTER_SECTIONS = [
  {
    title: 'Marketplace',
    links: [
      { label: 'Browse All', href: '/marketplace' },
      { label: 'Trending', href: '/marketplace' },
      { label: 'New Arrivals', href: '/marketplace' },
      { label: 'Categories', href: '/marketplace' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Feed', href: '/community' },
      { label: 'Popular Posts', href: '/community' },
      { label: 'Share a Find', href: '/community' },
    ],
  },
  {
    title: 'Collection',
    links: [
      { label: 'My Collection', href: '/collection' },
      { label: 'Wishlist', href: '/collection' },
      { label: 'Selling', href: '/collection' },
    ],
  },
];

const SOCIALS = [
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'GitHub', icon: Github, href: 'https://github.com' },
  { label: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              Discover, collect, and trade rare collectibles. The premium marketplace for passionate collectors.
            </p>
            <ul className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`${s.label} (opens in a new tab)`}
                  >
                    <s.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="text-sm font-semibold">{section.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Collector's Hub. Built for the collector community.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Crafted with <Hexagon className="h-3.5 w-3.5 text-fuchsia-500" aria-hidden="true" /> by collectors, for collectors.
          </p>
        </div>
      </div>
    </footer>
  );
}
