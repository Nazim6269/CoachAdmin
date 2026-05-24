'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import UserDistributionSkeleton from "../skeleton/UserDistributionSkeleton";
import { useDistributionActivity } from "@/hooks/dashboard/useDistributionActivity";
import { DEMO_USER_DISTRIBUTION } from "@/public/demoData/DemoData";



const COLORS = ["#ffffff", "#2563eb"];


export default function UserDistribution() {
    const { data: fetchData, refetch, isLoading, isError } = useDistributionActivity()
    const apiData = fetchData?.data ?? DEMO_USER_DISTRIBUTION;

    const chartData = [
        { name: "Coaches", value: apiData.coaches }, {
            name: "Athletes", value: apiData.athletes
        }
    ]
    const TOTAL = apiData.total

    if (isLoading) <UserDistributionSkeleton />
    return (
        <div
            className="bg-[#1b1b1b] rounded-lg p-4 w-full  border border-[#2d2d2d]"
        >

            {/* Title */}
            <div
                className="text-white text-md font-semibold mb-1"
            >
                User Distribution
            </div>
            <div
                className="border-b border-gray-600 mb-4"
            />

            {/* Donut Chart */}
            <div style={{ width: "100%", height: 242, position: "relative" }}>
                {/* Center label with background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-gray-900"
                    style={{
                        width: "70px",
                        height: "70px",
                        color: "#ffffff",
                        fontSize: 24,
                        fontWeight: 700,
                        fontFamily: "'DM Sans', sans-serif",
                        pointerEvents: "none",
                        zIndex: 10,
                    }}
                >
                    {TOTAL}
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        {/* Glow / shadow layer (slightly larger, low opacity) */}
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={58}
                            outerRadius={74}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
                            isAnimationActive={false}
                        >
                            {chartData.map((_, i) => (
                                <Cell
                                    key={i}
                                    fill={COLORS[i]}
                                    opacity={0.15}
                                    style={{ filter: "blur(4px)" }}
                                />
                            ))}
                        </Pie>

                        {/* Main donut */}
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={72}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
                            labelLine={false}
                        >
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 12 }}>
                {chartData.map((entry, i) => (
                    <div
                        key={entry.name}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: COLORS[i],
                                    flexShrink: 0,
                                }}
                            />
                            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
                                {entry.name}
                            </span>
                        </div>
                        <span style={{ color: "#ffffff", fontSize: 14, fontWeight: 600 }}>
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}