
// import { NextResponse } from 'next/server';


// const baseUrl = process.env.BASE_URL;

// export async function GET() {
//   try {
   
//     const response = await fetch(`${baseUrl}/api/markets/`);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch market: ${response.statusText} (Status: ${response.status})`);
//     }


//     const markets = await response.json();

    
//     return NextResponse.json(markets);
//   } catch (error: any) {
//     console.error('Error fetching market:', error.message || error);

   
//     return NextResponse.json({ error: error.message || 'Failed to fetch market' }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseUrl}/api/markets/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch market: ${response.statusText} (Status: ${response.status})`);
    }

    const markets = await response.json();

    return NextResponse.json(markets);
  } catch (error) {
    console.error('Error fetching market:', error instanceof Error ? error.message : String(error));

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
