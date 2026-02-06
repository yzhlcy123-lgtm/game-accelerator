# Game Accelerator

一个基于 Next.js 的游戏加速网站，通过 Cloudflare Workers 边缘代理实现加速访问。

## 功能特性

- 🚀 CDN 加速：使用 Cloudflare Workers 边缘代理
- 📊 实时延迟监控：显示连接延迟和稳定性
- 🌐 多连接模式：直连、加速、游戏加速器模式切换
- 🎮 游戏资源优化：针对游戏资源进行加速优化

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **部署**: Vercel
- **加速**: Cloudflare Workers

## 环境变量

```env
NEXT_PUBLIC_GAME_ORIGIN=https://openfront.io
NEXT_PUBLIC_PROXY_ENABLED=true
NEXT_PUBLIC_CACHE_MAX_AGE=3600
