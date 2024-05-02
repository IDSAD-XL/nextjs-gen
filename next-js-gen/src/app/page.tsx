'use client';
import React from 'react';
import EditorComponent from '@/components/editor/EditorComponent';
import useEditorStore from '@/store/useEditorStore';
import Sidebar from '@/components/ui/Sidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Home() {
  const { editorData } = useEditorStore();

  return (
    <section className="flex grow flex-col items-center justify-between pt-[80px]">
      <DndProvider backend={HTML5Backend}>
        <div className="flex w-full grow">
          <Sidebar />
          <main className="flex w-full flex-col">
            <EditorComponent {...editorData} />
          </main>
        </div>
      </DndProvider>
    </section>
  );
}
