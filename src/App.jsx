import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, RotateCcw, Volume2, VolumeX, Film, ChevronRight } from "lucide-react";
import * as Tone from "tone";

const GENRES = [
  { id: "drama", label: "Epic Drama", accent: "#E8A94C", accentDim: "#8a6a34", verb: "would rise", close: "A LIFE. ONE STORY. EVERY FRAME EARNED." },
  { id: "action", label: "Action", accent: "#C23B22", accentDim: "#6e2313", verb: "would fight back", close: "NO RETREAT. NO SEQUEL. ONE LIFE." },
  { id: "romance", label: "Romance", accent: "#D46A6A", accentDim: "#7a3939", verb: "would risk it all", close: "SOME STORIES ARE WRITTEN IN THE HEART." },
  { id: "scifi", label: "Sci-Fi", accent: "#4FA8A0", accentDim: "#2b5f5a", verb: "would break the pattern", close: "THE FUTURE WAS NEVER PROMISED. IT WAS BUILT." },
  { id: "comedy", label: "Comedy", accent: "#D9B44A", accentDim: "#7a6529", verb: "would somehow figure it out", close: "LIFE. IT'S FUNNIER IN HINDSIGHT." },
];

const FIELD_DEFS = [
  { key: "name", label: "Your name", placeholder: "e.g. Trisha", type: "text" },
  { key: "origin", label: "Where the story begins", placeholder: "e.g. a small flat in Pune, always with a book in hand", type: "text" },
  { key: "struggle", label: "The struggle", placeholder: "e.g. a world that wanted her to pick one thing and stick to it", type: "text" },
  { key: "turn", label: "The turning point", placeholder: "e.g. she finished her first story and didn't stop", type: "text" },
  { key: "mission", label: "What she's chasing now", placeholder: "e.g. telling stories no one else would write", type: "text" },
  { key: "tagline", label: "A tagline (optional)", placeholder: "e.g. Every ending is a beginning in disguise.", type: "text" },
];

function buildScenes(data, genre) {
  const name = data.name?.trim() || "Someone";
  return [
    { kind: "card", eyebrow: "IN A WORLD WHERE...", line: data.origin?.trim() || "the odds were never really in her favor" },
    { kind: "card", eyebrow: "ONE PERSON FACED", line: data.struggle?.trim() || "everything telling her to stop" },
    { kind: "card", eyebrow: "UNTIL THE DAY", line: data.turn?.trim() || "she decided the story wasn't over" },
    { kind: "card", eyebrow: `NOW, ${name.toUpperCase()} ${genre.verb.toUpperCase()}`, line: data.mission?.trim() || "for everything she was told she couldn't have" },
    { kind: "title", name, tagline: data.tagline?.trim() || genre.close, genre: genre.label },
  ];
}

function CountdownLeader({ accent, onDone }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n <= 0) {
      const t = setTimeout(onDone, 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((v) => v - 1), 700);
    return () => clearTimeout(t);
  }, [n, onDone]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="relative w-40 h-40 sm:w-56 sm:h-56">
        <svg viewBox="0 0 100 100" className="w-full h-full leader-spin">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
          <line x1="50" y1="4" x2="50" y2="96" stroke="#2a2a2a" strokeWidth="1" />
          <line x1="4" y1="50" x2="96" y2="50" stroke="#2a2a2a" strokeWidth="1" />
          <circle cx="50" cy="50" r="46" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="4 10" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-6xl sm:text-7xl" style={{ color: accent }} key={n}>
          {n > 0 ? n : ""}
        </div>
      </div>
    </div>
  );
}

function Scene({ scene, accent }) {
  if (scene.kind === "title") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 text-center scene-fade">
        <span className="font-utility tracking-[0.35em] text-[10px] sm:text-xs uppercase mb-4" style={{ color: accent }}>{scene.genre}</span>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-none text-projector break-words max-w-full">{scene.name}</h1>
        <div className="w-16 h-px my-6" style={{ backgroundColor: accent }} />
        <p className="font-body text-sm sm:text-base text-projector/80 m
