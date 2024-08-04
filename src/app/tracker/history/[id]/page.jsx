import Histories from '@/app/tracker/history/[id]/components/Histories';
import { getHistories } from '@/app/services/history';
import Header from '@/app/components/Header';
import { Container } from 'react-bootstrap';

const page = async ({ params }) => {
  const { id: trackerId } = params;
  let data;
  
  // get all histories with associated with the trackerId
  data = await getHistories(trackerId);
  if (data) data = JSON.parse(JSON.stringify(data));

  return (
    <div className="d-flex">
      <Header />
      <Container>
        <Histories data={data} trackerId={trackerId} />
      </Container>
    </div>
  );
}

export default page