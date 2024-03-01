import { NextResponse } from "next/server";
import Tracker from '@/app/models/Tracker';

export async function POST(request) {
    // get json body from request
    const json = await request.json();
    // if not proper json data
    if (!json) {
      return NextResponse.json(
        { error: `Missing required resource` },
        { status: 400 }
      );
    }
    try {
      // save new tracker
      const result = await Tracker.create(json);
      // if result is undefined then return error response
      if (!result) return NextResponse.json({ message: 'unable to save new tracker' }, { status: 400 });
      // return success response
      return NextResponse.json({ tracker: result }, { status: 201 });
    } catch (error) {
      console.error(`Fail saving new tracker`, error);
      NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
}