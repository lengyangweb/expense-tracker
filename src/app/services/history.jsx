'use server';
import History from '@/app/models/History';
import { revalidatePath } from 'next/cache';

/**
 * Get all of the transaction history associated with the trackerId
 * @param {import('mongoose').ObjectId} trackerId 
 * @returns 
 */
const getHistories = async (trackerId) => {
  try {
    const histories = await History.find({ trackerId });
    return histories;
  } catch (error) {
    console.error(`Error fetching histories`, error);
    return null;
  }
}

/**
 * Get a transaction history
 * @param {import('mongoose').ObjectId} trackerId 
 * @param {String} title 
 * @returns 
 */
const getHistory = async (trackerId, title) => {
  try {
    const history = await History.find({ $and: 
      [
        { trackerId },
        { title }
      ] 
    });
    return history;
  } catch (error) {
    console.error(`Error fetching history`, error);
    return;
  }
}

/**
 * Create a new transaction
 * @param {object} history 
 * @returns {object}
 */
const createHistory = async (history) => {
  try {
    const newHistory = await History.create(history);
    if (!newHistory) return { success: false, message: ``}
    revalidatePath(`/tracker/history/${history.trackerId}`);
    return { success: true, message: `History added` };
  } catch (error) {
    console.error(`Error trying to create history`, error);
    return { success: false, message: `Something went wrong` };
  }
}
/**
 * Remove transaction history
 * @param {import('mongoose').ObjectId} _id 
 * @returns 
 */
const removeHistory = async (_id) => {
  try {
    const history = await History.findByIdAndDelete(_id);
    if (!history) return { success: false, message: 'Unable to remove history' };
    revalidatePath(`/tracker/history/${history.trackerId}`)
    return { success: true, message: 'History remove' };
  } catch (error) {
    console.error(`Error removing history`, error);
    return { success: false, message: 'Something went wrong' };
  }
}

export { getHistories, getHistory, createHistory, removeHistory };