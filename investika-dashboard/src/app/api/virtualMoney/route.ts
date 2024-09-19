// api/VirtualMoney/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://sawatok-928bcdb582b7.herokuapp.com/api/virtualmoney/');
    if (!response.ok) {
      throw new Error('Failed to fetch virtual money data');
    }

    const virtualMoney = await response.json();
    return NextResponse.json(virtualMoney); // Return the virtual money data
  } catch (error) {
    console.error('Error fetching virtual money:', error);
    return NextResponse.json({ error: 'Failed to fetch virtual money' }, { status: 500 });
  }
}
