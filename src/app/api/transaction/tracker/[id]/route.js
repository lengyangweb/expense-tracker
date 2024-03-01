import Tracker from '@/app/models/Tracker';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  // destructure title from url params
  const { id } = params;
  if (!id) {
    // return error
    return NextResponse(
      { error: `Missing required resources` },
      { status: 400 }
    );
  }
  try {
    // get the history with the same title
    const result = await Tracker.findByIdAndDelete(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error(`${new Date().toISOString()} - ${error}`);
    return NextResponse({ error: `Internal Server Error` }, { status: 500 });
  }
}