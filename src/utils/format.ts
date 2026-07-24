/**
 * Formats a price with the given billing label.
 */
export function formatPrice(price: number, billing: 'monthly' | 'yearly'): string {
  if (price === 0) return 'Custom';
  const value = billing === 'monthly' ? price : price;
  return `$${value}`;
}

/**
 * Conditionally joins class names, filtering falsy values.
 */
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Returns a stable id from a string seed.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
