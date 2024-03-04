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
  const { field } = params;
  // if title is undefined
  if (!field) {
    // return error
    return NextResponse(
      { error: `Missing required resources` },
      { status: 400 }
    );
  }
  const trackerId = field.split('title')[0].split('=')[1].trim();
  const title = field.split('title=')[1];
  try {
    await connectDB(); // connect to database
    // get the history with the same title
    const history = await History.findOne({ $and: 
      [
        { trackerId },
        { title }
      ] 
    });
    return NextResponse.json(history);
  } catch (error) {
    console.error(`${new Date().toISOString()} - ${error}`);
    return NextResponse({ error: `Internal Server Error` }, { status: 500 });
  }
}


export async function POST(request, { params }) {
  const { field: id } = params;
  if (!id) {
    // return error
    return NextResponse(
      { error: `Missing required resources` },
      { status: 400 }
    );
  }
  try {
    await connectDB();
    const histories = await History.find({ trackerId: id });
    return NextResponse.json({ histories });
  } catch (error) {
    console.error(`Fail trying to fetch histories with trackerId`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  // destructure title from url params
  const { field: id } = params;
  if (!id) {
    // return error
    return NextResponse(
      { error: `Missing required resources` },
      { status: 400 }
    );
  }
  try {
    await connectDB(); // connect to database
    // get the history with the same title
    const history = await History.findByIdAndDelete(id);
    return NextResponse.json(history);
  } catch (error) {
    console.error(`${new Date().toISOString()} - ${error}`);
    return NextResponse({ error: `Internal Server Error` }, { status: 500 });
  }
}
