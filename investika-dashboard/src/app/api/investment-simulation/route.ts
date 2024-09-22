
import { NextResponse } from 'next/server';


const baseUrl = process.env.BASE_URL;

export async function GET() {
  try {
   
    const response = await fetch(`${baseUrl}/api/investment-simulations/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch simulations: ${response.statusText} (Status: ${response.status})`);
    }


    const simulations = await response.json();

    
    return NextResponse.json(simulations);
  } catch (error: any) {
    console.error('Error fetching simulations:', error.message || error);

   
    return NextResponse.json({ error: error.message || 'Failed to fetch simulations' }, { status: 500 });
  }
}
