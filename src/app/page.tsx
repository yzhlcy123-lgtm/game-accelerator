'use client';

import { useState, useEffect } from 'react';
import LatencyDisplay from '@/components/latency-display';
import LatencyStats from '@/components/latency-stats';

export default function Home() {
  const [connectionMode, setConnectionMode] = useState<'direct' | 'accelerated' | 'gaming'>('accelerated');
  const [isProxyEnabled, setIsProxyEnabled] = useState(process.env.NEXT_PUBLIC_PROXY_ENABLED === 'true');
  const [gameOrigin] = useState(process.env.NEXT_PUBLIC_GAME_ORIGIN || 'https://openfront.io');

  useEffect(() => {
    setIsProxyEnabled(process.env.NEXT_PUBLIC_PROXY_ENABLED === 'true');
  }, []);

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'direct': return '直连模式';
      case 'accelerated': return 'CDN 加速';
      case 'gaming': return '游戏加速器';
      default: return '未知模式';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Game Accelerator
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className={`w-2 h-2 rounded-full ${isProxyEnabled ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span>{isProxyEnabled ? '代理已启用' : '代理未启用'}</span>
              </div>
              <LatencyDisplay gameOrigin={gameOrigin} mode={connectionMode} />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            海外游戏加速器
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            通过 Cloudflare Workers 边缘代理，降低国内访问延迟
          </p>

          <div className="flex justify-center space-x-4 mb-8">
            {(['direct', 'accelerated', 'gaming'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setConnectionMode(mode)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  connectionMode === mode
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {getModeLabel(mode)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">当前状态</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">连接模式</span>
                <span className="font-semibold text-gray-900">{getModeLabel(connectionMode)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">代理状态</span>
                <span className={`font-semibold ${isProxyEnabled ? 'text-green-600' : 'text-yellow-600'}`}>
                  {isProxyEnabled ? '已启用' : '未启用'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">游戏源站</span>
                <span className="font-semibold text-gray-900 truncate ml-4">{gameOrigin}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-
