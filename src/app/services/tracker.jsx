'use server';
import { connectDB } from '../lib/db';
import Tracker from '@/app/models/Tracker';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

const getTrackers = async () => {
  const trackers = await Tracker.find();
  return trackers;
}

const createTracker = async (prevState, formData) => {
  const title = formData.get('title');
  if (!title) return { success: false, message: 'Title is required'};
  try {
    await connectDB();
    // check to see if tracker exist
    let tracker = await Tracker.findOne({ title });
    // if tracker already exist
    if (tracker) return { success: false, message: 'Tracker already exist, please use a different name.' };
    // create tracker
    tracker = await Tracker.create({ title });
    // reload path
    revalidatePath('/tracker')
    // return result
    return { success: true,  message: `tracker ${title} has been added` };
  } catch (error) {
    return { success: false, message: `Fail to create tracker` };
  }
}

/**
 * Remove tracker
 * @param {mongoose.Schema.Types.ObjectId} _id 
 * @returns
 */
const removeTracker = async (_id) => {
  try {
    const updated = await Tracker.findByIdAndDelete(_id);
    if (!updated) return { success: false, message: 'Unable to remove tracker' };
    revalidatePath('/tracker');
    return { success: true, message: `Tracker removed` };
  } catch (error) {
    console.error(`Fail trying to remove tracker`, error);
    return { success: false, message: 'Something went wrong' };
  }
}

export { 
  getTrackers, 
  removeTracker, 
  createTracker 
};