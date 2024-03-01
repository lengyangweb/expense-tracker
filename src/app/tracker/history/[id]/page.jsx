import { connectDB } from '@/app/lib/db';
import History from '@/app/models/History';
import Histories from '@/app/components/Histories';

const page = async () => {
  let data = [];

  await connectDB();
  data = await History.find();

  return <Histories data={data} />;
}

export default page