import mongoose from "mongoose";
type Connectionobject = {
  isConnected?: number;
};
const connection: Connectionobject = {};
async function dbConnect() {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    console.log("[0]", db.connections[0]);
    console.log("[none]", db.connections);
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected");
  } catch (err) {
    console.log("DB Connected", err);
    process.exit(1);
  }
}

export default dbConnect;
