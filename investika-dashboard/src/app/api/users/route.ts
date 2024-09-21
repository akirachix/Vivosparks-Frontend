import { NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
  throw new Error('BASE_URL environment variable is not defined');
}

export async function GET() {
  try {
    const response = await fetch(`${baseUrl}/api/users/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const users = await response.json();

    return NextResponse.json(users);
  } catch (error: unknown) { 
    if (error instanceof Error) {
      console.error('Error fetching users:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error fetching users:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
  }
}
