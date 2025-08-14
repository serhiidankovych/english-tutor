"use client";
import React from "react";

const AnimationHoverContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative group">
      <div className="star-container">
        <div className="star">📚</div>
        <div className="star">✏️</div>
        <div className="star">🎓</div>
        <div className="star">💡</div>
        <div className="star">🗣️</div>
      </div>
      <div className="relative z-10 group-hover:animate-pulse">{children}</div>

      <style jsx>{`
        .star-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .star {
          position: absolute;
          font-size: 1.8rem;
          opacity: 0;
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.4));
          will-change: transform, opacity;
        }

        @keyframes star-burst {
          0% {
            transform: scale(0.3) rotate(0deg) translate(0, 0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            transform: scale(1.2) rotate(180deg) translate(10px, -20px);
          }
          80% {
            transform: scale(0.9) rotate(270deg) translate(-20px, -50px);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.6) rotate(360deg) translate(30px, -100px);
            opacity: 0;
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 12px rgba(246, 59, 59, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 24px rgba(246, 96, 59, 0.8);
            transform: scale(1.02);
          }
        }

        .group:hover .relative.z-10 {
          animation: glow 1.6s ease-in-out infinite;
          border-radius: 12px;
        }

        .group:hover .star:nth-child(1) {
          animation: star-burst 1.3s ease-out forwards;
          animation-delay: 0.1s;
          top: 20%;
          left: 20%;
        }

        .group:hover .star:nth-child(2) {
          animation: star-burst 1.3s ease-out forwards;
          animation-delay: 0.2s;
          top: 80%;
          left: 10%;
        }

        .group:hover .star:nth-child(3) {
          animation: star-burst 1.3s ease-out forwards;
          animation-delay: 0.3s;
          top: 10%;
          left: 85%;
        }

        .group:hover .star:nth-child(4) {
          animation: star-burst 1.3s ease-out forwards;
          animation-delay: 0.4s;
          top: 90%;
          left: 70%;
        }

        .group:hover .star:nth-child(5) {
          animation: star-burst 1.3s ease-out forwards;
          animation-delay: 0.5s;
          top: 50%;
          left: 95%;
        }
      `}</style>
    </div>
  );
};

export default AnimationHoverContainer;
