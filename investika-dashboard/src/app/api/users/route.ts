
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
  } catch (error: any) {
    console.error('Error fetching users:', error.message || error);
    
  
    return NextResponse.json({ error: error.message || 'Failed to fetch users' }, { status: 500 });
  }
}
