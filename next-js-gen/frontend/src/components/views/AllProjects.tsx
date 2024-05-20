import React from 'react';
import { Project } from '@/types/projects/project';
import ProjectCard from '@/components/tiles/ProjectCard';
import { Heading, HeadingLevel } from 'baseui/heading';
import useModalStore from '@/store/useModalStore';

interface IAllProjectsProps {
  projects: Project[];
}

const AllProjects: React.FC<IAllProjectsProps> = ({ projects }) => {
  const { openCreateNewProjectModal } = useModalStore();

  return (
    <div className="flex flex-col">
      <HeadingLevel>
        <Heading className="my-[20px]">All your projects</Heading>
        <div className="grid grid-cols-4 gap-4">
          {projects?.map((project) => (
            <ProjectCard project={project} key={project._id} />
          ))}

          <button
            onClick={openCreateNewProjectModal}
            className="min-h-[120px] rounded-[8px] border-[1px] border-dashed border-gray-light bg-[rgba(0,0,0,0)] transition-colors hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.1)]"
          >
            <span>Create new project</span>
          </button>
        </div>
      </HeadingLevel>
    </div>
  );
};

export default AllProjects;
