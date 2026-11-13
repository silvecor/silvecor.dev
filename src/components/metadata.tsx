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

export function Metadata({
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

  return (
    <>
      <title>{fullTitle}</title>
      <meta name='title' content={fullTitle} />
      <meta name='description' content={description} />
      <meta name='creator' content={author} />
      {isArticle && <meta property='article:author' content={author} />}
      {tags?.map(tag => <meta property='article:tag' content={tag} key={tag} />)}
      <link rel='canonical' href={url} />

      <meta property='og:title' content={title} />
      <meta property='og:author' content={author} />
      <meta property='og:site_name' content='silvecor.dev' />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={image} />
      <meta property='og:image:alt' content={description} />
      {isArticle && <meta property='og:type' content='article' />}

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:creator' content={author} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:image:alt' content={description} />

      {isArticle
        && <script type='application/ld+json'>
          {JSON.stringify({
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
          })}
        </script>
      }
    </>
  );
}
