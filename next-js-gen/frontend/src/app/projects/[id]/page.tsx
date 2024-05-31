'use client';
import React, { useEffect } from 'react';
import EditorComponent from '@/components/editor/EditorComponent';
import useEditorStore from '@/store/useEditorStore';
import Sidebar from '@/components/ui/Sidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SettingsEditorSidebar from '@/components/editor/SettingsEditorSidebar';
import useProjectsStore from '@/store/useProjectsStore';
import useAuthStore from '@/store/useAuthStore';
import useApiStore from '@/store/useApiStore';
import { Project } from '@/types/projects/project';
import { Spinner } from 'baseui/spinner';
import classNames from 'classnames';
import EditorProjectBar from '@/components/ui/EditorProjectBar';
import ComponentsTreeView from '@/components/editor/ComponentsTreeView';

interface ProjectItemPageProps {
  params: {
    id: string;
  };
}

const ProjectItemPage: React.FC<ProjectItemPageProps> = ({ params }) => {
  const { isAuthenticated } = useAuthStore();
  const { getProjectById } = useApiStore();
  const { setActiveProject, projectIsSaving } = useProjectsStore();
  const { editorData, setEditorData } = useEditorStore();

  useEffect(() => {
    if (isAuthenticated) {
      const getProject = async () => {
        return await getProjectById(params.id);
      };
      getProject().then((value: Project) => {
        setEditorData({ components: value.components });
        setActiveProject({ _id: value._id, name: value.name });
      });
    }
  }, [isAuthenticated]);

  return (
    <section
      className={classNames({
        'relative flex grow flex-col items-center justify-between pt-[80px]':
          true,
        'pointer-events-none': projectIsSaving,
      })}
    >
      {projectIsSaving && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-[#000] opacity-50">
          <Spinner $size={'medium'} />
          <p className="mt-[10px] pl-[10px] text-[20px] font-bold text-white">
            Saving...
          </p>
        </div>
      )}
      {editorData && <ComponentsTreeView />}
      {editorData && (
        <DndProvider backend={HTML5Backend}>
          <div className="relative flex w-full grow">
            <Sidebar />
            <main className="flex w-full flex-col">
              <EditorProjectBar />
              <EditorComponent {...editorData} />
            </main>
            <SettingsEditorSidebar />
          </div>
        </DndProvider>
      )}
    </section>
  );
};

export default ProjectItemPage;
