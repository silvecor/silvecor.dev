import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import browserCollections from 'collections/browser';
import { source } from '@/lib/source';

export const Route = createFileRoute('/posts/$')({
  component: PostsComponent,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? [];
    const path = await serverLoader({ data: slugs });
    await clientLoader.preload(path);
    return path;
  },
});

const serverLoader = createServerFn({ method: 'GET' })
  .validator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();
    return page.path;
  });

const clientLoader = browserCollections.posts.createClientLoader({
  component: ({ default: MDX, frontmatter }) => {
    return (
      <MDX />
    );
  },
});

function PostsComponent() {
  const data = Route.useLoaderData();

  return clientLoader.useContent(data);
}
