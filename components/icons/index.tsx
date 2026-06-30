import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function icon(path: React.ReactNode, viewBox = "0 0 24 24") {
  return function Icon({ size = 20, className, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        fill="currentColor"
        className={className}
        aria-hidden="true"
        {...props}
      >
        {path}
      </svg>
    );
  };
}

export const HomeIcon = icon(
  <path d="M12 3.293 2.293 13H5v8h5v-5h4v5h5v-8h2.707L12 3.293zM12 1l11 11h-3v10H14v-5h-4v5H4V12H1L12 1z" />
);

export const MusicIcon = icon(
  <path d="M9 3v10.55A4 4 0 1 0 11 17V7h6V3H9zm-2 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
);

export const MicIcon = icon(
  <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zM8 11H6a6 6 0 0 0 5 5.92V20H9v2h6v-2h-2v-3.08A6 6 0 0 0 18 11h-2a4 4 0 0 1-8 0z" />
);

export const CanvasIcon = icon(
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />,
  "0 0 24 24"
);

export const BrushIcon = icon(
  <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
);

export const CompassIcon = icon(
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5 7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
);

export const PlayIcon = icon(
  <path d="M8 5v14l11-7z" />
);

export const PauseIcon = icon(
  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
);

export const SkipBackIcon = icon(
  <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
);

export const SkipForwardIcon = icon(
  <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
);

export const ShuffleIcon = icon(
  <path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
);

export const RepeatIcon = icon(
  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
);

export const VolumeIcon = icon(
  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
);

export const HeartIcon = icon(
  <path d="M12 21.593c-.425-.052-8.42-5.7-8.42-11.178C3.58 6.55 5.865 4 8.58 4c1.512 0 2.886.756 3.42 1.89C12.534 4.756 13.908 4 15.42 4c2.715 0 5 2.55 5 6.415 0 5.477-7.995 11.126-8.42 11.178z" />
);

export const ResonanceLogoIcon = icon(
  <>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 9a4 4 0 0 1 8 0c0 3-2 4-4 6-2-2-4-3-4-6z" />
    <circle cx="12" cy="18" r="1.5" />
  </>,
  "0 0 24 24"
);
