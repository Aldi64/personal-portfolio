import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'oi6mxct5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // fast, cached reads — fine for public content
});

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}