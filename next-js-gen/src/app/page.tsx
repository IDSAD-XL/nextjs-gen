"use client";
import { Button } from "baseui/button";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1>Text test</h1>
      <Button onClick={() => alert("click")}>Hello</Button>
    </main>
  );
}
