'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList,
    TooltipProps,
} from "recharts";

type TokenType = {
    timestamp: string;
    price: number;
}

const TokenChart = (data: any) => {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const chartData = data.data[0].kr.sort((a: any, b: any) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ).map((item: any) => ({
        name: new Date(item.timestamp).toLocaleDateString(),
        price: item.price,
    }))

    return (
        <div className="w-[66vw] h-[400px]">
            <ResponsiveContainer width='100%' height='100%'>
                <LineChart 
                    data={chartData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis 
                        dataKey="name" 
                        padding={{ left: 30, right: 30 }} 
                    />
                    <YAxis 
                        domain={['dataMin - 5000', 'dataMax + 5000']}
                        tickFormatter={(value) => `${(value/10000).toFixed(1)}만`}
                    />

                    <Tooltip 
                        content={({ active, payload, label }: TooltipProps<number, string>) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div style={{ 
                                        backgroundColor: '#fff',
                                        border: '1px solid #ccc',
                                        padding: '8px'
                                    }}>
                                        <p style={{ color: '#666' }}>
                                            {`${label} 10:00 기준`}
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    {/* <Tooltip 
                        labelFormatter={(label) => `${label} 10:00 기준`}
                        formatter={(value) => value.toLocaleString()}  // 값만 표시
                        contentStyle={{ 
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            color: '#333',  // 텍스트 색상
                            margin: '0',
                        }}
                        labelStyle={{ color: '#666' }}  // 레이블(날짜) 색상
                        itemStyle={{ color: '#fa812a' }}
                    /> */}
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#fa812a"
                        activeDot={{ r: 8 }}
                    >
                        <LabelList 
                            position="top" 
                            offset={10}
                            fill="#fa812a"
                        />
                    </Line>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TokenChart;