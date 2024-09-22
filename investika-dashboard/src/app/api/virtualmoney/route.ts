import { NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

export async function GET() {
 
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not defined');
    return NextResponse.json(
      { error: 'BASE_URL environment variable is not defined' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${baseUrl}/api/virtualmoney/`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch virtual money data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const virtualMoney = await response.json();

    return NextResponse.json(virtualMoney, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching virtual money:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error fetching virtual money:', error);
      return NextResponse.json({ error: 'Failed to fetch virtual money' }, { status: 500 });
    }
  }
}
