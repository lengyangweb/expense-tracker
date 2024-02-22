import { connectDB } from "../lib/db";
import History from "../models/History";
import Histories from "../components/Histories";

const TrackerPage = async () => {
  let data = [];

  await connectDB();
  data = await History.find();

  return (
    <Histories data={data} />
  );
};

export default TrackerPage;
