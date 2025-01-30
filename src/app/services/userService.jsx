'use server';

import User from '../models/User';
import { connectDB } from '../lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isValidAccessCode } from './utilities';
import { generateToken } from '../utilities/generateToken';

/**
 * Create a new user
 * @param {*} newUser 
 * @param {string} accessCode 
 * @returns {Promise<any>}
 */
export const registerUser = async(newUser, accessCode) => {
    await connectDB();
    if (!await isValidAccessCode(accessCode)) return { success: false, message: `INVALID ACCESS CODE: Please double-check your access code and try again.` };
    try {
        const userFound = await User.findOne({ username: newUser.username });
        if (userFound) return { success: false, message: `User already exist.` };
        const user = await User.create(newUser);
        // TODO: delete the access key after use
        if (user) return { success: true, message: `Use login form to sign in`}
    } catch (err) {
        console.error(err.message);
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
            userId: user._id,
            username: user.username
        }

        const token = generateToken(userInfo);
        cookies().set('access-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60, // expires in 1 hour
            path: '/'
        }); // set access token
        return { success: true, message: `Login Success` };
    } catch (err) {
        console.error(err.message);
        return { success: false, message: `Internal Server Error` };
    }
}

export async function getUsers() {
    try {
        const users = await User.find().select('-password'); // get all users from database
        return users;
    } catch (error) {
        console.error(`${new Date().toISOString()} - ${error}`);
        return { success: false, message: 'Internal Server Error' };
    }
}

export async function updateUser(updatedUser) {
    let user;
    try {
        // find user first
        user = await User.findById(updatedUser._id);
        if (!user) return { success: false, message: `User doesn't exist.` };
    } catch (error) {
        console.error(`${new Date().toISOString()} - ${error}`);
        return { success: false, message: `Internal Server Error` };
    }
    let updatedResult;
    try {
        user.username = updatedUser.username;
        user.email = updatedUser.email;
        if ('password' in updatedUser) user.password = updatedUser.password;
        updatedResult = await user.save();
        if (!updatedResult) return { success: false, message: 'Unable to update user info, please try again.' };
        return { success: true, message: `User info has been updated` };
    } catch (error) {
        console.error(`${new Date().toISOString()} - ${error}`);
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
