import { NextResponse } from 'next/server';
 const apiUrl = process.env.BASE_URL

export async function GET() {
  const res = await fetch(`${apiUrl}/api/markets/`);
  const data = await res.json();
  return NextResponse.json(data);
}
