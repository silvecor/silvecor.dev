import type { Metadata } from 'next';
import { Pagination } from '@/components/Pagination';
import { ProjectCard } from '@/components/ProjectCard';
import { getAllProjects } from '@/utils/posts';

export const metadata: Metadata = {
  title: 'Projects',
};

const Projects = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const page = (await searchParams).page ? Number.parseInt((await searchParams).page as string) : 1;

  const projects = await getAllProjects();
  const projectsToShow = projects.slice((page - 1) * 5, page * 5);
  const pageLength = Math.ceil(projects.length / 5);

  return (
    <div className='flex grow flex-col gap-8'>
      <h2 className='text-xl font-medium'>Projects</h2>
      <div className='flex flex-col gap-5'>
        {projectsToShow.map(project => <ProjectCard project={project} key={project.slug} />)}
      </div>
      <Pagination
        baseUrl='/projects'
        currentPage={page}
        totalPages={pageLength}
      />
    </div>
  );
};
export default Projects;
