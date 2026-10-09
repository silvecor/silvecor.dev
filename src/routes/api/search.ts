import { createFileRoute } from '@tanstack/react-router';
import { createFromSource } from 'fumadocs-core/search/server';
import { blog } from '@/lib/source';

const api = createFromSource(blog);

export const Route = createFileRoute('/api/search')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const queryStr = new URL(request.url).searchParams.get('query');
        if (!queryStr || queryStr.length < 3) {
          // safe guard
          return Response.json([], { status: 200 });
        }
        return api.GET(request);
      },
    },
  },
});
