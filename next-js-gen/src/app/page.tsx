'use client';
import React from 'react';
import EditorComponent from '@/components/editor/EditorComponent';
import { editorData } from '@/mock/editor';

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between pt-[80px]">
      <EditorComponent {...editorData} />
    </section>
  );
}
