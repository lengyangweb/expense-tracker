import { connectDB } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { Container } from 'react-bootstrap';
import Header from '@/app/components/Header';
import Loading from '@/app/components/Loading';
import { getTracker } from '@/app/services/tracker';
import { getHistories } from '@/app/services/history';
import Histories from '@/app/tracker/history/[id]/components/Histories';
import { getUserInfo } from '@/app/utilities/generateToken';

const History = async ({ params }) => {
  const { userId } = getUserInfo();

  let data = [];
  let tracker;
  let isLoading = true;
  const { id: trackerId } = params;

  try {
    const tracker = await getTracker(trackerId);
    if (!tracker) return redirect('/tracker');
    const { userId: _id } = tracker;
    if (tracker.userId.toString() !== userId) return redirect('/tracker');
  } catch (error) {
    console.error(`${new Date().toISOString()} - ${error}`);
    return redirect('/tracker');
  }

  try {
    await connectDB(); // will connect to the database if haven't
    data = await getHistories(trackerId); // get all histories with associated with the trackerId
    [ data, tracker ] = await Promise.all([getHistories(trackerId), getTracker(trackerId)])
    if (data) {
      isLoading = false;
      data = JSON.parse(JSON.stringify(data));
      data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // sort by latest date first
      tracker = JSON.parse(JSON.stringify(tracker));
    }
  } catch (err) {
    console.error(err.message);
  }

  return (
    <div className="d-flex">
      <Header />
      <Container>
        { isLoading && <Loading /> }
        { !isLoading && <Histories title={tracker.title} data={data} trackerId={trackerId} />}
      </Container>
    </div>
  );
}

export default History