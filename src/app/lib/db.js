import { connect, connection, createConnection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function connectDB() {
  if (conn.isConnected) return; // if database already connected

  try {
    // connect to mongoDB
    const db = await connect(process.env.MONGO_URI);
    console.log(db.connection.db.databaseName);
    conn.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error(`Unable to connect to MongoDB`, error);
  }
}

connection.on("connected", () => {
  console.log(`${new Date().toUTCString()} - Mongoose is Connected`);
});

connection.on("error", () => {
  console.error(
    `${new Date().toUTCString()} - Mongoose connection error`,
    error
  );
});
