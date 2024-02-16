import Histories from "../components/Histories";
import { connectDB } from "../lib/db";
import History from "../models/History";

const TrackerPage = async () => {
  let data = [];

  await connectDB();
  data = await History.find();
  // data = data.map((item) => ({ ...item, _id: item._id.toString() }));
  // console.log(JSON.stringify(data));

  return (
    <Histories data={data} />
  );
};

export default TrackerPage;
