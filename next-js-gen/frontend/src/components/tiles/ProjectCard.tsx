import React from 'react';
import { Project } from '@/types/projects/project';
import { ArrowRight } from 'baseui/icon';
import Link from 'next/link';

export interface IProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<IProjectCardProps> = ({ project }) => {
  return (
    <Link
      href={`/projects/${project._id}`}
      className="flex min-h-[120px] w-full cursor-pointer items-center justify-center rounded-[8px] bg-[#fff] transition-colors hover:bg-opacity-70"
    >
      {project.name}
      <ArrowRight size={24} />
    </Link>
  );
};

export default ProjectCard;
