'use client';

import { useState, useEffect } from 'react';

interface LatencyStatsProps {
  gameOrigin: string;
  mode: string;
}

export default function LatencyStats({ gameOrigin, mode }: LatencyStatsProps) {
  const [stats, setStats] = useState({
    min: null as number | null,
    max: null as number | null,
    avg: null as number | null,
    samples: [] as number[],
  });

  useEffect(() => {
    const fetchLatency = async () => {
      try {
        const response = await fetch(`/api/latency?gameOrigin=${encodeURIComponent(gameOrigin)}&mode=${mode}`);
        const data = await response.json();

        if (data.success && data.latency) {
          setStats(prev => {
            const newSamples = [...prev.samples, data.latency].slice(-20);
            return {
              min: Math.min(...newSamples),
              max: Math.max(...newSamples),
              avg: Math.round(newSamples.reduce((a, b) => a + b, 0) / newSamples.length),
              samples: newSamples,
            };
          });
        }
      } catch (error) {
        console.error('Failed to fetch latency:', error);
      }
    };

    fetchLatency();
    const interval = setInterval(fetchLatency, 3000);
    return () => clearInterval(interval);
  }, [gameOrigin, mode]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {stats.min !== null ? `${stats.min}ms` : '--'}
          </div>
          <div className="text-xs text-gray-600">最低延迟</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {stats.avg !== null ? `${stats.avg}ms` : '--'}
          </div>
          <div className="text-xs text-gray-600">平均延迟</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {stats.max !== null ? `${stats.max}ms` : '--'}
          </div>
          <div className="text-xs text-gray-600">最高延迟</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>延迟波动</span>
          <span>{stats.samples.length} 次采样</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all"
            style={{ width: `${stats.avg ? Math.min((stats.avg / 500) * 100, 100) : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
