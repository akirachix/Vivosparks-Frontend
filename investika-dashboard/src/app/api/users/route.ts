// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://investika-fed709cc5cec.herokuapp.com/api/users/');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users = await response.json();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
