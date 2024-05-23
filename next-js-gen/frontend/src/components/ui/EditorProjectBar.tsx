import React from 'react';
import useProjectsStore from '@/store/useProjectsStore';
import { Badge } from 'baseui/badge';
import useApiStore from '@/store/useApiStore';
import { Button } from 'baseui/button';

const EditorProjectBar = () => {
  const { activeProject, projectIsSaved } = useProjectsStore();

  const { getGeneratedProject } = useApiStore();
  const { projectIsGenerating } = useProjectsStore();

  return (
    <div className="flex h-[40px] w-full items-center bg-gray-medium pl-[20px]">
      <div className="flex grow items-center justify-between gap-[20px] pr-[320px] text-[20px] font-bold text-[#fff]">
        <div className="flex gap-[20px]">
          Project: {activeProject?.name}
          <span className="inline-flex items-center">
            {projectIsSaved ? (
              <Badge content={'Saved'} shape={'rectangle'} color={'positive'} />
            ) : (
              <Badge
                content={'Changes is not saved'}
                shape={'rectangle'}
                color={'warning'}
              />
            )}
          </span>
        </div>
        <div className="flex items-center">
          <Button
            onClick={async () => {
              await getGeneratedProject();
            }}
            isLoading={projectIsGenerating}
            size={'mini'}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorProjectBar;
