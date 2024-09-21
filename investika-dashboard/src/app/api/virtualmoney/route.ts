import { NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
  throw new Error('BASE_URL environment variable is not defined');
}

export async function GET() {
  try {
    const response = await fetch(`${baseUrl}/api/virtualmoney/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch virtual money data: ${response.statusText}`);
    }

    const virtualMoney = await response.json();

    return NextResponse.json(virtualMoney);
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
