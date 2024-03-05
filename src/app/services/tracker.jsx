'use server';
import { connectDB } from '../lib/db';
import Tracker from '@/app/models/Tracker';
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
    if (tracker) return { success: false, message: 'Tracker already exist' };
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

const removeTracker = async (_id) => {
  const updated = await Tracker.findByIdAndDelete(_id);
  return updated;
}

export { 
  getTrackers, 
  removeTracker, 
  createTracker 
};