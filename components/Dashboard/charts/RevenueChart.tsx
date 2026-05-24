'use client'

import {
    LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any; label?: string }) => {
    if (active && payload?.length) {
        return (
            <div style={{
                backgroundColor: "#1f335fff", borderRadius: "8px",
                padding: "10px 14px", color: "#fff", fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif", position: "relative",
            }}>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>
                    Revenue : ${payload[0].value.toLocaleString()}
                </div>
                <div style={{
                    position: "absolute", bottom: -8, left: "50%",
                    transform: "translateX(-50%)", width: 0, height: 0,
                    borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
                    borderTop: "8px solid #19336bff",
                }} />
            </div>
        );
    }
    return null;
};

const CustomDot = (props: any) => {
    const { cx, cy, payload, activePoint } = props;
    if (activePoint?.name === payload?.name) {
        return (
            <g>
                <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#fff" strokeWidth={2} />
                <circle cx={cx} cy={cy} r={3} fill="#2563eb" />
            </g>
        );
    }
    return null;
};

export default function RevenueChart({ data, activePoint, setActivePoint, tag }: { data: any, activePoint: any, setActivePoint: any, tag?: string }) {
    const ticks = data?.map((item: any) => item.revenue);
    return (
        <div className="bg-[#1b1b1b] rounded-2xl p-0 md:p-4 w-full " >
            <ResponsiveContainer width="100%" height={320}>
                <LineChart
                    data={data}
                    margin={{ top: 40, right: 20, left: 10, bottom: 10 }}
                    onMouseMove={(e: any) => {
                        if (e?.activePayload?.length) {
                            setActivePoint(e.activePayload[0].payload);
                        }
                    }}
                >
                    <CartesianGrid vertical={true} horizontal={false} stroke="rgba(255,255,255,0.1)" strokeDasharray="" />
                    <XAxis dataKey={tag === 'analytics' ? "label" : "month"} axisLine={false} tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }} dy={12} />
                    <YAxis axisLine={false} tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}
                        tickFormatter={(v) => v.toLocaleString()}
                        ticks={ticks} domain={[100, 650]} dx={-8} />
                    <Tooltip content={<CustomTooltip />} cursor={false} position={{ y: -10 }} />
                    <Line
                        type="monotoneX" dataKey="revenue"
                        stroke="rgba(255,255,255,0.85)" strokeWidth={1}
                        dot={<CustomDot activePoint={activePoint} />}
                        activeDot={{ r: 6, fill: "#2651adff", stroke: "#fff", strokeWidth: 2 }}
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}