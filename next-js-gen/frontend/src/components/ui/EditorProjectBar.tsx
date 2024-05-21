import React, { useMemo, useRef, useState } from 'react';
import useProjectsStore from '@/store/useProjectsStore';
import { Badge } from 'baseui/badge';
import { ProgressBar } from 'baseui/progress-bar';

const EditorProjectBar = () => {
  const { activeProject, projectIsSaved } = useProjectsStore();

  return (
    <div className="h-[40px] w-full bg-gray-medium pl-[20px]">
      <div className="flex items-center gap-[20px] text-[20px] text-medium font-bold text-[#fff]">
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
    </div>
  );
};

export default EditorProjectBar;
