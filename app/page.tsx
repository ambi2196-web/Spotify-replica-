import ModeCard from "@/components/ui/ModeCard";
import { MusicIcon, MicIcon, BrushIcon, CompassIcon } from "@/components/icons";

const modes = [
  {
    href: "/music",
    title: "Music",
    tagline: "Tracks, albums, and playlists",
    icon: <MusicIcon size={24} />,
    gradientFrom: "#1DB954",
    gradientTo: "#0a5c2a",
  },
  {
    href: "/podcast",
    title: "Podcast",
    tagline: "Episodes and conversations",
    icon: <MicIcon size={24} />,
    gradientFrom: "#8D67AB",
    gradientTo: "#4a3060",
  },
  {
    href: "/canvas",
    title: "Canvas",
    tagline: "Visual soundscapes",
    icon: <BrushIcon size={24} />,
    gradientFrom: "#E8115B",
    gradientTo: "#7a0830",
  },
  {
    href: "/discover",
    title: "Discover",
    tagline: "Find something new",
    icon: <CompassIcon size={24} />,
    gradientFrom: "#0D72EA",
    gradientTo: "#063a7a",
  },
] as const;

export default function GatewayPage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-surface-3 to-surface-1 px-6 py-10">
      <header className="mb-10">
        <p className="mb-1 text-sm font-medium text-text-secondary">
          Good evening
        </p>
        <h1 className="text-3xl font-bold text-text-primary">
          What are you in the mood for?
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modes.map((mode) => (
          <ModeCard key={mode.href} {...mode} />
        ))}
      </div>
    </div>
  );
}
