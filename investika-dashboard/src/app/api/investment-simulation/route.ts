import { NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
  throw new Error('BASE_URL environment variable is not defined');
}

export async function GET() {
  try {
    const response = await fetch(`${baseUrl}/api/investment-simulations/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch simulations: ${response.statusText} (Status: ${response.status})`);
    }

    const simulations = await response.json();

    return NextResponse.json(simulations);
  } catch (error: unknown) { 
    if (error instanceof Error) {
      console.error('Error fetching simulations:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error fetching simulations:', error);
      return NextResponse.json({ error: 'Failed to fetch simulations' }, { status: 500 });
    }
  }
}
