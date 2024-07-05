"use server";

import mongoose from "mongoose";
import { connectDB } from "../lib/db";
import Tracker from "@/app/models/Tracker";
import History from "@/app/models/History";
import { revalidatePath } from "next/cache";

/**
 * Get all trackers
 * @returns {[]}
 */
const getTrackers = async () => {
  const trackers = await Tracker.find();
  return trackers;
};

/**
 * Create a new tracker in the database
 * @param {*} newTracker
 * @returns {{ success: boolean, message: string }}
 */
const createTracker = async (newTracker) => {
  if (!newTracker.title)
    return { success: false, message: "Title is required" }; // if no title is present
  try {
    await connectDB();
    // check to see if tracker exist
    let tracker = await Tracker.findOne({ title: newTracker.title });
    // if tracker already exist
    if (tracker)
      return {
        success: false,
        message: "Tracker already exist, please use a different name.",
      };
    tracker = await Tracker.create(newTracker); // create tracker
    revalidatePath('/tracker');
    return { success: true, message: `tracker ${tracker.title} has been added` }; // return result
  } catch (error) {
    console.error(error);
  }
};

/**
 * Remove tracker
 * @param {mongoose.Schema.Types.ObjectId} _id
 * @returns { {success: boolean, message: string} }
 */
const removeTracker = async (_id) => {
  try {
    const [trackerStatus, historyStatus] = await Promise.all([
      Tracker.findByIdAndDelete(_id),
      History.deleteMany({ trackerId: [_id] }),
    ]);
    // if one of the deletion fail
    if (!trackerStatus || !historyStatus)
      return { success: false, message: "Unable to remove tracker" };
    // remove all transaction history associated with this id;
    revalidatePath("/tracker");
    return { success: true, message: `Tracker removed` };
  } catch (error) {
    console.error(`Fail trying to remove tracker`, error);
    return { success: false, message: "Something went wrong" };
  }
};

export { getTrackers, removeTracker, createTracker };
