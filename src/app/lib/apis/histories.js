"use client";
const url = `http://localhost:3000/api/transaction/histories`;

/**
 * Get all transaction histories
 * @returns {[]}
 */
async function getHistories() {
  // fetch all transaction histories from the backend
  const response = await fetch(url);
  // parse result to json data
  const histories = await response.json();
  return histories;
}

async function getHistory(title) {
  const response = await fetch(`${url}/${title}`);
  const data = await response.json();
  return data;
}

/**
 * Create a new transaction history
 * @param {*} history
 */
function createHistory(history) {
  return new Promise(async (resolve, reject) => {
    try {
      // send history to backend to be create
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(history),
      });
      // get the new history return from the server
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Remove a transaction history
 * @param {string} id
 * @returns
 */
function removeHistory(id) {
  return new Promise(async (resolve, reject) => {
    try {
      // send history to be delete
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export { getHistories, createHistory, getHistory, removeHistory };
