import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Avatar } from '@/components/Avatar';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
import { MDXContent } from '@/components/MDXContent';
import { PostPagination } from '@/components/PostPagination';
import { Separator } from '@/components/Separator';
import { Tag } from '@/components/Tag';
import { Toc } from '@/components/Toc';
import { formatDate } from '@/utils/date';
import { getAdjacentPosts, getAllPosts, getPostAuthors, getPostById } from '@/utils/posts';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const posts = await getAllPosts();
  return posts.map(post => ({ id: post.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id } = (await params);
  const post = await getPostById(id);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    publisher: post.authors.join(' '),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://hellolin.top${post.permalink}`,
      siteName: 'hellolin.top',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: post.authors.join(' '),
      tags: post.tags,
      ...post.image && {
        images: [
          {
            url: post.image.src,
            alt: post.title,
            width: 1200,
            height: 630,
          },
        ],
      },
    },
    twitter: {
      title: post.title,
      description: post.description,
      creator: post.authors.join(' '),
      card: 'summary_large_image',
      ...post.image && {
        images: [post.image.src],
      },
    },
  };
};

const Post = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const post = await getPostById(id);
  const { previous, next } = await getAdjacentPosts(id);

  if (!post) {
    return notFound();
  }

  return (
    <div className='flex flex-col gap-8'>
      <section>
        {/* {post.image && (
          <NextImage
            className='mb-2 rounded-sm object-cover'
            src={post.image.src}
            alt={post.title}
            blurDataURL={post.image.blurDataURL}
            width={1200}
            height={630}
          />
        )} */}
        <div className='mt-5 flex flex-col gap-2'>
          <div className='flex flex-wrap gap-2 text-sm'>
            {post.tags?.map(tag => <Tag key={tag} name={tag} />)}
          </div>
          <h1 className='text-4xl font-medium leading-tight'>{post.title}</h1>
          <div className='flex flex-wrap items-center gap-2 text-sm text-muted-fg'>
            {post.authors.length !== 0 && (
              <>
                {(await getPostAuthors(post.authors)).map(author => (
                  <div className='flex items-center gap-1.5' key={author.name}>
                    <Avatar className='size-4.5 translate-y--1px' image={author.avatar} fallback={author.name} />
                    <Link href={author.permalink}>{author.name}</Link>
                  </div>
                ))}
                <Separator orientation='vertical' size='sm' />
              </>
            )}
            <span>{formatDate(post.date)}</span>
            <Separator orientation='vertical' size='sm' />
            <span className='flex items-center gap-1'>
              <Icon className='i-lucide-clock size-3.7 translate-y--1px' />
              {post.metadata.readingTime} min{post.metadata.readingTime > 1 && 's'}
            </span>
          </div>
        </div>
      </section>
      <div className='flex flex-row'>
        <article className='prose'>
          <MDXContent code={post.code} />
        </article>
        <Toc toc={post.toc} />
      </div>
      <PostPagination previous={previous} next={next} />
    </div>
  );
};
export default Post;
