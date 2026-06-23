export interface MetadataProps {
  title: string;
  description: string;
  author: string;
  slugs?: string[];
  tags?: string[];
  ogOverride?: string;
}

export function Metadata({ title, description, author, slugs, tags, ogOverride }: MetadataProps) {
  const fullTitle = `${title} | silvecor.dev`;
  const url = `https://silvecor.dev${slugs ? `/${slugs.join('/')}` : ''}`;
  const image = ogOverride ?? `https://silveocr.dev/og${slugs ? `/${slugs.join('/')}` : ''}/image.webp`;

  const og = [
    ['title', title],
    ['site_name', 'silvecor.dev'],
    ['description', description],
    ['author', author],
    ['url', url],
    ['image', image],
    ['image:alt', description],
  ];
  const twitter = [
    ['card', 'summary_large_image'],
    ['creator', author],
    ['title', title],
    ['description', description],
    ['image', image],
    ['image:alt', description],
  ];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name='title' content={fullTitle} />
      <meta name='description' content={description} />
      <meta name='creator' content={author} />

      {og.map(([property, content]) => (
        <meta key={property} property={`og:${property}`} content={content} />
      ))}
      {twitter.map(([name, content]) => (
        <meta key={name} name={`twitter:${name}`} content={content} />
      ))}

      <meta property='article:author' content={author} />
      {tags?.map(tag => (
        <meta key={tag} property='article:tag' content={tag} />
      ))}
    </>
  );
}
