import Histories from '@/app/components/Histories';
import { getHistories } from '@/app/services/history';

const page = async ({ params }) => {
  const { id: trackerId } = params;
  let data;
  
  // get all histories with associated with the trackerId
  data = await getHistories(trackerId);

  return <Histories data={data} trackerId={trackerId} />;
}

export default page