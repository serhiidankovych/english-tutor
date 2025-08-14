import React from "react";

interface VideoSectionProps {
  videoUrl: string;
  videoTitle?: string;
}

export function VideoSection({ videoUrl, videoTitle }: VideoSectionProps) {
  if (!videoUrl) return null;

  return (
    <div className="mb-16 " id="video-section">
      <iframe
        allowFullScreen
        className="w-full aspect-video rounded-2xl shadow-xl border-0"
        title={videoTitle || "Introduction Video"}
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
}
