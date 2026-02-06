'use client';

import { useState, useEffect } from 'react';

interface LatencyDisplayProps {
  gameOrigin: string;
  mode: string;
}

export default function LatencyDisplay({ gameOrigin, mode }: LatencyDisplayProps) {
  const [latency, setLatency] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLatency = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/latency?gameOrigin=${encodeURIComponent(gameOrigin)}&mode=${mode}`);
      const data = await response.json();

      if (data.success) {
        setLatency(data.latency);
      } else {
        setError(data.error || '检测失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatency();
    const interval = setInterval(fetchLatency, 5000);
    return () => clearInterval(interval);
  }, [gameOrigin, mode]);

  const getLatencyColor = (ms: number) => {
    if (ms < 100) return 'text-green-600';
    if (ms < 200) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-sm text-gray-600">延迟:</span>
      </div>
      
      {loading ? (
        <div className="text-sm text-gray-400">检测中...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : latency !== null ? (
        <div className={`text-lg font-bold ${getLatencyColor(latency)}`}>
          {latency}ms
        </div>
      ) : (
        <div className="text-sm text-gray-400">待检测</div>
      )}
    </div>
  );
}
