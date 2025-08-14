import React from "react";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassContainer = ({
  children,
  className,
}: GlassContainerProps) => {
  return (
    <div
      className={`
        grid p-1 bg-white/10 backdrop-blur-sm 
        border-white/50 border-2 rounded-xl shadow-lg 
        ${className} 
      `}
    >
      {children}
    </div>
  );
};
