import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const generateToken = (userInfo) => {
    const jwtSecret = process.env.JWT_SECRET;
    return jwt.sign(userInfo, jwtSecret, { expiresIn: '1hr' });
}

/**
 * Decode token and return user info
 * @param {string} token 
 * @returns {object}
 */
export function getUserInfo() {
    const { value } = cookies().get('access-token');
    if (!value) return;
    return jwt.decode(value);
}