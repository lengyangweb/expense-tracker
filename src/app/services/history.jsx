'use server';
import History from '@/app/models/History';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SchemaType } from 'mongoose';

/**
 * Redirect to designated _id page
 * @param {string} _id 
 */
const redirecToHistory = (_id) => {
  redirect(`/tracker/history/${_id}`);
}

/**
 * Get all of the transaction history associated with the trackerId
 * @param {import('mongoose').ObjectId} trackerId 
 * @returns {Promise<[]>}
 */
const getHistories = async (trackerId) => {
  try {
    const histories = await History.find({ trackerId }); // get all histories with the associated trackerId
    return histories;
  } catch (err) {
    console.error(`Error fetching histories`, err.message);
    return null;
  }
}

/**
 * Get a transaction history
 * @param {import('mongoose').ObjectId} trackerId 
 * @param {String} title 
 * @returns {Object}
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
  } catch (err) {
    console.error(`Error fetching history`, err.message);
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
  } catch (err) {
    console.error(`Error trying to create history`, err.message);
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
  } catch (err) {
    console.error(`Error removing history`, err.message);
    return { success: false, message: 'Something went wrong' };
  }
}

export { 
  getHistories, 
  getHistory, 
  createHistory, 
  removeHistory,
  redirecToHistory
};