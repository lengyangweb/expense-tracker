import jwt from 'jsonwebtoken';

export const generateToken = (userInfo) => {
    const jwtSecret = process.env.JWT_SECRET;
    return jwt.sign(userInfo, jwtSecret, { expiresIn: '1hr' });
}