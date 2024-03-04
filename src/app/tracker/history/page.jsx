import { connectDB } from "@/app/lib/db";
import History from "@/app/models/History";

const TrackerHistory = async () => {
  let data = [];

  await connectDB();
  data = await History.find();

  return <Histories data={data} />;
};

export default TrackerHistory;
