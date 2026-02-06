import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameOrigin = searchParams.get('gameOrigin') || 'https://openfront.io';
  const mode = searchParams.get('mode') || 'accelerated';

  try {
    const startTime = performance.now();

    const response = await fetch(gameOrigin, {
      method: 'HEAD',
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });

    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);

    return NextResponse.json({
      success: true,
      latency,
      mode,
      status: response.status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      mode,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
