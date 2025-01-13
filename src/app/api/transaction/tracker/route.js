import { NextResponse } from "next/server";
import Tracker from '@/app/models/Tracker';
import { connectDB } from "@/app/lib/db";

export async function GET(request) {
  try {
    await connectDB();
    const trackers = await Tracker.find();
    return NextResponse.json(trackers);
  } catch (err) {
    console.error(`Fail fetching trackers`, err.message);
    return NextResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}

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
    } catch (err) {
      console.error(`Fail saving new tracker`, err.message);
      NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
}