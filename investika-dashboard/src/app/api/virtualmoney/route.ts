
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
  } catch (error: any) { 
    console.error('Error fetching virtual money:', error.message || error);
    
  
    return NextResponse.json({ error: error.message || 'Failed to fetch virtual money' }, { status: 500 });
  }
}
