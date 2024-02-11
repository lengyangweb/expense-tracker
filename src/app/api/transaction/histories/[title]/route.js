import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import History from "@/app/models/History";
/**
 * Get all transaction histories
 * @param {*} request
 * @returns {Array}
 */
export async function GET(request, { params }) {
  // destructure title from url params
  const { title } = params;
  if (!title) {
    // return error
    return NextResponse(
      { error: `Missing required resources` },
      { status: 400 }
    );
  }
  try {
    await connectDB(); // connect to database
    // get the history with the same title
    const history = await History.findOne({ title });
    return NextResponse.json(history);
  } catch (error) {
    console.error(`${new Date().toISOString()} - ${error}`);
    return NextResponse({ error: `Internal Server Error` }, { status: 500 });
  }
}
