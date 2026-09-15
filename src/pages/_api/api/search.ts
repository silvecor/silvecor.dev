import { createFromSource } from 'fumadocs-core/search/server';
import { blog } from '@/lib/source';

const api = createFromSource(blog);

export async function GET(req: Request): Promise<Response> {
  const queryStr = new URL(req.url).searchParams.get('query');
  if (!queryStr || queryStr.length < 3) {
    // safe guard
    return Response.json([], { status: 200 });
  }
  return api.GET(req);
}
