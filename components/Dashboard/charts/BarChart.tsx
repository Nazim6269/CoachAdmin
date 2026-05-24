import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
} from "recharts";

const RoundedBar = (props) => {
    const { x, y, width, height, fill } = props;
    const radius = 10;
    if (!height || height <= 0) return null;
    return (
        <path
            d={`
        M${x + radius},${y}
        h${width - 2 * radius}
        a${radius},${radius} 0 0 1 ${radius},${radius}
        v${height - radius}
        h${-(width)}
        v${-(height - radius)}
        a${radius},${radius} 0 0 1 ${radius},${-radius}
        z
      `}
            fill={fill}
        />
    );
};

export default function SessionTypesChart({ data }: { data: any }) {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div
            className="w-full p-2 md:p-4 bg-primaryColor rounded-lg font-[DM Sans] border border-[rgba(255,255,255,0.06)] "
        >
            <h2 className="text-whiteColor text-xl font-bold  mb-4 ">Session Types</h2>
            <hr className="mb-5 border-t-secondaryColor" />

            <ResponsiveContainer width="100%" height={285}>
                <BarChart
                    data={data}
                    margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                    barCategoryGap="35%"
                >
                    <CartesianGrid
                        vertical={false}
                        stroke="#2a2a45"
                        strokeDasharray="4 4"
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#7070a0", fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#7070a0", fontSize: 12 }}
                    />
                    <Bar
                        dataKey="uv"
                        shape={<RoundedBar />}
                        barSize={50}
                        onMouseEnter={(_, index) => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        {data?.map((_, index) => (
                            <Cell
                                key={index}
                                fill={activeIndex === index ? "#214cc2ff" : "#0a54ddff"}
                                style={{ transition: "fill 0.2s ease", cursor: "pointer", }}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}