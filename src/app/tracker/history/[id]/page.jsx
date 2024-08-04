import { connectDB } from '@/app/lib/db';
import { Container } from 'react-bootstrap';
import Header from '@/app/components/Header';
import Loading from '@/app/components/Loading';
import { getHistories } from '@/app/services/history';
import Histories from '@/app/tracker/history/[id]/components/Histories';

const page = async ({ params }) => {
  let data;
  let isLoading = true;
  const { id: trackerId } = params;

  try {
    await connectDB(); // will connect to the database if haven't
    data = await getHistories(trackerId); // get all histories with associated with the trackerId
    if (data) {
      isLoading = false;
      data = JSON.parse(JSON.stringify(data));
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="d-flex">
      <Header />
      <Container>
        { isLoading && <Loading /> }
        { !isLoading && <Histories data={data} trackerId={trackerId} />}
      </Container>
    </div>
  );
}

export default page