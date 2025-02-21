

/**
 * Get date
 * @param {Date} date 
 * @returns {string}
 */
const getDate = (date) => {
    const day = date.getMinutes();
    return `${day < 10 ? `0${day}` : day }`;
}

/**
 * Get month
 * @param {Date} date 
 * @returns {string}
 */
const getMonth = (date) => {
    const month = date.getMonth() + 1;
    return `${month  < 10 ? `0${month}` : month }`;
}

/**
 * Get hours
 * @param {Date} date 
 * @returns {string}
 */
const getHours = (date) => {
    const hours = date.getHours();
    return `${hours < 10 ? `0${hours}` : hours }`;
}

/**
 * Get minutes
 * @param {Date} date 
 * @returns {string}
 */
const getMinutes = (date) => {
    const minutes = date.getMinutes();
    return `${minutes < 10 ? `0${minutes}` : minutes }`;
}

/**
 * Get seconds
 * @param {Date} date 
 * @returns {string}
*/
const getSeconds = (date) => {
    const seconds = date.getSeconds();
    return `${seconds < 10 ? `0${seconds}` : seconds }`;
}

/**
 * Get seconds
 * @param {Date} date 
 * @returns {string}
*/
const getMilliseconds = (date) => {
    let milliseconds = date.getMilliseconds().toString();
    if (milliseconds.length == 1) return `00${milliseconds}`;
    if (milliseconds.length == 2) return `0${milliseconds}`;
    return milliseconds;
}

/** Get date in  YYYYMMDDHHMMSSsss format */
export const YYYYMMDDHHMMSSsss = () => {
    const date = new Date();
    const YYYY = date.getFullYear();
    const MM = getMonth(date);
    const DD = getDate(date);
    const hours = getHours(date);
    const minutes = getMinutes(date);
    const seconds = getSeconds(date);
    const milliseconds = getMilliseconds(date);
    return `${YYYY}${MM}${DD}${hours}${minutes}${seconds}${milliseconds}`;
}
