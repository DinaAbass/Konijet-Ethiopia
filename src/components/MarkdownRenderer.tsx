"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
}

const BLOCK_PATTERNS = [
  { test: /^#\s+/, tag: "h1", className: "text-3xl font-bold mt-8 mb-4" },
  { test: /^##\s+/, tag: "h2", className: "text-2xl font-semibold mt-6 mb-3" },
  { test: /^###\s+/, tag: "h3", className: "text-xl font-semibold mt-4 mb-2" },
  { test: /^>\s+/, tag: "blockquote", className: "border-l-4 border-secondary pl-4 italic my-4 text-muted-foreground" },
  { test: /^-\s+/, tag: "li", className: "ml-6 list-disc my-1" },
  { test: /^\d+\.\s+/, tag: "li", className: "ml-6 list-decimal my-1" },
];

function renderLine(line: string, idx: number): React.ReactNode {
  if (line.trim() === "") {
    return <div key={idx} className="h-4" />;
  }

  if (line.startsWith("---")) {
    return <hr key={idx} className="my-6 border-border" />;
  }

  for (const pattern of BLOCK_PATTERNS) {
    if (pattern.test.test(line)) {
      const text = line.replace(pattern.test, "");
      const Tag = pattern.tag as keyof JSX.IntrinsicElements;
      return (
        <Tag key={idx} className={pattern.className}>
          {text}
        </Tag>
      );
    }
  }

  // Italic wrapped in asterisks: *text*
  if (line.startsWith("*") && line.endsWith("*") && line.length > 2) {
    return (
      <p key={idx} className="italic text-muted-foreground my-2">
        {line.slice(1, -1)}
      </p>
    );
  }

  // Bold text **text**
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{line.slice(lastIndex, match.index)}</span>);
    }
    parts.push(<strong key={key++}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    parts.push(<span key={key++}>{line.slice(lastIndex)}</span>);
  }

  return (
    <p key={idx} className="my-2 leading-relaxed">
      {parts.length > 0 ? parts : line}
    </p>
  );
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      {content.split("\n").map((line, idx) => renderLine(line, idx))}
    </div>
  );
};
