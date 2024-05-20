'use client';
import React, { useEffect } from 'react';
import AllProjects from '@/components/views/AllProjects';
import useAuthStore from '@/store/useAuthStore';
import useProjectsStore from '@/store/useProjectsStore';
import useApiStore from '@/store/useApiStore';

export default function ProjectsPage() {
  const { isAuthenticated } = useAuthStore();
  const { projectsList } = useProjectsStore();
  const { getProjectsByUser } = useApiStore();

  useEffect(() => {
    if (isAuthenticated) {
      getProjectsByUser();
    }
  }, [isAuthenticated, getProjectsByUser]);

  return (
    <section className="flex grow flex-col items-center justify-between pt-[80px]">
      <div className="flex w-full grow">
        <main className="flex w-full flex-col items-center">
          <div className="container">
            <AllProjects projects={projectsList} />
          </div>
        </main>
      </div>
    </section>
  );
}
