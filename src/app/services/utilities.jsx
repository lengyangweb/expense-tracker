'use server';

import { v4 as uuidv4 } from 'uuid';
import Utilities from "../models/Utility";
import { connectDB } from '../lib/db';
import { revalidatePath } from 'next/cache';

/**
 * Get all access codes
 * @returns {Promise<[]>}
 */
export async function getAccessCodes() {
    try {
        await connectDB();
        const { util_collection: accessCodes } = await Utilities.findOne({ util_name: 'access-codes' });
        return accessCodes;
    } catch (error) {
        console.error(`${new Date().toISOString()} - ${error}`);
        return;
    }
}

/**
 * Generate an access token
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function generateAccessCode() {
    try {
        await connectDB();
        const accessCode = uuidv4(); // generate access code
        // update in database
        const result = await Utilities.updateOne(
            { util_name: 'access-codes' },
            { $push: { util_collection: accessCode } }
        );
        if (!result.acknowledged) return { success: false, message: `GENERATE ACCESS CODE ERROR: unable to generate an access code` };
        revalidatePath('/admin-config');
        return { success: true, message: `Access Code has been created.` };
    } catch (error) {
        console.error(`${new Date().toISOString()} - ${error}`);
        return { success: false, message: 'Internal Server Error' };
    }
}

/**
 * Remove access code 
 * @param {string[]} accessCode 
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function removeAccessCode(accessCodes) {
    try {
        await connectDB();
        // update in database
        const result = await Utilities.updateOne(
            { util_name: 'access-codes' },
            { util_collection: accessCodes }
        );
        if (!result.acknowledged) return { success: false, message: 'Unable to remove code' };
        revalidatePath('/admin-config');
        return { success: true, message: 'Code has been deleted.' };
    } catch (error) {
        console.error(`${new Date().toISOString()} - ${error}`);
        return { success: false, message: 'Internal Server Error' };
    }
}