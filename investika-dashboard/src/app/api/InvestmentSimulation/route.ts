// api/InvestmentSimulations/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://investika-fed709cc5cec.herokuapp.com/api/investment-simulations/');
    if (!response.ok) {
      throw new Error('Failed to fetch simulations');
    }

    const simulations = await response.json();
    return NextResponse.json(simulations); // Return the list of simulations
  } catch (error) {
    console.error('Error fetching simulations:', error);
    return NextResponse.json({ error: 'Failed to fetch simulations' }, { status: 500 });
  }
}
