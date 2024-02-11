import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import History from "@/app/models/History";
/**
 * Get all transaction histories
 * @param {*} request
 * @returns {Array}
 */
export async function GET(request) {
  try {
    // connect to database
    await connectDB();
    // get all histories in database
    const histories = await History.find();
    // return all histories
    return NextResponse.json(histories);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * Handle create transaction histories
 * @param {*} request
 * @returns
 */
export async function POST(request) {
  // get json body from request
  const json = await request.json();
  if (!json) {
    return NextResponse.json(
      { error: `Missing required resource` },
      { status: 400 }
    );
  }

  try {
    await connectDB(); // connect to database
    // create a new transaction history
    const history = await History.create(json);
    return NextResponse.json(history);
  } catch (error) {
    console.error(`${new Date().toISOString()} - ${error}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
