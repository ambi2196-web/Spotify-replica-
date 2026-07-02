"use client";

import { useState, useEffect } from "react";
import ModeCard from "@/components/ui/ModeCard";
import { MusicIcon, MicIcon, BrushIcon, CompassIcon } from "@/components/icons";

const modes = [
  {
    href: "/music",
    title: "Music",
    tagline: "Your library, your mood",
    icon: <MusicIcon size={24} />,
    gradientFrom: "#1DB954",
    gradientTo: "#0a5c2a",
  },
  {
    href: "/podcast",
    title: "Podcast",
    tagline: "Ideas worth hearing",
    icon: <MicIcon size={24} />,
    gradientFrom: "#2D9CDB",
    gradientTo: "#0e4a73",
  },
  {
    href: "/canvas",
    title: "Canvas",
    tagline: "Audio built for your state — or made by you",
    icon: <BrushIcon size={24} />,
    gradientFrom: "#9B59B6",
    gradientTo: "#5a2d7a",
  },
  {
    href: "/discover",
    title: "Discover",
    tagline: "30 seconds in. Stay if it's worth it.",
    icon: <CompassIcon size={24} />,
    gradientFrom: "#F2994A",
    gradientTo: "#8a4010",
  },
] as const;

function useGreeting(): string {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);
  return greeting;
}

export default function GatewayPage() {
  const greeting = useGreeting();

  return (
    <>
      <title>Resonance — A Spotify Product Thesis</title>
      <div className="min-h-full bg-gradient-to-b from-surface-3 to-surface-1 px-6 py-10">
        <header className="mb-10">
          <p className="mb-1 text-sm font-medium text-text-secondary">
            {greeting}
          </p>
          <h1 className="text-3xl font-bold text-text-primary">
            What are you in the mood for?
          </h1>
          <p className="mt-2 text-sm italic text-text-muted">
            A product strategy thesis for Spotify's audio future — built to
            prove that platform-owned audio is the only durable margin lever.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modes.map((mode) => (
            <ModeCard key={mode.href} {...mode} />
          ))}
        </div>
      </div>
    </>
  );
}
