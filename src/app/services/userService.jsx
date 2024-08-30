'use server';

import User from '../models/User';
import { connectDB } from '../lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { generateToken } from '../utilities/generateToken';

/**
 * Create a new user
 * @param {*} newUser 
 * @param {string} accessCode 
 * @returns {Promise<any>}
 */
export const registerUser = async(newUser, accessCode) => {
    if (!isValidAccessCode(accessCode)) return { success: false, message: `Invalid Access Code` };
    try {
        await connectDB();
        const user = await User.create({ ...newUser });
        if (user) return { success: true, message: `Use login form to sign in`}
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
}

/**
 * Authenticate user
 * @param {*} credential 
 * @returns 
 */
export const authenticate = async(credential) => {
    try {
        await connectDB();
        const user = await User.findOne({ username: credential.username });
        if (!user) return { success: false, message: `Invalid user` };
        const validPassword = user.verifyPassword(credential.password);
        if (!validPassword) return { success: false, message: `Invalid username or password` };

        const userInfo = {
            username: user.username
        }

        const token = generateToken(userInfo);
        cookies().set('access-token', token); // set access token
        return { success: true, message: `Login Success` };
    } catch (error) {
        console.error(error);
        return { success: false, message: `Internal Server Error` };
    }
}

export const navigate = (path) => {
    redirect(path);
}

/**
 * Log user out from session
 */
export const logout = async() => {
    cookies().delete('access-token');
    redirect('/login');
}


/**
 * Validate access code
 * @param {string} accessCode 
 * @returns {boolean}
 */
const isValidAccessCode = (accessCode) => {
    return accessCode === process.env.ACCESS_CODE;
}