import React, { useState, useEffect, useContext } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { format, startOfHour, addHours } from 'date-fns';
import { getSumpDepthHistory, getSumpDailyHistory } from '../../../utilities/RestApi';
import { Context } from '../../../state/Store';
import './SumpDepthChart.scss';


export default function SumpDepthChart() {
    const [state,] = useContext(Context);
    const [historyData, setHistoryData] = useState([]);
    const [selectedRange, setSelectedRange] = useState('today');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHistory(selectedRange);
    }, [selectedRange]);

    const fetchHistory = async (range) => {
        setHistoryData([]);
        setLoading(true);
        try {
            const response = range === 'today'
                ? await getSumpDepthHistory()
                : await getSumpDailyHistory(range === '7d' ? 7 : 30);
            const readings = response.readings || [];
            const converted = readings.map(r => ({ depth: r.depth, timestamp: new Date(r.dateTime || r.date).getTime() }));
            setHistoryData(converted);
        } catch {
            setHistoryData([]);
        }
        setLoading(false);
    };

    const getCssVar = (name) => {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    };

    const getHourlyTicks = () => {
        if (historyData.length === 0) return [];
        const firstTime = historyData[0].timestamp;
        const lastTime = historyData[historyData.length - 1].timestamp;
        const ticks = [];
        let current = startOfHour(addHours(new Date(firstTime), 1));
        while (current.getTime() <= lastTime) {
            ticks.push(current.getTime());
            current = addHours(current, 1);
        }
        return ticks;
    };

    const getYDomain = () => {
        if (historyData.length === 0) return [0, 10];
        const depths = historyData.map(r => r.depth);
        const max = Math.max(...depths);
        return [0, Math.ceil(max * 1.4)];
    };

    const formatTick = (timestamp) => {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return '';
        if (selectedRange === 'today') return format(date, 'h a');
        if (selectedRange === '7d') return format(date, 'EEE');
        return format(date, 'MMM d');
    };

    const formatTooltipLabel = (timestamp) => {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return '';
        if (selectedRange === 'today') return format(date, 'h:mm a');
        return format(date, 'MMM d, yyyy');
    };

    const renderRangeButtons = () => {
        const ranges = [
            { key: 'today', label: 'Today' },
            { key: '7d', label: '7d' },
            { key: '30d', label: '30d' },
        ];
        return (
            <div className="range-button-group">
                {ranges.map(r =>
                    <button
                        key={r.key}
                        type="button"
                        className={'range-button text' + (selectedRange === r.key ? ' range-button-active' : '')}
                        onClick={() => setSelectedRange(r.key)}
                    >
                        {r.label}
                    </button>
                )}
            </div>
        );
    };

    const getChartColor = () => {
        if (state.sumpData.warningLevel === 3) return '#e53935';
        if (state.sumpData.warningLevel === 2) return '#f57c00';
        return '#00c774';
    };

    const renderChart = () => {
        if (loading) {
            return <p className="chart-empty text">Loading...</p>;
        }
        if (historyData.length === 0) {
            return <p className="chart-empty text">No history available</p>;
        }
        const fontColor = getCssVar('--font-color');
        const chartColor = getChartColor();
        const unit = state.sumpData.depthUnit || '';
        return (
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={historyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="depthGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={chartColor} stopOpacity={0.25} />
                                <stop offset="100%" stopColor={chartColor} stopOpacity={0.03} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={formatTick}
                            ticks={selectedRange === 'today' ? getHourlyTicks() : undefined}
                            tick={{ fontSize: 10, fill: fontColor }}
                            axisLine={false}
                            tickLine={false}
                            type="number"
                            domain={['dataMin', 'dataMax']}
                            scale="time"
                        />
                        <YAxis
                            tick={{ fontSize: 10, fill: fontColor }}
                            axisLine={false}
                            tickLine={false}
                            domain={getYDomain()}
                            allowDataOverflow={true}
                            reversed={true}
                        />
                        <Tooltip
                            labelFormatter={formatTooltipLabel}
                            formatter={(value) => [value.toFixed(1) + ' ' + unit, 'Distance']}
                            contentStyle={{
                                backgroundColor: getCssVar('--primary-color'),
                                border: '1px solid ' + getCssVar('--border-color'),
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                color: fontColor,
                            }}
                            labelStyle={{ color: fontColor }}
                        />
                        <Area
                            type="monotone"
                            dataKey="depth"
                            stroke={chartColor}
                            strokeWidth={1.5}
                            fill="url(#depthGradient)"
                            dot={false}
                            activeDot={{ r: 3, fill: chartColor }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <div className="sump-chart-container">
            {renderRangeButtons()}
            {renderChart()}
        </div>
    );
}
