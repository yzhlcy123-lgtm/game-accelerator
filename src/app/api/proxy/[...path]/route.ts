import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }  // ✅ params 变成 Promise
) {
  const { path } = await params;  // ✅ 添加 await 解析 Promise
  const gameOrigin = process.env.NEXT_PUBLIC_GAME_ORIGIN || 'https://openfront.io';
  const url = `${gameOrigin}/${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': request.headers.get('User-Agent') || '',
      },
      cache: 'no-store',
    });

    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    const newResponse = new NextResponse(response.body, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });

    return newResponse;
  } catch (error) {
    return NextResponse.json(
      { error: 'Proxy failed' },
      { status: 500 }
    );
  }
}
