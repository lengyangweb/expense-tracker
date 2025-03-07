"use server";

import mongoose from "mongoose";
import { connectDB } from "../lib/db";
import Tracker from "@/app/models/Tracker";
import History from "@/app/models/History";
import { revalidatePath } from "next/cache";
import { getUserInfo } from "../utilities/generateToken";

/**
 * Get a tracker record
 * @param {mongoose.Schema.Types.ObjectId} trackerID 
 * @returns {Promise<mongoose.Document>}
 */
const getTracker = async (trackerID) => {
  const tracker = await Tracker.findById(trackerID);
  return tracker;
}

/**
 * Get all user trackers
 * @param {mongoose.Schema.Types.ObjectId} userId
 * @returns {Promise<mongoose.Document[]>}
 */
const getUserTrackers = (userId) => {
  return new Promise(async(resolve, reject) => {
    try {
      await connectDB(); // connect to the database
      const trackers = await Tracker.find({ userId }); // query user trackers
      resolve(trackers);
    } catch (error) {
      reject(error);
    }
  })
};

/**
 * Create a new tracker in the database
 * @param {*} newTracker
 * @returns {{ success: boolean, message: string }}
 */
const createTracker = async (newTracker) => {
  const { userId } = getUserInfo();
  if (!userId) return { success: false, message: 'No userId.' };
  if (!newTracker.title) return { success: false, message: "Title is required" };
  
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
    tracker = await Tracker.create({ ...newTracker, userId }); // create tracker
    revalidatePath('/tracker');
    return { success: true, message: `tracker ${tracker.title} has been added` }; // return result
  } catch (err) {
    console.error(err.message);
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
  } catch (err) {
    console.error(`Fail trying to remove tracker`, err.message);
    return { success: false, message: "Something went wrong" };
  }
};

export { getTracker, getUserTrackers, removeTracker, createTracker };
