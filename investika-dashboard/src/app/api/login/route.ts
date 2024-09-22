import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

interface LoginRequestBody {
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json(
      { error: 'BASE_URL environment variable is not set.' },
      { status: 500 }
    );
  }

  try {
    const { username, password } = await request.json() as LoginRequestBody;

    if (!username || !password) {
      console.error('Validation failed: Missing username or password');
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const response = await fetch(`${baseUrl}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const textResponse = await response.text();
    console.log('Backend response:', textResponse, 'Status:', response.status);

    if (!response.ok) {
      try {
        const errorData = textResponse;
        return NextResponse.json(
          { error: errorData || 'Login failed. Invalid credentials.' },
          { status: response.status }
        );
      } catch (e) {
        return NextResponse.json(
          { error: (e as Error).message },
          { status: response.status }
        );
      }
    }

    const result = JSON.parse(textResponse);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    // Handle unexpected errors
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
