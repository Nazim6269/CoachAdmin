"use client";

import { ReactNode } from "react";
import SingleStatCard from "./SingleStatCard";
import { SingleStatCardSkeleton } from "./skeleton/SingleStatCardSkeleton";

type StatCard = {
  icon: ReactNode;
  title: string;
  value: number;
};

type StatCardsProps = {
  statCards: StatCard[];
  isLoading?: boolean;
  isError?: boolean;
};

export default function StatCards({
  statCards = [],
  isLoading = false,
  isError = false,
}: StatCardsProps) {

  const count = statCards.length || 4;

  if (isError) {
    return (
      <div className="text-red-500 text-sm">
        Failed to load statistics
      </div>
    );
  }

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: count }).map((_, idx) => (
          <SingleStatCardSkeleton key={idx} />
        ))
        : statCards.map((card, idx) => (
          <SingleStatCard
            key={idx}
            icon={card.icon}
            title={card.title}
            value={card.value}
          />
        ))}
    </div>
  );
}