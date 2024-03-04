import { connectDB } from '@/app/lib/db';
import History from '@/app/models/History';
import Histories from '@/app/components/Histories';

const page = async ({ params }) => {
  const { id: trackerId } = params;

  let data = [];

  await connectDB();
  data = await History.find({ trackerId });

  return <Histories data={data} trackerId={trackerId} />;
}

export default page