'use server';
import User from '../models/User';

export const registerUser = async(newUser, accessCode) => {
    const codeIsValid = validateAccessCode(accessCode);
    if (!codeIsValid) return { success: false, message: `Invalid Access Code` };
    try {
        const user = await User.create(newUser);
        if (user) return { success: true, message: `Use login form to sign in`}
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
    return { success: true, message: `Code is valid` };
}

const validateAccessCode = (accessCode) => {
    return accessCode === process.env.ACCESS_CODE;
}