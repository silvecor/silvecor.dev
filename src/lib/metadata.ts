export interface MetadataProps {
  isArticle?: boolean;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  slugs?: string[];
  tags?: string[] | undefined;
  image?: string | undefined;
}

export function metadata({
  isArticle = false,
  title = 'Home',
  description = 'Designer, Developer',
  date,
  author = 'silvecor',
  slugs,
  tags,
  image = '/default.webp', // TODO
}: MetadataProps) {
  const fullTitle = `${title} | silvecor.dev`;
  const url = `https://silvecor.dev${slugs ? `/${slugs.join('/')}` : ''}`;

  return {
    meta: [
      { title: fullTitle },
      { name: 'title', content: fullTitle },
      { name: 'description', content: description },
      { name: 'creator', content: author },
      ...isArticle ? [{ property: 'article:author', content: author }] : [],
      ...(tags ?? []).map(tag => ({ property: 'article:tag', content: tag })),
      // og
      { property: 'og:title', content: title },
      { property: 'og:author', content: author },
      { property: 'og:site_name', content: 'silvecor.dev' },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:alt', content: description },
      ...isArticle ? [{ property: 'og:type', content: 'article' }] : [],
      // twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:creator', content: author },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: description },
    ],
    links: [
      { rel: 'canonical', href: url },
    ],
    scripts: isArticle ? [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          image,
          author: {
            '@type': 'Person',
            name: author,
          },
          datePublished: date,
        }),
      },
    ] : undefined,
  };
}
