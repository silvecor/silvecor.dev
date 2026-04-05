import type { Metadata } from 'next';
import { Pagination } from '@/components/Pagination';
import { PostCard } from '@/components/PostCard';
import { getAllPosts } from '@/utils/posts';

export const metadata: Metadata = {
  title: 'Posts',
};

const Posts = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const page = (await searchParams).page ? Number.parseInt((await searchParams).page as string) : 1;

  const posts = await getAllPosts();
  const postsToShow = posts.slice((page - 1) * 5, page * 5);
  const pageLength = Math.ceil(posts.length / 5);

  return (
    <div className='flex grow flex-col gap-8'>
      <h2 className='text-xl font-medium'>Posts</h2>
      <div className='flex flex-col gap-5'>
        {postsToShow.map(post => <PostCard post={post} key={post.title} />)}
      </div>
      <Pagination
        baseUrl='/posts'
        currentPage={page}
        totalPages={pageLength}
      />
    </div>
  );
};
export default Posts;
