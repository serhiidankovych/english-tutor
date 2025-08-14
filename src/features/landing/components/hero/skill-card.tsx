"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export interface SkillCardProps {
  value: string;
  highlight: string;
  image: string;
}

export function SkillCard({ value, highlight, image }: SkillCardProps) {
  const cardVariants = {
    initial: {
      y: 0,
      scale: 1,
    },
    hover: {
      y: -5,
      scale: 1.03,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="relative flex flex-col items-start justify-center text-left p-5 overflow-hidden border bg-card/60 rounded-2xl h-full min-h-[120px]">
        <div className="absolute right-0 w-28 h-28 transition-opacity duration-300 -rotate-12 overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={`${highlight} graphic`}
            fill
            className="object-contain"
          />
        </div>
        <div className="relative z-10 flex flex-col items-start justify-between h-full gap-4">
          <div className="flex-grow pr-25">
            <p className="text-base font-semibold text-foreground">{value}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
