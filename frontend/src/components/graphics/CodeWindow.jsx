import React from "react";

const KEYWORDS = new Set([
  "function", "if", "else", "return", "for", "while", "const", "let", "var",
  "new", "true", "false", "null", "async", "await", "import", "from", "export",
  "class", "try", "catch", "break", "continue", "of", "in", "default", "switch",
  "case", "throw",
]);

const TOKEN_RE = /(\/\/.*$)|('[^']*'|"[^"]*")|(\d+(?:\.\d+)?)|([A-Za-z_$][A-Za-z0-9_$]*)|(\s+)|(.)/g;

function highlightLine(line) {
  const nodes = [];
  let match;
  let key = 0;
  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(line)) !== null) {
    const [full, comment, str, num, ident, ws] = match;
    if (comment) {
      nodes.push(<span key={key++} className="text-[#6b7280] italic">{comment}</span>);
    } else if (str) {
      nodes.push(<span key={key++} className="text-[#fbbf6d]">{str}</span>);
    } else if (num) {
      nodes.push(<span key={key++} className="text-[#f9a8d4]">{num}</span>);
    } else if (ident) {
      const isCall = line[match.index + full.length] === "(";
      if (KEYWORDS.has(ident)) {
        nodes.push(<span key={key++} className="text-[#c4b5fd] font-medium">{ident}</span>);
      } else if (isCall) {
        nodes.push(<span key={key++} className="text-[#93c5fd]">{ident}</span>);
      } else {
        nodes.push(<span key={key++} className="text-[#e5e7eb]">{ident}</span>);
      }
    } else if (ws) {
      nodes.push(ws);
    } else {
      nodes.push(<span key={key++} className="text-[#71717a]">{full}</span>);
    }
  }
  return nodes;
}

export default function CodeWindow({ filename = "logic.pseudo", badge = "pseudocode", code, accent = "#8b5cf6" }) {
  const lines = code.trim().split("\n");
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d13] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-[11px] text-[#a1a1aa]">{filename}</span>
        </div>
        <span
          className="px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-widest"
          style={{ background: `${accent}20`, color: accent }}
        >
          {badge}
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-[1.75] font-mono">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-6 flex-shrink-0 select-none text-[#4b4b57] text-right pr-3">{i + 1}</span>
              <span className="whitespace-pre">{highlightLine(line)}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
