'use client';

import React, { useState } from 'react';
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
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Token, TokenDocument } from '@/types/token';
import { DateRange } from 'react-day-picker';

interface TokenChartProps {
    data: TokenDocument[];
}

type TokenType = {
    timestamp: string;
    price: number;
}

const TokenChart = ({data}: TokenChartProps) => {
    const krData = data[0].kr;

    const [dateRange, setDateRange] = React.useState<DateRange>({
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date()
    });

    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const chartData = krData.sort((a: TokenType, b: TokenType) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ).map((item: any) => ({
        name: new Date(item.timestamp).toLocaleDateString(),
        price: item.price,
    }))

    const filteredData = krData.filter((item: TokenType) => {
        const date = new Date(item.timestamp);
        if (dateRange.from && dateRange.to) {
            return date >= dateRange.from && date <= dateRange.to;
        }
        return true; // 날짜 범위가 없으면 모든 데이터 표시
    })
    .map((item: any) => ({
        name: new Date(item.timestamp).toLocaleDateString(),
        price: item.price,
    }));

    return (
        <div className="w-[66vw] h-[400px] max-w-[1200px] items-center">
            <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
            />

            <ResponsiveContainer width='100%' height='100%'>
                <LineChart 
                    data={filteredData} 
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
                                        padding: '8px',
                                        textAlign: 'center'
                                    }}>
                                        <p style={{ color: '#666' }}>
                                            {`${label} 10:00 기준`}
                                        </p>
                                        <p style={{ color: '#fa812a', fontWeight: 'bold' }}>
                                            {`${payload[0].value?.toLocaleString()} 골드`}
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
                    <Legend 
                        verticalAlign="bottom" 
                        align="center"
                        wrapperStyle={{
                            paddingTop: "20px",
                            marginLeft: "30px"
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#fa812a"
                        activeDot={{ r: 8 }}
                        name="골드"
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